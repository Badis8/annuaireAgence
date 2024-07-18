package com.binit.agencymanagement.api;

import jakarta.inject.Inject;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;

import java.util.List;

import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.dto.AddEmployeRequest;
import com.binit.agencymanagement.dto.AgencyRequest;
import com.binit.agencymanagement.service.AgencyService;

@Path("/agency")
public class AgencyRessources {
    @Inject AgencyService agencyService;
    @POST
    @Path("/addAgency")
    public void addAgency(AgencyRequest agency){
        agencyService.addAgency(agency);
    }
    @GET
    @Path("/listAgencys")
    public List<Agency> listAgency(){
         return  agencyService.listAgency();
    }
    @DELETE
    @Path("/deleteAll")
    public void deleteAll(){
            agencyService.deleteAll();
    }
    @POST
    @Path("/addEmploye")
    public void addEmploye(AddEmployeRequest request){
          this.agencyService.addEmployeeToAgency(request.getEmploye(),request.getIdAgency());
    }
}
