package com.binit.agencymanagement.repository;

import java.util.List;

import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.agency.employe.Employe;

public interface AgencyRepository {
    

    public void add(Agency agency);

    public List<Agency> list();

    public void removeAll();

    public void addEmployee(Employe employe, String id); 

    public void removeEmployee(String employeID, String id); 
   
    public Agency getAgency(String EmployeID);
}
