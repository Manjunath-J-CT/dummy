import create from "zustand";
import { getAllProducts } from "./apiMethods";

type Product = {
  _id: any;
  name: string;
  price: number;
  description: string;
  image: string;
};

interface SearchState {
  search: string;
  setSearch: (search: string) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
  isDelete: boolean;
  setIsDelete: (isDelete: boolean) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
  currentPage: 1,
  setCurrentPage: (currentPage) => set({ currentPage }),
  itemsPerPage: 14,
  setItemsPerPage: (itemsPerPage) => set({ itemsPerPage }),
  isDelete: false,
  setIsDelete:(isDelete)=>set({isDelete}),
}));

export default useSearchStore;
