"use client";
import Image from "next/image";
import { deleteProduct } from "@/lib/apiMethods";
import useSearchStore from "@/lib/useSearchStore";
import UpdateProduct from "@/components/updateProduct/UpdateProduct";
import deleteIcon from "@/../public/delete.svg";

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

  const handleDelete = async () => {
    await deleteProduct(product._id);
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
            width={350}
            height={100}
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
          <div className="overflow-auto max-h-20 tablet:max-h-24 laptop:max-h-32 leading-tight">
            <span className="text-[10px]  tablet:text-[16px] ipad:text-[12px] leading-tight">
              <span className="font-semibold">Description: </span>
              {product.description}
            </span>
          </div>
        </div>
      </div>
      <div
        className={`${
          path === "/product" ? " flex left mt-3 justify-end tablet:gap-4" : "hidden"
        }`}
      >
        <UpdateProduct product={product} />
        <Image
          className="max-h-[12px] cursor-pointer tablet:max-h-[20px] hover:bg-gray-200 "
          src={deleteIcon}
          alt="search"
          width={30}
          height={30}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};
export default ProductCard;
