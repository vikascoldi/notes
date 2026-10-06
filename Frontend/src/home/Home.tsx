import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import NotesCard from "../components/card/NotesCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 pb-28 pt-2 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5 lg:grid-cols-3">
          <NotesCard
            title="React Hooks"
            date="27 Sep 2026"
            content="Learn useState, useEffect and useContext in React."
            tag="#React"
            isPinned={false}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNotes={() => {}}
          />

          <NotesCard
            title="JavaScript"
            date="27 Sep 2026"
            content="Learn JavaScript fundamentals."
            tag="#JavaScript"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNotes={() => {}}
          />

          <NotesCard
            title="Tailwind CSS"
            date="27 Sep 2026"
            content="Learn Tailwind CSS utility classes."
            tag="#Tailwind"
            isPinned={false}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNotes={() => {}}
          />
        </div>
      </div>

      <button
        type="button"
        aria-label="Add note"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-xl active:scale-95 md:bottom-10 md:right-10 md:h-16 md:w-16"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-3xl" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {
          setOpenAddEditModal({
            isShown: false,
            type: "add",
            data: null,
          });
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(15, 23, 42, 0.45)",
            backdropFilter: "blur(2px)",
            zIndex: 50,
            overflowY: "auto",
          },
        }}
        className="mx-4 mt-16 max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl outline-none md:mx-auto md:w-[40%] md:p-7"
      >
        <AddEditNotes type={openAddEditModal.type} />
      </Modal>
    </>
  );
};

export default Home;