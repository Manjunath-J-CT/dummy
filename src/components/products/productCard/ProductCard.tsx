/* eslint-disable @next/next/no-img-element */
"use client";
import { deleteProduct } from "@/lib/apiMethods";
import useSearchStore from "@/lib/useSearchStore";
import UpdateProduct from "@/components/updateProduct/UpdateProduct";
import deleteIcon from "@/../public/delete.svg";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { useState } from "react";
import Image from "next/image";

type Product = {
  _id: any;
  name: string;
  price: number;
  description: string;
  image: string;
};

type ProductCard = {
  product: Product;
  path: string;
};

const ProductCard = ({ product, path }: ProductCard) => {
  const isDelete = useSearchStore((state) => state.isDelete);
  const setIsDelete = useSearchStore((state) => state.setIsDelete);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    await deleteProduct(product._id);
    setOpen(false);
    setIsDelete(!isDelete);
  };

  return (
    <div
      key={product._id}
      className="w-[40%] flex flex-col justify-between border-2 border-gray-300 p-1 bg-white laptop:w-[20%] laptop:p-2 tablet:w-[30%] tablet:p-1.5"
    >
      <div>
        <div className="flex justify-center items-center">
          <Image
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={350}
            height={100}
            layout="responsive"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={80}
          />
        </div>
        <div>
          <div className="flex justify-between items-center pt-1">
            <span className="text-[12px] font-black tablet:text-[18px] ipad:text-[14px]">
              {product.name}
            </span>
          </div>

          <span className="text-[10px]  tablet:text-[16px] ipad:text-[12px]">
            <span className="font-semibold">Price:</span> ${product.price}
          </span>
          <div className="overflow-hidden max-h-16 tablet:max-h-24 laptop:max-h-32 leading-tight">
            <span className="text-[10px]  tablet:text-[16px] ipad:text-[12px] leading-tight">
              <span className="font-semibold">Description: </span>
              {product.description}
            </span>
          </div>
        </div>
      </div>
      <div
        className={`${
          path === "/product"
            ? " flex left mt-3 justify-end tablet:gap-4"
            : "hidden"
        }`}
      >
        <UpdateProduct product={product} />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Image
              className="max-h-[12px] cursor-pointer tablet:max-h-[20px] hover:bg-gray-200 "
              src={deleteIcon}
              alt="delete"
              loading="lazy"
            />
          </DialogTrigger>
          <DialogContent className="fixed inset-0 flex items-center justify-center p-6 bg-black bg-opacity-50">
            <div className="w-full  flex flex-col gap-3 max-w-sm p-2 bg-white rounded-lg shadow-lg ipad:max-w-md ipad:p-4 tablet:max-w-lg">
              <DialogTitle className="ipad:text-lg font-bold mb-4">
                Delete Product
              </DialogTitle>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="px-2 py-1 bg-gray-300 text-[12px] ipad:text-[17px] ipad:px-4 ipad:py-2 text-gray-800 rounded-md"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-2 py-1 text-[12px] ipad:text-[17px] ipad:px-4 ipad:py-2 rounded-md bg-blue-600 text-white "
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default ProductCard;
