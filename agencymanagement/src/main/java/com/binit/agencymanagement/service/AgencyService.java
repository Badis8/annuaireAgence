package com.binit.agencymanagement.service;
import java.util.List;

import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.dto.AgencyRequest;
public interface AgencyService {
        
        public void addAgency(AgencyRequest agency ); 

        public List<Agency> listAgency() ; 

        public void deleteAll();


}
