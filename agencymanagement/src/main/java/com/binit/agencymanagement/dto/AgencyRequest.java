package com.binit.agencymanagement.dto;

import com.binit.agencymanagement.agency.employe.Employe;
import com.binit.agencymanagement.agency.utility.TimeInterval;
import com.binit.agencymanagement.agency.utility.WorkingHours;

public class AgencyRequest {

    private String zone;
    private WorkingHours workingHours;
    private String address;
    private Employe manager;
    private String description;
    private double latitude;
    private double longitude;

    public AgencyRequest() {
    }

    public AgencyRequest(String zone, WorkingHours workingHours, String address, String id, Employe manager, String description, double latitude, double longitude) {
        this.zone = zone;
        this.workingHours = workingHours;
        this.address = address;
        this.manager = manager;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getzone() {
        return zone;
    }

    public void setzone(String zone) {
        this.zone = zone;
    }

    public WorkingHours getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(WorkingHours workingHours) {
        this.workingHours = workingHours;
    }

    public String getaddress() {
        return address;
    }

    public void setaddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

 
    public Employe getManager() {
        return manager;
    }

    public void setManager(Employe manager) {
        this.manager = manager;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }
}
