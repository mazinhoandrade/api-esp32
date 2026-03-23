"use client"
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import { useAction } from "next-safe-action/hooks";
import {
  Dialog,
} from "@/components/ui/dialog"
import { formatCentsToBRL } from '@/app/helpers/money'
import { toast } from "sonner"
import { Card } from '@/components/ui/card'
import { Pencil, Trash } from 'lucide-react'
import { deleteDrink } from '@/app/actions/delete-drink'
import UpSertForm from './upSertForm'
import { drinksType } from '@/app/types/drinks';
import AddButton from './add-button';

type Props = {
  drinks: drinksType[];
}


const Drink = ({drinks}:Props) => {
    const [open, setOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<drinksType>();
    const useDeleteDrink = useAction(deleteDrink);


  const handleDelete = (id: string) => {
    if (!id) {
      return;
    }
    const confirmed = window.confirm("Tem certeza que deseja excluir o bebida?")
    if (!confirmed) {
      return;
    }
    useDeleteDrink.execute({id});
    toast.success("Bebida excluído com sucesso");
  }

  const handleEdit = (drink: drinksType) => {
    setOpen(true);
    setEditProduct(drink);
  }


  return (
    <>
      {drinks.map((drink) => (
        <Card className="flex items-center gap-4 border py-4 hover:shadow-blue-600" key={drink.id}>
          <div className='flex justify-around w-full items-center'>
            <div className='flex flex-col font-bold capitalize'>{formatCentsToBRL(drink.amount)} - {drink.name}</div>
            <div className='flex gap-2'>
              <Button onClick={() => handleEdit(drink)} variant="outline"><Pencil /></Button>  
              <Button onClick={() => handleDelete(drink.id)} variant="destructive"><Trash /></Button>  
            </div>        
          </div>
        </Card>
       ))}
      <AddButton />
      <Dialog open={open} onOpenChange={setOpen}>
      <UpSertForm onSuccess={() => setOpen(false)} drink={editProduct} isOpen={open} />
      </Dialog>
    </>
  )
}

export default Drink