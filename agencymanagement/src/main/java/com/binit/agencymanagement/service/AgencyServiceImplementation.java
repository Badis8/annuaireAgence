package com.binit.agencymanagement.service;

import java.util.List;
import java.util.UUID;
import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.agency.employe.Employe;
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
        String randomId = UUID.randomUUID().toString();
        agencyRepository.add(new Agency(agencyRequest.getWorkingHours(),agencyRequest.getZone(),randomId,agencyRequest.getManager(),agencyRequest.getDescription(),agencyRequest.getCommune(),agencyRequest.getPhoneNumber()));
  
        AgencyEventProducer.emitAgencyLocationPinPointed(new AgencyLocationPinPointed(randomId,agencyRequest.getLongitude(), agencyRequest.getLatitude()));
    }

    @Override
    public List<Agency> listAgency() {
        return agencyRepository.list();
    }

    @Override
    public void deleteAll() {
       this.agencyRepository.removeAll();
    }

    @Override
    public void addEmployeeToAgency(Employe employe,String idAgency) {
        this.agencyRepository.addEmployee(employe, idAgency);
    }

    @Override
    public void removeEmployeeToAgency(String idAgency,String employeToRemove) {
        this.addEmployeeToAgency(null, idAgency);
    }

    @Override
    public Agency  getAgencyByID(String idAgency) {
      return this.agencyRepository.getAgency(idAgency);
    }

    @Override
    public void deleteAgency(String idAgency) {
      this.agencyRepository.removeById(idAgency);
    }
    
}
