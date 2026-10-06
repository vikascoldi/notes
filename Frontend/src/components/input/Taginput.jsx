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

  const handleRemoveTag = (removeTag) => {
    setTags(tags.filter((tag) => tag !== removeTag));
  };

  return (
    <div>
      {tags.length > 0 && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1 rounded-full bg-blue-50 py-1 pl-3 pr-1.5 text-sm font-medium text-blue-700"
            >
              #{tag}
              <button
                type="button"
                aria-label={`Remove tag ${tag}`}
                className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-blue-500 hover:bg-blue-100 hover:text-blue-700"
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <input
          id="note-tags"
          type="text"
          placeholder="Add tags"
          className="input-box !mb-0 flex-1 !py-2.5 text-sm"
          value={inputValue}
          onChange={handleChangeInput}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          aria-label="Add tag"
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-95"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Taginput;