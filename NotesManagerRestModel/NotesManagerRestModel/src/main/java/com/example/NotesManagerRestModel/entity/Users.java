package com.example.NotesManagerRestModel.entity;

public class Users {
	int userId;
	String userName;
	
	public Users() {
		super();
	}
	public Users(int userId, String userName) {
		super();
		this.userId = userId;
		this.userName = userName;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
}
