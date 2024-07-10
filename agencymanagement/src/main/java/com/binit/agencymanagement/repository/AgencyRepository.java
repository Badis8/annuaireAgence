package com.binit.agencymanagement.repository;

import java.util.List;

import com.binit.agencymanagement.agency.Agency;

public interface AgencyRepository {
    

    public void add(Agency agency);

    public List<Agency> list();

    public void removeAll();
   
}
