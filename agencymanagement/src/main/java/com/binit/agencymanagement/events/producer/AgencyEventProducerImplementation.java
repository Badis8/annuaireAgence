package com.binit.agencymanagement.events.producer;

 

import org.eclipse.microprofile.reactive.messaging.Channel;
import org.eclipse.microprofile.reactive.messaging.Emitter;
import io.smallrye.reactive.messaging.kafka.Record;
import com.binit.agencymanagement.events.model.AgencyLocationPinPointed;

public class AgencyEventProducerImplementation implements  AgencyEventProducer  {
    @Channel("agencyPinPointed")
    Emitter< AgencyLocationPinPointed> agencyPinPointedEmitter;
    @Override
    public void emitAgencyLocationPinPointed(AgencyLocationPinPointed agencyLocationPinPointed) {
        agencyPinPointedEmitter.send( agencyLocationPinPointed);
    }

}
