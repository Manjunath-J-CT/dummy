"use client";

import { useState, useEffect, Suspense } from "react";
import ProductCard from "./productCard/ProductCard";
import useSearchStore from "@/lib/useSearchStore";

type Product = {
  _id: any;
  name: string;
  price: number;
  description: string;
  image: string;
};

type ProductListProps = {
  initialProducts: Product[];
  search: string;
  pathName: string;
};

const Product = ({ initialProducts, search, pathName }: ProductListProps) => {
  const currentPage = useSearchStore((state) => state.currentPage);
  const setCurrentPage = useSearchStore((state) => state.setCurrentPage);
  const itemsPerPage = useSearchStore((state) => state.itemsPerPage);

  const filteredProducts = initialProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [currentPage]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 3;
    const halfVisiblePages = Math.floor(visiblePages / 2);
    const startPage = Math.max(1, currentPage - halfVisiblePages);
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={`px-1.5 py-1 text-[10px] tablet:px-2 tablet:py-1 tablet:text-[16px] ${
            currentPage === 1
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          {1}
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="dots1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-1 text-[10px] tablet:text-[16px] tablet:px-2 ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="dots2">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`px-1 text-[10px] tablet:text-[16px] tablet:px-2 ${
            currentPage === totalPages
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-screen flex flex-col py-6 px-4 justify-center items-center gap-8 laptop:gap-16 laptop:py-8">
      <div className="w-full flex flex-wrap justify-center gap-8">
        {currentProducts.map((product) => (
          <ProductCard product={product} key={product._id} path={pathName} />
        ))}
      </div>
      <div className="w-full flex justify-center mt-4 gap-2">
        {currentPage > 1 && currentProducts.length > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-1 w-[50px] py-0.5 text-[10px] tablet:text-[16px] tablet:w-[100px] bg-blue-500 text-white tablet:px-4 tablet:py-2"
          >
            Previous
          </button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-1 w-[60px] py-0.5 text-[10px] tablet:text-[16px] tablet:w-[100px] bg-blue-500 text-white tablet:px-4 tablet:py-2"
          >
            Next
          </button>
        )}
      </div>
      {currentProducts.length === 0 && (
        <div className="text-xl text-gray-400 tablet:text-3xl">No Products Found</div>
      )}
    </div>
  );
};

export default Product;
