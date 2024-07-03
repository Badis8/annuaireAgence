package com.binit.agencymanagement.service;

import java.util.List;

import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.dto.AgencyRequest;
import com.binit.agencymanagement.repository.AgencyRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import com.binit.agencymanagement.events.model.AgencyLocationPinPointed;
import com.binit.agencymanagement.events.producer.AgencyEventProducer;
@ApplicationScoped
public class AgencyServiceImplementation implements AgencyService {
    @Inject AgencyRepository agencyRepository;
    @Inject AgencyEventProducer AgencyEventProducer;

    @Override
    public void addAgency(AgencyRequest agencyRequest ) {

        agencyRepository.add(new Agency(agencyRequest.getName(),agencyRequest.getWorkingHours(),agencyRequest.getType(),agencyRequest.getId(),agencyRequest.getManager(),agencyRequest.getDescription()));
  
        AgencyEventProducer.emitAgencyLocationPinPointed(new AgencyLocationPinPointed(agencyRequest.getId(),agencyRequest.getLongitude(), agencyRequest.getLatitude()));
    }

    @Override
    public List<Agency> listAgency() {
        return agencyRepository.list();
    }
    
}
