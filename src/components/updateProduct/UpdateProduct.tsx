"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { useState } from "react";
import UpdateDetails from "./updateDetails/UpdateDetails";
import Image from "next/image";
import edit from "@/../public/edit.svg";

type Product = {
  _id: any;
  name: string;
  price: number;
  description: string;
  image: string;
};

type UpdateProductProps = {
  product: Product;
};

const UpdateProduct = ({ product }: UpdateProductProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogTrigger asChild>
        <Image
          className="max-h-[12px] cursor-pointer tablet:max-h-[20px] hover:bg-gray-200 "
          src={edit}
          alt="search"
          width={30}
          height={30}
        />
      </DialogTrigger>
      <DialogContent className="fixed inset-0 flex items-center justify-center p-6 bg-black bg-opacity-50">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg ipad:max-w-md tablet:max-w-lg">
          <DialogTitle className="text-lg font-bold mb-4">
            Update Product Details
          </DialogTitle>
          <UpdateDetails product={product} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProduct;
