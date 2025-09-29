"use client"
import type Note from "@/types/Note"
import {useNotes} from "@/context/NotesContext"


export default function SimpleNote(note:Note){

    const {deleteArchive} = useNotes();
    const {removeArchive} = useNotes();

    return <div className="bg-red-950 m-1 opacity-50">
        <h1>{note.title}</h1>
        <h2>{note.description}</h2>
        <p>{note.id}</p>
        <p>{note.category}</p>

        <button
            className="bg-red-300 rounded-2xl p-1 text-black"
            onClick={() => deleteArchive(note.id)}
        >
            delete
        </button>
        <button className="bg-blue-300 rounded-2xl p-1 text-black" onClick={() => removeArchive(note)}>remove from archive</button>
        
    </div>

}