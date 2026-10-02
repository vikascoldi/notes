import React from "react";

const AddEditNotes = () => {
  return (
    <div>
      <div className="flex  flex-col gap-2">
        <label className="input-label" htmlFor="TITLE">TITLE</label>
        <input
          type="text"
          className="outline-none text-2xl text-slate-950"
          placeholder="Go to Gym at 5am"
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <label htmlFor="">CONTENT</label>{" "}
        <textarea
          type="text"
          placeholder="Content..."
          className="text-sm border border-gray-400 text-slat-950 outline-none p-2 bg-blue-50 rounded"
          rows={10}
        />
      </div>
      <div>
        <label htmlFor="" className="input-label">TAG</label>
      </div>
      <button className="btn-primary mt-5 p-3 font-medium" onClick={()=>{}} >Add</button>
    </div>
  );
};

export default AddEditNotes;
