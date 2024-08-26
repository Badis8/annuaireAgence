package com.binit.agencymanagement.service;
import java.util.List;

import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.agency.employe.Employe;
import com.binit.agencymanagement.dto.AgencyRequest;
public interface AgencyService {
        
        public String addAgency(AgencyRequest agency ); 

        public List<Agency> listAgency() ; 

        public void deleteAll();

        public void addEmployeeToAgency(Employe employe,String idAgency);

        public void removeEmployeeToAgency(String idEmploye,String employeToRemove);

        public Agency getAgencyByID(String idAgency);

        public void deleteAgency(String idAgency);

}
