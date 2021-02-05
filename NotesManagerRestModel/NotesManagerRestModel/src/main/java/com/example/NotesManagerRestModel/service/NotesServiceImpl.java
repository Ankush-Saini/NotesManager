package com.example.NotesManagerRestModel.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import com.example.NotesManagerRestModel.entity.Notes;
@Service
public class NotesServiceImpl implements NotesService {
	@Autowired
	JdbcTemplate jdbcTemplate;
	@Override
	public List<Notes> findAllNotesByUserId(int userId) {
		List<Notes> noteList=new ArrayList<Notes>();
		noteList.addAll( (List<Notes> )jdbcTemplate.query("Select * from notes_usernotes where deleted_flag='N' and UserId="+userId+"",new ResultSetExtractor<List<Notes>>() {

			@Override
			public List<Notes> extractData(ResultSet rs) throws SQLException, DataAccessException {
				List<Notes> list=new ArrayList<Notes>();
				while(rs.next()) {
					Notes noteData=new Notes();
					noteData.setNoteId(rs.getInt("NoteId"));
					noteData.setTitle(rs.getString("Title"));
					noteData.setDescription(rs.getString("Description"));
					noteData.setUserId(rs.getInt("UserId"));
					noteData.setCreation_time(rs.getTimestamp("creation_date"));
					noteData.setDeletedFlag(rs.getString("deleted_flag").charAt(0));
					noteData.setDeleted_time(rs.getTimestamp("deleted_time"));
					list.add(noteData);
				}
				return list;
			}
			
		}));
		return noteList;
	}

	@Override
	public Notes createNotes(int userId,Notes noteData) {
		String insertSql="INSERT INTO NOTES_USERNOTES(Title,Description,UserId) VALUES (?,?,?)";
		//int val=jdbcTemplate.update(insertSql, new Object[]{Username});
		
		KeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(
		    new PreparedStatementCreator() {
		        public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
		            PreparedStatement ps =
		                connection.prepareStatement(insertSql, new String[] {"NoteId"});
		            ps.setString(1, noteData.getTitle());
		            ps.setString(2,noteData.getDescription());
		            ps.setInt(3, userId);
		            return ps;
		        }
		    },
		    keyHolder);
		noteData.setNoteId(keyHolder.getKey().intValue());
		noteData.setUserId(userId);
		noteData.setDeletedFlag('N');
		return noteData;
	}

	@Override
	public List<Notes> findAllDeletedNotesByUserId(int userId) {
		List<Notes> deletedNoteList=new ArrayList<Notes>();
		deletedNoteList.addAll( (List<Notes> )jdbcTemplate.query("Select * from notes_usernotes where deleted_flag='Y' and UserId="+userId+"",new ResultSetExtractor<List<Notes>>() {

			@Override
			public List<Notes> extractData(ResultSet rs) throws SQLException, DataAccessException {
				List<Notes> list=new ArrayList<Notes>();
				while(rs.next()) {
					Notes noteData=new Notes();
					noteData.setNoteId(rs.getInt("NoteId"));
					noteData.setTitle(rs.getString("Title"));
					noteData.setDescription(rs.getString("Description"));
					noteData.setUserId(rs.getInt("UserId"));
					noteData.setDeletedFlag(rs.getString("deleted_flag").charAt(0));
					noteData.setDeleted_time(rs.getTimestamp("deleted_time"));
					list.add(noteData);
				}
				return list;
			}
			
		}));
		return deletedNoteList;
	}
	
	@Override
	public Notes softDeleteNotes(int userId,Notes noteData) {
		String updateSql="update notes_usernotes set deleted_flag='Y',deleted_time=CURRENT_TIMESTAMP() where UserId=? and NoteId=?";
		jdbcTemplate.update(updateSql, userId,noteData.getNoteId());
		return null;
	}
	
	@Override
	public Notes deleteNotes(int userId,Notes noteData) {
		String deleteSql="DELETE FROM notes_usernotes where UserId=:userid and NoteId=:noteid";
		Map<String,Integer> namedParameters = new HashMap<String,Integer>();
		namedParameters.put("noteid", Integer.valueOf(noteData.getNoteId()));
		namedParameters.put("userid",Integer.valueOf(userId));
		jdbcTemplate.update(deleteSql, namedParameters);
		return null;
	}
	
	@Override
	public Notes deleteNotesAtfixedRate(int purgePeriod,String purgeUnit) {
		String deleteSql="DELETE FROM notes_usernotes where deleted_flag='Y' and deleted_time< (NOW() - INTERVAL "+purgePeriod+" "+purgeUnit+")";
		jdbcTemplate.update(deleteSql);
		return null;
	}

}
