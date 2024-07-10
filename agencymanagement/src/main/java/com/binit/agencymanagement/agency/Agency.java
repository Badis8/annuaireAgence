package com.binit.agencymanagement.agency;

import java.util.Objects;
import com.binit.agencymanagement.agency.manager.Manager;
import com.binit.agencymanagement.agency.utility.WorkingHours;
import com.binit.agencymanagement.agency.Agency;
public class Agency {

    private String name;
    private WorkingHours workingHours;
    private String zone;
    private String id;
    private Manager manager;
    private String address;

    public Agency() {
    }

    public Agency(String name, WorkingHours workingHours, String type, String id, Manager manager,String description) {
        this.name = name;
        this.workingHours = workingHours;
        this.zone = type;
        this.id = id;
        this.manager = manager;
        this.address=description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Manager getmanager() {
        return manager;
    }

    public void setmanager(Manager manager) {
        this.manager = manager;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Agency)) {
            return false;
        }

        Agency other = (Agency) obj;

        return Objects.equals(other.name, this.name) &&
               Objects.equals(other.id, this.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.name, this.id);
    }
}
