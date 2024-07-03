package com.binit.agencylocationmanagement.api;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import  com.binit.agencylocationmanagement.agency.Agency;
import java.util.List;
import  com.binit.agencylocationmanagement.repository.AgencyRepository;
@Path("/agency")
public class AgencyRessources {
    @Inject  AgencyRepository agencyRepository;
    @GET
    @Path("/listAgencys")
    public List<Agency> listAgency(){
        
         return  agencyRepository.list() ; 
     }
}
