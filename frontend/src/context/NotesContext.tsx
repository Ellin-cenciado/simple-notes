"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import Note from "@/types/Note";

type NotesContextType = {
  notes: Note[];
  archive: Note[];
  addNote: (note: Omit<Note, "id" | "is_archived">) => void;
  removeNote: (id: string) => void;
  updateNote: (
    id: string,
    updated: Partial<Omit<Note, "id" | "createdAt">>
  ) => void;
  addArchive: (note: Note) => void;
  deleteArchive: (id: string) => void;
  removeArchive: (note: Note) => void;
  fetchNotes: () => Promise<void>;
  filterCategories: (category?: string) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [archive, setArchive] = useState<Note[]>([]);
  // Use NEXT_PUBLIC_ prefix for client-side env vars
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/notes';
  //const url = "http://localhost:8081/api/notes";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch notes");
        }
        return res.json();
      })
      .then((data) => {
        // Validate that data is an array
        if (Array.isArray(data)) {
          setNotes(data.filter((note: Note) => !note.is_archived));
          setArchive(data.filter((note: Note) => note.is_archived));
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }, []);

  const addNote = async (note: Omit<Note, "id" | "is_archived">) => {
    try {
      const res = await fetch(`${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...note, is_archived: false }),
      });
      const newNote = await res.json();
      setNotes((prev) => [...prev, newNote]);
    } catch (e) {
      console.log("An error occurred: " + e);
    }
  };

  const removeNote = async (id: string) => {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setArchive((prev) => prev.filter((note) => note.id !== id));
      }
      fetchNotes();
    } catch (e) {
      console.error("An error ocurred: " + e);
    }
  };

  const updateNote = async (
    id: string,
    updated: Partial<Omit<Note, "id" | "createdAt">>
  ) => {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        const updatedNote = await res.json();
        setNotes((prev) =>
          prev.map((note) =>
            note.id === id ? { ...note, ...updatedNote } : note
          )
        );
        fetchNotes();
      }
    } catch (e) {
      console.error("An error occurred: " + e);
    }
  };

  const addArchive = async (note: Note) => {
    try {
      const res = await fetch(`${url}/${note.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...note, is_archived: true }),
      });
      if (res.ok) {
        const updatedNote = await res.json();
        setNotes((prev) => prev.filter((n) => n.id !== note.id));
        setArchive((prev) => [...prev, updatedNote]);
        fetchNotes();
      }
    } catch (e) {
      console.error("An error occurred while archiving: " + e);
    }
  };

  const removeArchive = async (note: Note) => {
    try {
      const res = await fetch(`${url}/${note.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...note, is_archived: false }),
      });
      if (res.ok) {
        const updatedNote = await res.json();
        // Remove from archive array
        setArchive((prev) => prev.filter((n) => n.id !== note.id));
        // Add back to notes array
        setNotes((prev) => [...prev, updatedNote]);
        fetchNotes();
      }
    } catch (e) {
      console.error("An error occurred while unarchiving: " + e);
    }
  };

  const deleteArchive = async (id: string) => {
    try {
      const res = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setArchive((prev) => prev.filter((note) => note.id !== id));
      }
      fetchNotes();
    } catch (e) {
      console.error("An error occurred: " + e);
    }
  };

  const fetchNotes = async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("failed to fetch notes");
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setNotes(data.filter((note: Note) => !note.is_archived));
        setArchive(data.filter((note: Note) => note.is_archived));
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (e) {
      console.error("Error fetching notes:", e);
    }
  };

  const filterCategories = async (category?: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("failed to filter notes");
      }
      const data = await res.json();

      if (!category || category === "" || category === "all") {
        setNotes(data.filter((note: Note) => !note.is_archived));
        setArchive(data.filter((note: Note) => note.is_archived));
      } else {
        setNotes(
          data.filter(
            (note: Note) => note.category === category && !note.is_archived
          )
        );
        setArchive(
          data.filter(
            (note: Note) => note.category === category && note.is_archived
          )
        );
      }
    } catch (e) {
      console.error("Error filtering data: " + e);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        archive,
        addNote,
        removeNote,
        updateNote,
        addArchive,
        deleteArchive,
        removeArchive,
        fetchNotes,
        filterCategories,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
