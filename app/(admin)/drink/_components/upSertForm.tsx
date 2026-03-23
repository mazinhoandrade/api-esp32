"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";
import { createOrUpdateDrink } from "@/app/actions/upsert-drink";
import { useAction } from "next-safe-action/hooks";
import { drinksType } from "@/app/types/drinks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  amount: z.number({ message: "Campo obrigatório" }),
  name: z.string().min(0).trim().nonempty({ message: "Campo obrigatório" }),
  tempoMs: z.number({ message: "Campo obrigatório" }).min(0),
});

interface Props {
  isOpen: boolean;
  drink?: drinksType;
  onSuccess?: () => void;
}

const selectTempoMs = [
  { value: 3000, label: "300 ml" },
  { value: 5000, label: "500 ml" },
  { value: 7000, label: "700 ml" },
];

const UpSertForm = ({ isOpen, onSuccess, drink }: Props) => {
  const { execute, isPending } = useAction(createOrUpdateDrink);
  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: drink?.amount ? drink.amount / 100 : 0,
      name: drink?.name ?? "",
      tempoMs: drink?.tempoMs ?? 0,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        amount: drink?.amount ? drink.amount / 100 : 0,
        name: drink?.name ?? "",
        tempoMs: drink?.tempoMs ?? 0,
      });
    }
  }, [isOpen, form, drink]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    execute({
      id: drink?.id,
      amount: data.amount * 100,
      name: data.name,
      tempoMs: data.tempoMs,
    });
    onSuccess?.();
    toast.success("Bebida salva com sucesso");
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {drink ? "Editar bebida" : "Adicionar bebida"}
        </DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor*</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value}
                    onValueChange={(values) => {
                      field.onChange(values.floatValue);
                    }}
                    prefix="R$ "
                    decimalScale={2}
                    decimalSeparator=","
                    thousandSeparator="."
                    fixedDecimalScale
                    customInput={Input}
                    allowNegative={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome*</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Coca-Cola" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tempoMs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade ( ml )*</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {selectTempoMs.map((item) => (
                          <SelectItem
                            key={item.value}
                            value={item.value.toString()}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full capitalize text-foreground"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpSertForm;
