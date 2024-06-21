"use client";
import Image from "next/image";
import option from "./option.svg";
import { useState } from "react";
import { deleteProduct } from "@/lib/apiMethods";
import useSearchStore from "@/lib/useSearchStore";

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
  const [isOption, setIsOption] = useState(false);
  const isDelete = useSearchStore((state) => state.isDelete);
  const setIsDelete = useSearchStore((state) => state.setIsDelete);

  const handleDelete = async () => {
    await deleteProduct(product._id);
    setIsDelete(!isDelete);
  };

  return (
    <div
      key={product._id}
      className="w-[40%] border-2 border-gray-300 p-1 bg-white laptop:w-[20%] laptop:p-2 tablet:w-[30%] tablet:p-1.5"
    >
      <div className="flex justify-center items-center">
        <Image
          src={product.image}
          alt={product.name}
          width={350}
          height={100}
        />
      </div>
      <div>
        <div className="flex justify-between items-center pt-1">
          <span className="text-[12px] font-black tablet:text-[18px] ipad:text-[14px]">
            {product.name}
          </span>
          <div
            className={`${
              path === "/product"
                ? " max-w-[15%] ipad:max-w-[13%] tablet:max-w-[12%] laptop:max-w-[8%] "
                : "hidden"
            }`}
            onClick={() => setIsOption(!isOption)}
          >
            <Image
              className="hover:cursor-pointer"
              src={option}
              alt="menu"
              width={100}
              height={100}
            />
            <div className="relative">
              {isOption && (
                <div className="absolute top-0 right-0 mt-2 w-[60px] tablet:w-[100px] gap shadow-md rounded-md bg-white flex flex-col ">
                  <button className="text-[12px] min-h-[15px] tablet:min-h-[30px] hover:bg-gray-200 tablet:text-[16px]">
                    Update
                  </button>
                  <button
                    className="text-[12px] min-h-[15px] tablet:min-h-[30px] hover:bg-gray-200 tablet:text-[16px]"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <span className="text-[10px]  tablet:text-[16px] ipad:text-[12px]">
          <span className="font-semibold">Price:</span> ${product.price}
        </span>
        <div className="overflow-auto max-h-20 tablet:max-h-24 laptop:max-h-32 leading-tight">
          <span className="text-[10px]  tablet:text-[16px] ipad:text-[12px] leading-tight">
            <span className="font-semibold">Description: </span>
            {product.description}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
