package com.example.NotesManagerRestModel.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import com.example.NotesManagerRestModel.entity.Users;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	JdbcTemplate jdbcTemplate;
	@Override
	public List<Users> findAllUsers() {
		List<Users> userList=new ArrayList<Users>();
		userList.addAll( (List<Users> )jdbcTemplate.query("Select * from notes_users",new ResultSetExtractor<List<Users>>() {

			@Override
			public List<Users> extractData(ResultSet rs) throws SQLException, DataAccessException {
				List<Users> list=new ArrayList<Users>();
				while(rs.next()) {
					Users userData=new Users();
					userData.setUserId(rs.getInt("UserId"));
					userData.setUserName(rs.getString("UserName"));
					list.add(userData);
				}
				return list;
			}
			
		}));
		return userList;
	}

	@Override
	public Users findUserById(int userId) {
		
		return null;
	}

	@Override
	public Users createUser(Users userData) {
		String insertSql="INSERT INTO NOTES_USERS(UserName) VALUES (?)";
		//int val=jdbcTemplate.update(insertSql, new Object[]{Username});
		
		KeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(
		    new PreparedStatementCreator() {
		        public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
		            PreparedStatement ps =
		                connection.prepareStatement(insertSql, new String[] {"UserId"});
		            ps.setString(1, userData.getUserName());
		            return ps;
		        }
		    },
		    keyHolder);
		userData.setUserId(keyHolder.getKey().intValue());
		return userData;
	}

	@Override
	public Users deleteUser(int userId) {
		// TODO Auto-generated method stub
		return null;
	}

}
