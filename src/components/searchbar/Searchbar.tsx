"use client";
import useSearchStore from "@/lib/useSearchStore";
import Image from "next/image";
import search from "@/../public/search.svg";

const Searchbar = () => {
  const setSearch = useSearchStore((state) => state.setSearch);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center bg-white w-[220px] p-1 rounded-3xl gap-3 ipad:p-2 ipad:w-[280px] laptop:w-[350px]">
        <Image src={search} alt="search" width={25} height={25}></Image>

        <input
          type="text"
          className="border-none outline-0 text-gray-600 text-sm ipad:text-xl"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default Searchbar;
