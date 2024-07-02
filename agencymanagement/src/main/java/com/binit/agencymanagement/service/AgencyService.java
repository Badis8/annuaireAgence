package com.binit.agencymanagement.service;
import java.util.List;

import com.binit.agencymanagement.agency.Agency;
public interface AgencyService {
        
        public void addAgency(Agency agency) ; 

        public List<Agency> listAgency() ; 


}
