package com.example.NotesManagerRestModel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.NotesManagerRestModel.entity.Users;
import com.example.NotesManagerRestModel.service.UserService;

@RestController
public class UserController {
	@Autowired
	private UserService userService;
	
	@CrossOrigin
	@GetMapping(value="/users",produces=MediaType.APPLICATION_JSON_VALUE)
	public List<Users> getUsers(){
		return userService.findAllUsers();
	}
	
	@RequestMapping(path = "/users/{userId}",method = RequestMethod.GET)
	public Users getUserById(@PathVariable int userId){
		return null;
	}
	@PostMapping(value="/users")
	public Users createUser(@RequestBody Users userData){
		return userService.createUser(userData);
	}
	@RequestMapping(path = "/users/{userId}",method = RequestMethod.DELETE)
	public Users deleteUser(@PathVariable int userId){
		return null;
	}
}
