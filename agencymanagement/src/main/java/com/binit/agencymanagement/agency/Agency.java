package com.binit.agencymanagement.agency;

import java.util.List;
import java.util.Objects;

import com.binit.agencymanagement.agency.utility.WorkingHours;
import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.agency.employe.Employe;
public class Agency {

    
    private WorkingHours workingHours;
    private String zone;
    private String id;
    private Employe manager;
    private String address;
    private List<Employe> employees; 
    public Agency() {
    }

    public Agency(  WorkingHours workingHours, String zone, String id, Employe manager,String description) {
        
        this.workingHours = workingHours;
        this.zone = zone;
        this.id = id;
        this.manager = manager;
        this.address=description;
    }

    
    public WorkingHours getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(WorkingHours workingHours) {
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

    public Employe getmanager() {
        return manager;
    }

    public void setmanager(Employe manager) {
        this.manager = manager;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Agency)) {
            return false;
        }

        Agency other = (Agency) obj;

        return  
               Objects.equals(other.id, this.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash( this.id);
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
     
        employees.removeIf(emp -> emp.getEmployeID().equals(idEmployee)); //annoying that it iterates after finding the id
    }

}
