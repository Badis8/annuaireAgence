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
    public String addAgency(AgencyRequest agencyRequest ) {
        String randomId = UUID.randomUUID().toString();
        agencyRepository.add(new Agency(agencyRequest.getWorkingHours(),agencyRequest.getZone(),randomId,agencyRequest.getManager(),agencyRequest.getAddress(),agencyRequest.getCommune(),agencyRequest.getPhoneNumber(),agencyRequest.getEmployees()));
  
        AgencyEventProducer.emitAgencyLocationPinPointed(new AgencyLocationPinPointed(randomId,agencyRequest.getLongitude(), agencyRequest.getLatitude()));
        return randomId;
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
      this.AgencyEventProducer.emitAgencyDeleted(idAgency);
    }

    @Override
    public void update(AgencyRequest agencyRequest, String id) {
        Agency agency=new Agency(agencyRequest.getWorkingHours(),agencyRequest.getZone(),id,agencyRequest.getManager(),agencyRequest.getAddress(),agencyRequest.getCommune(),agencyRequest.getPhoneNumber(),agencyRequest.getEmployees());
       this.agencyRepository.update(agency);
       AgencyEventProducer.emitAgencyUpdated(new AgencyLocationPinPointed(id,agencyRequest.getLongitude(), agencyRequest.getLatitude()));
    }
    
}
