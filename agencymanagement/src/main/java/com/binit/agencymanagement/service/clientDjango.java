package com.binit.agencymanagement.service;
import java.io.File;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.jboss.resteasy.reactive.RestForm;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.MediaType;
import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.core.buffer.Buffer;

@RegisterRestClient(configKey = "python-api")
public interface clientDjango {

    @POST
    @Path("/api/transform/")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    Uni<String> sendImage(@RestForm("image") File file, @RestForm("filename") String newFileName);  
}