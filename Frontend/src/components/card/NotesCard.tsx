import React from "react";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

interface NotesCardProps {
  title: string;
  date: string;
  content: string;
  tag: string;
  isPinned: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onPinNotes: () => void;
}

const NotesCard = ({
  title,
  date,
  content,
  tag,
  isPinned,
  onEdit,
  onDelete,
  onPinNotes,
}: NotesCardProps) => {
  return (
    <div
      className={`group mt-4 rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/70 ${
        isPinned ? "border-blue-200 ring-1 ring-blue-100" : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h6 className="truncate text-base font-semibold text-slate-800">
            {title}
          </h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>

        <button
          type="button"
          onClick={onPinNotes}
          aria-label={isPinned ? "Unpin note" : "Pin note"}
          aria-pressed={isPinned}
          className={`icon-btn shrink-0 ${
            isPinned ? "!text-blue-500 bg-blue-50" : ""
          }`}
        >
          <MdOutlinePushPin size={20} />
        </button>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {content.slice(0, 60)}
        {content.length > 60 && "…"}
      </p>

      <div className="mt-4 flex items-center justify-between">
        {tag ? (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {tag}
          </span>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-1 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit note"
            className="icon-btn hover:!bg-green-50 hover:!text-green-600"
          >
            <MdCreate size={20} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete note"
            className="icon-btn hover:!bg-red-50 hover:!text-red-600"
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesCard;