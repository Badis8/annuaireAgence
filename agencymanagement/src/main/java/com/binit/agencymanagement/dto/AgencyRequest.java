package com.binit.agencymanagement.dto;

import java.util.List;
import java.util.Map;
import com.binit.agencymanagement.agency.employe.Employe;
import com.binit.agencymanagement.agency.utility.WorkingHours;

public class AgencyRequest {

    private String zone;
    private Map<String, WorkingHours> workingHours;
    private String address;
    private Employe manager;
 
    private double latitude;
    private double longitude;
    private String commune;
    private String phoneNumber;   
    private List<Employe> employees;

    public AgencyRequest() {
    }

    public AgencyRequest(String zone, Map<String, WorkingHours> workingHours, String address, Employe manager,double latitude, double longitude, String commune, String phoneNumber,List<Employe> employees) {
        this.zone = zone;
        this.workingHours = workingHours;
        this.address = address;
        this.manager = manager;
 
        this.latitude = latitude;
        this.longitude = longitude;
        this.commune = commune;
        this.phoneNumber = phoneNumber;  
        this.employees=employees;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public Map<String, WorkingHours> getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(Map<String, WorkingHours> workingHours) {
        this.workingHours = workingHours;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public String getCommune() {
        return commune;
    }

    public void setCommune(String commune) {
        this.commune = commune;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    } 

    
    public List<Employe> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employe> employees) {
        this.employees = employees;
    }

  
}
