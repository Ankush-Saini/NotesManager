package com.example.NotesManagerRestModel.service;

import java.util.List;

import com.example.NotesManagerRestModel.entity.Notes;

public interface NotesService {

	List<Notes> findAllNotesByUserId(int userId);

	Notes createNotes(int userId,Notes noteData);

	List<Notes> findAllDeletedNotesByUserId(int userId);

	Notes deleteNotes(int userId,Notes noteData);

	Notes softDeleteNotes(int userId, Notes noteData);

	Notes deleteNotesAtfixedRate(int purgePeriod, String purgeUnit);

}
