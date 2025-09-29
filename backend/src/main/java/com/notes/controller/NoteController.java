package com.notes.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notes.model.Note;
import com.notes.service.NoteService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public List<Note> getAllNotes() {
        return noteService.listNotes();
    }

    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable Integer id) {
        return noteService.getNoteById(id);
    }

    @PostMapping
    public Note addNote(@RequestBody Note note) {
        System.out.println("Received note: " + note);
        return noteService.saveNote(note);
    }

    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Integer id, @RequestBody Note note) {
    note.setId(id);
    return noteService.saveNote(note); // Return the saved note
}

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Integer id) {
        Note note = noteService.getNoteById(id);
        if (note != null) {
            noteService.deleteNote(note);
        }
    }
}