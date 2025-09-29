"use client"
import {useNotes} from "@/context/NotesContext"
import ArchivedNote from "./ArchivedNote";

export default function Notes() {

    const { archive } = useNotes();

  return (
    <div className="m-1">
      {archive.map((simpleNote) => (
        <ArchivedNote key={simpleNote.id} {...simpleNote} />
      ))}
    </div>
  );
}
