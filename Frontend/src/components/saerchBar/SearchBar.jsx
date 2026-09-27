import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  handleSearch,
  onClearSearch,
}) => {
  return (
    <div className="flex items-center w-60 md:w-80 ml-2 px-3 rounded-lg bg-slate-100 border border-transparent focus-within:border-gray-200 focus-within:bg-white transition-colors duration-200">
      
      <input
        type="text"
        placeholder="Search Notes"
        value={value}
        onChange={onChange}
        className="w-full bg-transparent py-2 text-[20px] text-slate-700 placeholder:text-sm placeholder:text-slate-400 outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={onClearSearch}
          className="mr-1 cursor-pointer text-slate-400 hover:text-rose-500 transition-colors duration-150"
        >
          <X size={20} />
        </button>
      )}

      <button
        type="button"
        onClick={handleSearch}
        className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-150"
      >
        <Search size={20} />
      </button>

    </div>
  );
};

export default SearchBar;