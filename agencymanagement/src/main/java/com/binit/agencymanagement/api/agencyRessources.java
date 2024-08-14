package com.binit.agencymanagement.api;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import org.jboss.resteasy.reactive.PartType;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.dto.AddEmployeRequest;
import com.binit.agencymanagement.dto.AgencyRequest;
import com.binit.agencymanagement.service.AgencyService;



@Path("/agency")
public class AgencyRessources {
    @Inject AgencyService agencyService;

    

    @GET
    @Path("/parapID/{id}")
    public  Agency getAgencyById(@PathParam("id") String id) {
    
        return this.agencyService.getAgencyByID(id);
    }
    @POST
    @Consumes(MediaType.APPLICATION_JSON) 
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

 @DELETE
    @RolesAllowed("admin")
    @Path("/delete/{id}")
    public Response deleteAgency(@PathParam("id") String id) {
        try {
            this.agencyService.deleteAgency(id);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("Failed to delete agency: " + e.getMessage())
                           .build();
        }
    }

    public static class Person {
        public String firstName;
        public String lastName;
    }

    @POST
    @Path("/addImage")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public void multipart(@RestForm String description,
                          @RestForm("image") @PartType(MediaType.APPLICATION_OCTET_STREAM) FileUpload file,
                          @RestForm @PartType(MediaType.APPLICATION_JSON) Person person) throws Exception {
     
 
 
        java.nio.file.Path targetPath = Paths.get("./", file.fileName());
 
       java.nio.file.Path inputStream = file.uploadedFile() ; 
            Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
       

       
        System.out.println("File uploaded to: " + targetPath);
    }
}
 
