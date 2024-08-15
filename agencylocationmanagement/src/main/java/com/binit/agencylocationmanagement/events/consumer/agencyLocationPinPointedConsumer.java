package  com.binit.agencylocationmanagement.events.consumer;

import org.eclipse.microprofile.reactive.messaging.Incoming;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import  com.binit.agencylocationmanagement.agency.Agency;
import  com.binit.agencylocationmanagement.events.model.AgencyLocationPinPointed;
import  com.binit.agencylocationmanagement.repository.AgencyRepository;
@ApplicationScoped
public class agencyLocationPinPointedConsumer {
    @Inject AgencyRepository agencyRepository;

    @Transactional
    @Incoming("agencyPinPointed")
    public void consumeAgencyPinPointed(AgencyLocationPinPointed  agencyLocationPinPointed) {
        agencyRepository.add(new Agency(agencyLocationPinPointed));

    }

   

    @Transactional
    @Incoming("agencyDeleted")
    public void consumeAgencyDeleted(String  id) {
        System.out.println(id);
        agencyRepository.removeById(id);

    }



}