package com.binit.agencymanagement.agency.utility;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class WorkingHours {
    private TimeInterval morningSession;
    private TimeInterval eveningSession;

    public WorkingHours(TimeInterval morningSession, TimeInterval eveningSession) {
        this.morningSession = morningSession;
        this.eveningSession = eveningSession;
    }

    public WorkingHours() {}

    public TimeInterval getMorningSession() {
        return morningSession;
    }

    public void setMorningSession(TimeInterval morningSession) {
        this.morningSession = morningSession;
    }

    public TimeInterval getEveningSession() {
        return eveningSession;
    }

    public void setEveningSession(TimeInterval eveningSession) {
        this.eveningSession = eveningSession;
    }

    @Override
    public String toString() {
        return "WorkingHours{" +
                "morningSession=" + morningSession +
                ", eveningSession=" + eveningSession +
                '}';
    }

    public static WorkingHours fromString(String string) {
        Pattern pattern = Pattern.compile("WorkingHours\\{morningSession=(.+), eveningSession=(.+)\\}");
        Matcher matcher = pattern.matcher(string);

        if (matcher.matches()) {
            TimeInterval morningSession = TimeInterval.fromString(matcher.group(1));
            TimeInterval eveningSession = TimeInterval.fromString(matcher.group(2));
            return new WorkingHours(morningSession, eveningSession);
        } else {
            throw new IllegalArgumentException("Invalid WorkingHours string: " + string);
        }
    }
}