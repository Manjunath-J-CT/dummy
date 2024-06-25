"use client";
import { useEffect, useRef, useState } from "react";
import Searchbar from "../searchbar/Searchbar";
import Product from "./Product";
import useSearchStore from "@/lib/useSearchStore";
import { usePathname } from "next/navigation";
import AddProduct from "../addProduct/AddProduct";
import { getAllProducts } from "@/lib/apiMethods";
import { useFormStore } from "@/lib/useFormStore";

const ProductPage = () => {
  const pathName = usePathname();
  const [products, setProducts] = useState([]);
  const search = useSearchStore((state) => state.search);
  const formData = useFormStore((state) => state.formData);
  const isDelete = useSearchStore((state) => state.isDelete);
  const setCurrentPage = useSearchStore((state) => state.setCurrentPage);
  const setSearch = useSearchStore((state) => state.setSearch);
  const containerRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const getAll = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };
    getAll();
  }, [pathName, isDelete, formData]);

  useEffect(() => {
    const setAll = async () => {
      setCurrentPage(1);
      setSearch("");
    };
    setAll();
  }, [setCurrentPage, setSearch]);

  return (
    <div ref={containerRef}>
      <div
        className={`${
          pathName === "/product" ? "hidden" : "flex justify-center pt-4"
        }`}
      >
        <Searchbar />
      </div>
      <div
        className={`${
          pathName === "/product"
            ? "flex justify-end pt-4 pr-4 tablet:pr-8 laptop:pr-16 "
            : "hidden"
        }`}
      >
        <AddProduct />
      </div>
      <div className="py-4">
        <div className="grid gap-4 grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4">
          <Product
            initialProducts={products}
            search={search}
            pathName={pathName}
            containerRef={containerRef}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
