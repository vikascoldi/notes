import React from "react";
import Navbar from "../components/navbar/Navbar";
import NotesCard from "../components/card/NotesCard";
import { MdAdd } from "react-icons/md";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container p-1 md:p-0  mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2">
          <NotesCard
            title="React Hooks"
            date="27 Sep 2026"
            content="Learn useState, useEffect and useContext in React."
            tag="#React"
            isPinned={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNotes={() => {}}
          />
          <NotesCard
            title="React Hooks"
            date="27 Sep 2026"
            content="Learn useState, useEffect and useContext in React."
            tag="#React"
            isPinned={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNotes={() => {}}
          />
          <NotesCard
            title="React Hooks"
            date="27 Sep 2026"
            content="Learn useState, useEffect and useContext in React."
            tag="#React"
            isPinned={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNotes={() => {}}
          />
         
        </div>
      </div>
      <button className="w-16 h-16 bg-blue-400 hover:bg-blue-600 flex items-center justify-center rounded-2xl absolute right-10  bottom-10">
        <MdAdd className="text-white text-3xl" />
      </button>
    </>
  );
};

export default Home;
