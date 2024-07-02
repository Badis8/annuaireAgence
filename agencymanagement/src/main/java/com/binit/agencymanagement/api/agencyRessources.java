package com.binit.agencymanagement.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;

import java.util.List;

import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.service.AgencyService;

@Path("/agency")
public class agencyRessources {
    @Inject AgencyService agencyService;
    @POST
    @Path("/addAgency")
    public void addAgency(Agency agency){
        agencyService.addAgency(agency);
    }
    @GET
    @Path("/listAgencys")
    public List<Agency> listAgency(){
         return  agencyService.listAgency();
    }
}
