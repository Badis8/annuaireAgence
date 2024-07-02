package com.binit.agencymanagement.agency;

import java.util.Objects;
import com.binit.agencymanagement.agency.manager.Manager;
import com.binit.agencymanagement.agency.utility.TimeInterval;
import com.binit.agencymanagement.agency.Agency;
public class Agency {

    private String name;
    private TimeInterval workingHours;
    private String type;
    private String id;
    private Manager manager;
    private String description;

    public Agency() {
    }

    public Agency(String name, TimeInterval workingHours, String type, String id, Manager manager,String description) {
        this.name = name;
        this.workingHours = workingHours;
        this.type = type;
        this.id = id;
        this.manager = manager;
        this.description=description;
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
