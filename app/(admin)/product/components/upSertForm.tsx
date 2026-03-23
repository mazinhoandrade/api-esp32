"use client"
import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import z from 'zod'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { createProductType } from '@/app/types/product'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { NumericFormat } from 'react-number-format'
import { Input } from '@/components/ui/input'
import { createOrUpdateProduct } from '@/app/actions/upsert-product'
import { useAction } from 'next-safe-action/hooks'


const formSchema = z.object({
  amount: z.number({ message: "Campo obrigatório" }),
  description: z.string().min(0).optional(),
  quantity: z
  .number()
  .refine((val) => !isNaN(val), { message: "Informe um número válido" })
  .optional(),
})

interface Props {
  isOpen: boolean;
  product?: createProductType;
  onSuccess?: () => void;
}

const UpSertForm = ({isOpen, onSuccess, product}: Props) => {
      const { execute, isPending } = useAction(createOrUpdateProduct);
      const form = useForm<z.infer<typeof formSchema>>({
      shouldUnregister: true,
      resolver: zodResolver(formSchema),
      defaultValues: {
        amount: product?.amount ? product.amount/100 : 0,
        description: product?.description ?? "",
        quantity: product?.quantity ?? 0,
      },
    });

    useEffect(() => {
    if (isOpen) {
      form.reset({
        amount: product?.amount ? product.amount/100 : 0,
        description: product?.description ?? "",
        quantity: product?.quantity ?? 0,
      });
    }
  }, [isOpen, form, product]);

    const onSubmit =  (data: z.infer<typeof formSchema>) => {
        execute({
          id: product?.id,
          amount: data.amount*100,
          description: data.description,
          quantity: data.quantity
        });
        onSuccess?.();
        toast.success("Produto salvo com sucesso");
      }

  return (
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{product ? "Editar produto" : "Adicionar produto"}</DialogTitle>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button className='w-full capitalize text-foreground' type="submit" disabled={isPending}>{isPending ? "Salvando..." : "Salvar"}</Button>
      </form>
    </Form>
  </DialogContent>

  )
}

export default UpSertForm