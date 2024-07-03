package com.binit.agencylocationmanagement.events.model.deserializer;

import com.binit.agencylocationmanagement.events.model.AgencyLocationPinPointed;

import io.quarkus.kafka.client.serialization.ObjectMapperDeserializer;

public class AgencyLocationPinPointedDeserializer extends ObjectMapperDeserializer<AgencyLocationPinPointed>  {

    public AgencyLocationPinPointedDeserializer() {
        super(AgencyLocationPinPointed.class);
 
    }
    
}
