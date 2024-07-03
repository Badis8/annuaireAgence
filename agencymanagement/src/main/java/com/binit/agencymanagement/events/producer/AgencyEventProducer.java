package com.binit.agencymanagement.events.producer;

import com.binit.agencymanagement.events.model.AgencyLocationPinPointed;

public interface AgencyEventProducer {

    public void emitAgencyLocationPinPointed(AgencyLocationPinPointed agencyLocationPinPointed);
    
} 
