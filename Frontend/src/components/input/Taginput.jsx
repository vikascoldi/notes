import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const Taginput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
      console.log(inputValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (removeTag) =>{
    setTags(tags.filter((tag)=> tag !== removeTag))
  }

  return (
    <div>
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="flex items-center gap-2 bg-blue-50 px-2 py-1 rounded-md text-slat-700 text-sm">
              #{tag}
              <button className="" onClick={() => {handleRemoveTag()}}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className=" flex items-center gap-2">
        <input
          type="text"
          placeholder="Add tags"
          className="w-[50%] rounded bg-transparent border border-gray-300 px-3 py-2 outline-none"
          value={inputValue}
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg- px-2 py-2 bg-blue-50 border rounded  border-gray-300"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-2xl text-blue-700 " />
        </button>
      </div>
    </div>
  );
};

export default Taginput;
