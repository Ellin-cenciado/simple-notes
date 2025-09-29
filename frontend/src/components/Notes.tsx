"use client";

import { useEffect } from "react";
import SimpleNote from "./SimpleNote";
import { useNotes } from "@/context/NotesContext";

export default function Notes() {
  const { notes, addNote, fetchNotes ,filterCategories} = useNotes();

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="m-1">
      <form
        className="mb-4 flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const title = (form.elements.namedItem("title") as HTMLInputElement)
            .value;
          const description = (
            form.elements.namedItem("description") as HTMLInputElement
          ).value;
          const category = (
            form.elements.namedItem("category") as HTMLInputElement
          ).value;
          if (title && description && category) {
            addNote({ title, description, category });
          }
          form.reset();
        }}
      >
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="border rounded px-2 py-1"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border rounded px-2 py-1"
          required
        />

        <input
          name="category"
          type="text"
          placeholder="Category"
          className="border rounded px-2 py-1"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Add Note
        </button>
      </form>

      <form
        className="mb-4 gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const filter = (form.elements.namedItem("filter") as HTMLInputElement).value;
          filterCategories(filter);
        }}
      >
        <input
          name="filter"
          type="text"
          placeholder="Filter by category"
          className="border rounded px-2 py-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Filter
        </button>
      </form>

      {notes.map((simpleNote) => (
        <SimpleNote key={simpleNote.id} {...simpleNote} />
      ))}
    </div>
  );
}
