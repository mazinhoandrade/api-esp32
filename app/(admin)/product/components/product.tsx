"use client"
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import { useAction } from "next-safe-action/hooks";
import {
  Dialog
} from "@/components/ui/dialog"
import { createProductType } from '@/app/types/product'
import { formatCentsToBRL } from '@/app/helpers/money'
import { toast } from "sonner"
import { Card } from '@/components/ui/card'
import { Pencil, Trash } from 'lucide-react'
import { deleteProduct } from '@/app/actions/delete-product'
import UpSertForm from './upSertForm'
import AddProductButton from './add-product-button';

type Props = {
  products: createProductType[];
}


const Product = ({products}:Props) => {
    const [open, setOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<createProductType>();
    const useDeleteProduct = useAction(deleteProduct);


  const handleDelete = (id: string) => {
    if (!id) {
      return;
    }
    const confirmed = window.confirm("Tem certeza que deseja excluir o produto?")
    if (!confirmed) {
      return;
    }
    useDeleteProduct.execute({id});
    toast.success("Produto excluído com sucesso");
  }

  const handleEdit = (product: createProductType) => {
    setOpen(true);
    setEditProduct(product);
  }


  return (
    <>
      {products.map((product) => (
        <Card className="flex items-center gap-4 border py-4 hover:shadow-blue-600" key={product.id}>
          <div className='flex justify-around w-full items-center'>
            <div className='flex flex-col font-bold capitalize'>{formatCentsToBRL(product.amount)} - {product.description}</div>
            <div className='flex gap-2'>
              <Button onClick={() => handleEdit(product)} variant="outline"><Pencil /></Button>  
              <Button onClick={() => handleDelete(product.id)} variant="destructive"><Trash /></Button>  
            </div>        
          </div>
        </Card>
       ))}
      <AddProductButton />
      <Dialog open={open} onOpenChange={setOpen}>
      <UpSertForm onSuccess={() => setOpen(false)} product={editProduct} isOpen={open} />
      </Dialog>
    </>
  )
}

export default Product