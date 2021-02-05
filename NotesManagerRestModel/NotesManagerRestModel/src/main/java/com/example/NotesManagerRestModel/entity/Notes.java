package com.example.NotesManagerRestModel.entity;

import java.sql.Timestamp;

public class Notes {
	int noteId;
	String title;
	String description;
	int userId;
	Timestamp creation_time;
	char deletedFlag;
	Timestamp deleted_time;

	public Notes() {
		super();
	}
	public Notes(int noteId, String title, String description, int userId) {
		super();
		this.noteId = noteId;
		this.title = title;
		this.description = description;
		this.userId = userId;
	}
	public int getNoteId() {
		return noteId;
	}
	public void setNoteId(int noteId) {
		this.noteId = noteId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public Timestamp getCreation_time() {
		return creation_time;
	}
	public void setCreation_time(Timestamp creation_time) {
		this.creation_time = creation_time;
	}
	public char getDeletedFlag() {
		return deletedFlag;
	}
	public void setDeletedFlag(char deletedFlag) {
		this.deletedFlag = deletedFlag;
	}
	public Timestamp getDeleted_time() {
		return deleted_time;
	}
	public void setDeleted_time(Timestamp deleted_time) {
		this.deleted_time = deleted_time;
	}
}
