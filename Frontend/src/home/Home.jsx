import React from "react";
import Navbar from "../components/navbar/Navbar";
import NotesCard from "../components/card/NotesCard";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container  mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-8 ">
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
    </>
  );
};

export default Home;
