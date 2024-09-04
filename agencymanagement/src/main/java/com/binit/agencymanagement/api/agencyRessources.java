package com.binit.agencymanagement.api;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.reactive.PartType;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.nio.file.StandardOpenOption;

import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.dto.AddEmployeRequest;
import com.binit.agencymanagement.dto.AgencyRequest;
import com.binit.agencymanagement.service.AgencyService;
import com.binit.agencymanagement.service.PathConverter;
import com.binit.agencymanagement.service.clientDjango;
import okhttp3.*;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
 
import io.smallrye.mutiny.Uni;


@Path("/agency")
public class AgencyRessources {
    @Inject AgencyService agencyService;
    @Inject
    @RestClient
    clientDjango djangoClientervice;
    
    OkHttpClient client = new OkHttpClient();
    @GET
    @Path("/parapID/{id}")
    public  Agency getAgencyById(@PathParam("id") String id) {
    
        return this.agencyService.getAgencyByID(id);
    }
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Path("/addAgency") 
    public void addAgency    (
        @RestForm("image") @PartType(MediaType.APPLICATION_OCTET_STREAM) FileUpload file,    
        @RestForm @PartType(MediaType.APPLICATION_JSON)AgencyRequest agency, @RestForm List<FileUpload> employeeImages
            )  throws Exception{ 
            String fileName = file.fileName();
            String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
            String idAgency= agencyService.addAgency(agency);  
            java.nio.file.Path targetPath = Paths.get("./static", idAgency+"."+fileExtension);
          
            String FinalName=idAgency+"."+fileExtension;
 
      
        java.nio.file.Path inputStream = file.uploadedFile() ; 
    Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);  
 
    for (int i = 0; i < employeeImages.size(); i++) {
    
        FileUpload employeeImage = employeeImages.get(i);
        String employeeFileName = employeeImage.fileName();
        java.nio.file.Path targetPathEmployee = Paths.get("./static/employees","employeeFileName"); 
        System.out.println(employeeFileName);
        String employeeFileNameWithoutExtension = employeeFileName.contains(".") 
        ? employeeFileName.substring(0, employeeFileName.lastIndexOf(".")) 
        : employeeFileName;

        Files.copy(employeeImage.uploadedFile(), targetPathEmployee, StandardCopyOption.REPLACE_EXISTING);
        File imageFile = targetPathEmployee.toFile();
 
        okhttp3.MediaType mediaType = okhttp3.MediaType.get("image/png");
            MultipartBody.Builder multipartBuilder = new MultipartBody.Builder().setType(MultipartBody.FORM);
            multipartBuilder.addFormDataPart("image", employeeFileName, RequestBody.create(imageFile, mediaType));
            multipartBuilder.addFormDataPart("filename", employeeFileNameWithoutExtension);

            RequestBody requestBody = multipartBuilder.build();

            Request request = new Request.Builder()
                    .url("http://localhost:8000/api/transform/")
                    .post(requestBody)
                    .build();

            try (okhttp3.Response response = this.client.newCall(request).execute()) {
                if (response.isSuccessful()) {
                    System.out.println("Image uploaded successfully: " + response.body().string());
                } else {
                    System.out.println("Failed to upload image: " + response.code() + " " + response.message());
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }


  
      
    
       
 
    @PUT
    @Path("/updateAgency/{id}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public void updateAgency(
        @PathParam("id") String id,
        @RestForm @PartType(MediaType.APPLICATION_JSON) AgencyRequest agencyRequest){
            System.out.println(agencyRequest.getPhoneNumber());
           this.agencyService.update(agencyRequest, id);
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

    @POST
    @Path("/saveImage")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public void saveImage(@RestForm("image") @PartType(MediaType.APPLICATION_OCTET_STREAM) FileUpload file) throws Exception {
        
    
        String fileName = file.fileName();
    
 
        java.nio.file.Path targetPath = Paths.get("./static/employees", fileName);
    
        
        java.nio.file.Path inputStream = file.uploadedFile() ; 
   
 
        Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
    }
} 
 
