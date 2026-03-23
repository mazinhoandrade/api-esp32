import React from 'react'
import { CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutList } from 'lucide-react';
import { getDrinks } from '@/app/actions/get-drink';
import Drink from './_components/drinks';
import { drinksType } from '@/app/types/drinks';



const page = async () => {

  const drinks: drinksType[] = await getDrinks();
    
  return (
    <>
      <CardHeader className='p-0'>
        <CardTitle className='flex items-center gap-2 text-xl'><LayoutList /> Bebidas</CardTitle>
      </CardHeader>
        <Drink drinks={drinks} />
    </>
  )
}

export default page