package com.notes.service;

import java.util.List;

import com.notes.model.Note;

public interface INoteService {
    public List<Note> listNotes();
    public Note getNoteById(Integer noteId);
    public Note saveNote(Note note);
    public void deleteNote(Note note);
}
