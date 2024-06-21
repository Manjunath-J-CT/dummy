"use client";
import useSearchStore from "@/lib/useSearchStore";
import SearchIcon from "./searchicon/SearchIcon";

const Searchbar = () => {
  const setSearch = useSearchStore((state) => state.setSearch);

  const handleSearch = (e:any) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center bg-white w-[220px] p-1 rounded-3xl gap-3 ipad:p-2 ipad:w-[280px] laptop:w-[350px]">
        <SearchIcon />
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
