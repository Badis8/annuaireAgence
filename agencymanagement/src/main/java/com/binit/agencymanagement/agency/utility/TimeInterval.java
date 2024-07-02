package com.binit.agencymanagement.agency.utility;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TimeInterval {
    private LocalTime from;
    private LocalTime to;

    public TimeInterval(LocalTime from, LocalTime to) {
        this.from = from;
        this.to = to;
    }
    
    public TimeInterval( ) {
    
    }

    public LocalTime getFrom() {
        return from;
    }

    public void setFrom(LocalTime from) {
        this.from = from;
    }

    public LocalTime getTo() {
        return to;
    }

    public void setTo(LocalTime to) {
        this.to = to;
    }

    @Override
    public String toString() {
        return "TimeInterval{" +
                "from=" + from +
                ", to=" + to +
                '}';
    }

      public static TimeInterval fromString(String string) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_TIME;
        Pattern pattern = Pattern.compile("TimeInterval\\{from=(.+), to=(.+)\\}");
        Matcher matcher = pattern.matcher(string);
        
        if (matcher.matches()) {
            LocalTime from = LocalTime.parse(matcher.group(1), formatter);
            LocalTime to = LocalTime.parse(matcher.group(2), formatter);
            return new TimeInterval(from, to);
        } else {
            throw new IllegalArgumentException("Invalid TimeInterval string: " + string);
        }
    }
}
