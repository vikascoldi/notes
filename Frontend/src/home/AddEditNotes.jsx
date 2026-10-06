import React, { useState } from "react";
import Taginput from "../components/input/Taginput";
import { MdClose } from "react-icons/md";

const AddEditNotes = ({ type = "add", onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError] = useState("");

  const addNewNote = async () => {};

  const editNote = async () => {};

  const handleAddNote = () => {
    if (!title) {
      setError("Please provide title*");
      return;
    }
    if (!content) {
      setError("Please provide content*");
      return;
    }
    setError("");
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="flex flex-col gap-5 relative ">
      <button
        className="text-2xl bg-white/90  h-10 w-10 flex items-center justify-center text-gray-500 shadow-sm border border-gray-100  hover:shadow-lg  focus:outline-none
    focus:ring-2
    focus:ring-red-200 absolute -right-5 -top-5 px-2 py-1 rounded-full hover:scale-110 active:scale-90 "
        onClick={() => onClose()}
      >
        <MdClose />
      </button>
      <div className="flex flex-col">
        <label className="input-label" htmlFor="note-title">
          Title
        </label>
        <input
          id="note-title"
          type="text"
          className="input-box mb-0! text-xl font-medium"
          placeholder="Go to Gym at 5am"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label className="input-label" htmlFor="note-content">
          Content
        </label>
        <textarea
          id="note-content"
          placeholder="Content..."
          className="input-box mb-0! resize-y text-sm leading-relaxed"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div>
        <label className="input-label" htmlFor="note-tags">
          Tags
        </label>
        <Taginput tags={tags} setTags={setTags} />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      <button
        type="button"
        className="btn-primary font-medium"
        onClick={() => {
          handleAddNote();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddEditNotes;
