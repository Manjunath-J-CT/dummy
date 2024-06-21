"use client";
import { useEffect, useState } from "react";
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

  const setItemsPerPage = useSearchStore((state) => state.setItemsPerPage);
  const setCurrentPage = useSearchStore((state) => state.setCurrentPage);
  const setSearch = useSearchStore((state) => state.setSearch);

  useEffect(() => {
    const getAll = async () => {
      const products = await getAllProducts();
      setProducts(products);
      setCurrentPage(1);
      setSearch("");
    };
    getAll();
  }, [pathName, setCurrentPage, setSearch]);

  useEffect(() => {
    const getAll = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };
    getAll();
  }, [formData, isDelete]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(24);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(18);
      } else {
        setItemsPerPage(14);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, [setItemsPerPage]);

  return (
    <div>
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
      <div>
        <Product
          initialProducts={products}
          search={search}
          pathName={pathName}
        />
      </div>
    </div>
  );
};

export default ProductPage;
