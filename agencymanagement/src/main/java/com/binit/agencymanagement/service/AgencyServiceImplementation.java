package com.binit.agencymanagement.service;

import java.util.List;

import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.repository.AgencyRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
@ApplicationScoped
public class AgencyServiceImplementation implements AgencyService {
    @Inject AgencyRepository agencyRepository;

    @Override
    public void addAgency(Agency agency) {
        agencyRepository.add(agency);
    }

    @Override
    public List<Agency> listAgency() {
        return agencyRepository.list();
    }
    
}
