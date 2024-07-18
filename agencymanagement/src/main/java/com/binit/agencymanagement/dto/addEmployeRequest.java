package com.binit.agencymanagement.dto;

import com.binit.agencymanagement.agency.employe.Employe;

public class AddEmployeRequest {
    private Employe employe;
    private String idAgency;

    public AddEmployeRequest() {}

    public AddEmployeRequest(Employe employe, String idAgency) {
        this.employe = employe;
        this.idAgency = idAgency;
    }

    public Employe getEmploye() {
        return employe;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }

    public String getIdAgency() {
        return idAgency;
    }

    public void setIdAgency(String idAgency) {
        this.idAgency = idAgency;
    }

    @Override
    public String toString() {
        return "AddEmployeRequest{" +
                "employe=" + employe +
                ", idAgency='" + idAgency + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AddEmployeRequest that = (AddEmployeRequest) o;

        if (employe != null ? !employe.equals(that.employe) : that.employe != null) return false;
        return idAgency != null ? idAgency.equals(that.idAgency) : that.idAgency == null;
    }

    @Override
    public int hashCode() {
        int result = employe != null ? employe.hashCode() : 0;
        result = 31 * result + (idAgency != null ? idAgency.hashCode() : 0);
        return result;
    }
}
