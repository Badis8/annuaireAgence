package com.binit.agencymanagement.agency.employe;

import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.binit.agencymanagement.agency.utility.WorkingHours;

public class Employe {
    private String employeID;
    private String fullName;
    private WorkingHours availability;
    private String email;
    private String phoneNumber;

    public Employe() {
    }
    public String getEmployeID() {
        return employeID;
    }

    public void setEmployeID(String employeID) {
        this.employeID = employeID;
    }
    public Employe(String fullName, WorkingHours availability, String email, String phoneNumber) {
        this.fullName = fullName;
        this.availability = availability;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public WorkingHours getAvailability() {
        return availability;
    }

    public void setAvailability(WorkingHours availability) {
        this.availability = availability;
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
        if (!(obj instanceof Employe)) {
            return false;
        }

        Employe other = (Employe) obj;

        return Objects.equals(other.fullName, this.fullName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.fullName);
    }

    @Override
    public String toString() {
        return "Employe{" +
                "fullName='" + fullName + '\'' +
                ", availability=" + availability +
           
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }

    public static Employe fromString(String string) {
        Pattern pattern = Pattern.compile("Employe\\{fullName='([^']*)', availability=(.*), email='([^']*)', phoneNumber='([^']*)'\\}");
        Matcher matcher = pattern.matcher(string);

        if (matcher.matches()) {
            String fullName = matcher.group(1);
            WorkingHours availability = WorkingHours.fromString(matcher.group(2));
            String email = matcher.group(4);
            String phoneNumber = matcher.group(5);

            return new Employe(fullName, availability, email, phoneNumber);
        } else {
            throw new IllegalArgumentException("Invalid Manager string: " + string);
        } 
    }
}
