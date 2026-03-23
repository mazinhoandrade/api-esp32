
"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import UpSertForm from "./upSertForm";

const AddButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
           <Button className='w-full text-foreground capitalize' variant="default">Adicionar bebida</Button>
      </DialogTrigger>
      <UpSertForm onSuccess={() => setIsOpen(false)} isOpen={isOpen} />
    </Dialog>
  );
};

export default AddButton;
