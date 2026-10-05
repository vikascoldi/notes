import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import NotesCard from "../components/card/NotesCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal"

const Home = () => {
  const [openAddEditModal,setOpenAddEditModal] = useState({
    isShown:false,
    type:"add",
    data:null,
  });
  return (
    <>
      <Navbar />

      <div className="container p-1 md:p-0 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2">

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

      <button className="w-16 h-16 bg-blue-400 hover:bg-blue-600 flex items-center justify-center rounded-2xl absolute right-10 bottom-10"
        onClick={()=>{
          setOpenAddEditModal({isShown:true,type:"add",date:null});
        }}
      >
        <MdAdd className="text-white text-3xl" />
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
      backgroundColor: "rgba(0,0,0,0.2)",               
    },
  }}
  className="md:w-[40%] md:max-h-[3/4] bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
>
  <AddEditNotes />
</Modal>
    </>
  );
};

export default Home;