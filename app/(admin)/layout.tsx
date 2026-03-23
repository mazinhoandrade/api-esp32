import { Card } from "@/components/ui/card";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

import Link from 'next/link'

import Header from "@/components/header";


export default  function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
     <Card className='m-4 p-3 max-w-2xl md:mx-auto rounded-2xl '>
      <Header />
    <Menubar className="bg-primary">
  <MenubarMenu>
    <Link href="/dashboard">
    <MenubarTrigger>Dashboard</MenubarTrigger>
    </Link>
    <Link href="/product">
    <MenubarTrigger>Produtos</MenubarTrigger>
    </Link>
    <Link href="/drink">
    <MenubarTrigger>Bebidas</MenubarTrigger>
    </Link>
    <Link href="/order">
    <MenubarTrigger>Pedidos</MenubarTrigger>
    </Link>
  </MenubarMenu>
</Menubar>
        {children}
     </Card>    
  );
}
