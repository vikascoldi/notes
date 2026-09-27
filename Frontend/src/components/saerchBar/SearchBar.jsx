import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="bg-slate-100 flex items-center  w-50 md:w-80 px-2 ml-2 rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        value={value}
        onChange={onChange}
        className="w-full text-[20px] placeholder:text-sm bg-transparent outline-none py-2 "
      />
      {value && (
        <X
          size={20}
          className="mr-2 text-gray-400  hover:text-blue-500"
          onClick={onClearSearch}
        />
      )}
      <Search
        size={20}
        className="text-blue-500 hover:text-gray-500"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
