package com.notes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notes.model.Note;
import com.notes.repository.NoteRepository;

@Service
public class NoteService implements INoteService{

    @Autowired
    private NoteRepository noteRepository;

    @Override
    public List<Note> listNotes() {
        return noteRepository.findAll();
    }

    @Override
    public Note getNoteById(Integer noteId) {
        return noteRepository.findById(noteId).orElse(null);
    }

    @Override
    public Note saveNote(Note note) {
    return noteRepository.save(note);
}

    @Override
    public void deleteNote(Note note) {
        noteRepository.delete(note);
    }
}
