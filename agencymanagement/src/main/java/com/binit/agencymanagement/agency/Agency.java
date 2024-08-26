package com.binit.agencymanagement.agency;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.binit.agencymanagement.agency.utility.WorkingHours;
import com.binit.agencymanagement.agency.employe.Employe;

public class Agency {

    private Map<String, WorkingHours> workingHours; 
    private String zone;
    private String id;
    private Employe manager;
    private String address;
    private List<Employe> employees;
    private String commune;
    private String phoneNumber;  

    public Agency() {
    }

    public Agency(Map<String, WorkingHours> workingHours, String zone, String id, Employe manager, String address, String commune, String phoneNumber,List<Employe> employees) {
        this.workingHours = workingHours;
        this.zone = zone;
        this.id = id;
        this.manager = manager;
        this.address = address;
        this.commune = commune;   
        this.phoneNumber = phoneNumber;   
        this.employees=employees;
    }

    public Map<String, WorkingHours> getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(Map<String, WorkingHours> workingHours) {
        this.workingHours = workingHours;
    }

    public String getZone() {
        return zone;
    }

    public void setZone(String zone) {
        this.zone = zone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Employe getManager() {
        return manager;
    }

    public void setManager(Employe manager) {
        this.manager = manager;
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

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Agency)) {
            return false;
        }

        Agency other = (Agency) obj;

        return Objects.equals(other.id, this.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    public List<Employe> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employe> employees) {
        this.employees = employees;
    }

    public void addEmployee(Employe employee) {
        this.employees.add(employee);
    }

    public void removeEmployeeById(String idEmployee) {
        employees.removeIf(emp -> emp.getEmployeID().equals(idEmployee));
    }
}
