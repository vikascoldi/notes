import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

const NotesCard = ({
  title,
  date,
  content,
  tag,
  isPinned,
  onEdit,
  onDelete,
  onPinNotes,
}) => {
  return (
    <div className="bg-white mt-4 rounded  border border-gray-200 p-4 hover:shadow-xl transition-all">
      <div className="flex items-center  justify-between">
        <div className="">
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-700">{date}</span>

        </div>
          <MdOutlinePushPin
            size={22}
            onClick={onPinNotes}
            className={`icon-btn ${isPinned ? "text-blue-400" : "text-gray-300"}`}
          />
      </div>
      <p className="text-xs  text-slate-600 ">{content?.slice(0, 60)}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">{tag}</div>
        <div className="flex gap-2 items-center">
          <MdCreate className="icon-btn  hover:text-green-600 " onClick={onEdit} />
          <MdDelete className="icon-btn hover:text-red-600 " onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default NotesCard;
