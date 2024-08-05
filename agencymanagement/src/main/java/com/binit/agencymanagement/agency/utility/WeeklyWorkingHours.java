package com.binit.agencymanagement.agency.utility;

import java.util.HashMap;
import java.util.Map;

public class WeeklyWorkingHours {

    private Map<String, WorkingHours> workingHours;

    public WeeklyWorkingHours() {
        workingHours = new HashMap<>();
        workingHours.put("monday", new WorkingHours());
        workingHours.put("tuesday", new WorkingHours());
        workingHours.put("wednesday", new WorkingHours());
        workingHours.put("thursday", new WorkingHours());
        workingHours.put("friday", new WorkingHours());
        workingHours.put("saturday", new WorkingHours());
    }

    public Map<String, WorkingHours> getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(String day, WorkingHours hours) {
        if (workingHours.containsKey(day.toLowerCase())) {
            workingHours.put(day.toLowerCase(), hours);
        } else {
            throw new IllegalArgumentException("Invalid day: " + day);
        }
    }

    public WorkingHours getWorkingHoursForDay(String day) {
        return workingHours.get(day.toLowerCase());
    } 


}
