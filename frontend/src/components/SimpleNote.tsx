"use client"
import type Note from "@/types/Note"
import {useNotes} from "@/context/NotesContext"


export default function SimpleNote(note:Note){

    const {removeNote} = useNotes();
    const {addArchive} = useNotes();

    return <div className="bg-red-950 m-1">
        <h1>{note.title}</h1>
        <h2>{note.description}</h2>
        <p>{note.category}</p>
        <p className="opacity-50 text-sm">{note.id}</p>
        
        <button className="bg-red-300 rounded-2xl p-1 text-black" onClick={() => removeNote(note.id)}>delete</button>
        <button className="bg-blue-300 rounded-2xl p-1 text-black" onClick={() => addArchive(note)}>archive</button>

        
    </div>

}