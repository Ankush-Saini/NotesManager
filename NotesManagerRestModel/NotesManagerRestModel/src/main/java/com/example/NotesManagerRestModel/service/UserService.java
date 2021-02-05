package com.example.NotesManagerRestModel.service;

import java.util.List;

import com.example.NotesManagerRestModel.entity.Users;

public interface UserService {
	public List<Users> findAllUsers();
	public Users findUserById(int userId);
	public Users createUser(Users userData);
	public Users deleteUser(int userId);
}
