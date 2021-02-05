package com.example.NotesManagerRestModel.scheduler;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.NotesManagerRestModel.service.NotesService;

@Component
public class NoteRemovalScheduler {
	@Autowired NotesService noteService;
	
	private enum PurgeUnits {
		MICROSECOND,
		SECOND,
		MINUTE,
		HOUR,
		DAY,
		WEEK,
		MONTH,
		QUARTER,
		YEAR,
		SECOND_MICROSECOND,
		MINUTE_MICROSECOND,
		MINUTE_SECOND,
		HOUR_MICROSECOND,
		HOUR_SECOND,
		HOUR_MINUTE,
		DAY_MICROSECOND,
		DAY_SECOND,
		DAY_MINUTE,
		DAY_HOUR,
		YEAR_MONTH
	};
	private int purgePeriod=5;
	private String purgeUnit=PurgeUnits.MINUTE.toString();
	@Scheduled(fixedRate=30000)
	public void fixedRateNoteRemoval() {
		  SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");

	      Date now = new Date();
	      String strDate = sdf.format(now);
	      System.out.println("Fixed Rate scheduler:: " + strDate);
		noteService.deleteNotesAtfixedRate(purgePeriod,purgeUnit);
	}
}
