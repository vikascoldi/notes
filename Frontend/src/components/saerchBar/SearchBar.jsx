import React from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="flex w-full max-w-md items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-all duration-200 hover:border-slate-300 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/15">
      <input
        type="text"
        placeholder="Search notes"
        aria-label="Search notes"
        value={value}
        onChange={onChange}
        className="w-full min-w-0 bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />

      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={onClearSearch}
          className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500"
        >
          <X size={18} />
        </button>
      )}

      <button
        type="button"
        aria-label="Search"
        onClick={handleSearch}
        className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-700"
      >
        <Search size={18} />
      </button>
    </div>
  );
};

export default SearchBar;