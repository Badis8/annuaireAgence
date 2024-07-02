package com.binit.agencymanagement.agency.manager;

import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.binit.agencymanagement.agency.utility.TimeInterval;


import java.util.Objects;
import com.binit.agencymanagement.agency.utility.TimeInterval;

public class Manager {

    private String fullName;
    private TimeInterval availability;
    private boolean isAvailable;
    private String email;
    private String phoneNumber;

    public Manager() {
    }

    public Manager(String fullName, TimeInterval availability, boolean isAvailable, String email, String phoneNumber) {
        this.fullName = fullName;
        this.availability = availability;
        this.isAvailable = isAvailable;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public TimeInterval getAvailability() {
        return availability;
    }

    public void setAvailability(TimeInterval availability) {
        this.availability = availability;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Manager)) {
            return false;
        }

        Manager other = (Manager) obj;

        return Objects.equals(other.fullName, this.fullName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.fullName);
    }

    @Override
    public String toString() {
        return "Manager{" +
                "fullName='" + fullName + '\'' +
                ", availability=" + availability +
                ", isAvailable=" + isAvailable +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }

    public static Manager fromString(String string) {
        Pattern pattern = Pattern.compile("Manager\\{fullName='([^']*)', availability=(.*), isAvailable=([^,]*), email='([^']*)', phoneNumber='([^']*)'\\}");
        Matcher matcher = pattern.matcher(string);

        if (matcher.matches()) {
            String fullName = matcher.group(1);
            TimeInterval availability = TimeInterval.fromString(matcher.group(2));
            boolean isAvailable = Boolean.parseBoolean(matcher.group(3));
            String email = matcher.group(4);
            String phoneNumber = matcher.group(5);

            return new Manager(fullName, availability, isAvailable, email, phoneNumber);
        } else {
            throw new IllegalArgumentException("Invalid Manager string: " + string);
        }
    }
}
