package com.notes;

import com.notes.service.INoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class NotesApplication implements CommandLineRunner {

    @Autowired
    private INoteService noteService;
    private static final Logger logger = LoggerFactory.getLogger(NotesApplication.class);

    public static void main(String[] args) {

        logger.info("Initializing Notes Application");
        SpringApplication.run(NotesApplication.class,args);
        logger.info("Notes Application started successfully");
    }

    @Override
    public void run(String... args) throws Exception {
        logger.info("CommandLineRunner executed");
        notesApp();
    }
    public void notesApp(){
        System.out.println("Welcome to Notes Application");
        logger.info("Total notes: " + noteService.listNotes().size());
        logger.info("Notes= \n" + noteService.listNotes());

        while(true){
            // Infinite loop to keep the application running
        }

    }
}