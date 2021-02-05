package com.example.NotesManagerRestModel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.NotesManagerRestModel.entity.Notes;
import com.example.NotesManagerRestModel.service.NotesService;
import java.util.List;
@RestController
public class NotesController {
	@Autowired
	private NotesService notesService;
	
	@CrossOrigin
	@RequestMapping(path="/users/{userId}/notes/",method = RequestMethod.GET)
	public List<Notes> getNotesByUserId(@PathVariable int userId){
		return notesService.findAllNotesByUserId(userId);
	}
	
	@PostMapping(value="/users/{userId}/notes/")
	public Notes createNotes(@PathVariable int userId,@RequestBody Notes noteData){
		return notesService.createNotes(userId,noteData);
	}
	
	@DeleteMapping(value="/users/{userId}/notes/")
	public Notes deleteNotes(@PathVariable int userId,@RequestBody Notes noteData){
		return notesService.softDeleteNotes(userId,noteData);
	}
	
	@CrossOrigin
	@RequestMapping(path="/users/{userId}/deleted-notes/",method = RequestMethod.GET)
	public List<Notes> getDeletedNotesByUserId(@PathVariable int userId){
		return notesService.findAllDeletedNotesByUserId(userId);
	}
	
}
