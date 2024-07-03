package com.binit.agencymanagement.dto;

import com.binit.agencymanagement.agency.manager.Manager;
import com.binit.agencymanagement.agency.utility.TimeInterval;

public class AgencyRequest {

    private String name;
    private TimeInterval workingHours;
    private String type;
    private String id;
    private Manager manager;
    private String description;
    private double latitude;
    private double longitude;

    public AgencyRequest() {
    }

    public AgencyRequest(String name, TimeInterval workingHours, String type, String id, Manager manager, String description, double latitude, double longitude) {
        this.name = name;
        this.workingHours = workingHours;
        this.type = type;
        this.id = id;
        this.manager = manager;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TimeInterval getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(TimeInterval workingHours) {
        this.workingHours = workingHours;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Manager getManager() {
        return manager;
    }

    public void setManager(Manager manager) {
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
