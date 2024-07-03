package com.binit.agencymanagement.repository.repositoryimplementation;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;

import java.util.ArrayList;
import java.util.List;

import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.repository.AgencyRepository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
@ApplicationScoped
public class AgencyRepositoryImplementation implements AgencyRepository {

    @Inject MongoClient mongoClient;
      public List<Agency> list(){
        List<Agency> list = new ArrayList<>();
        MongoCursor<Agency> cursor = getCollection().find().iterator();

        try {
            while (cursor.hasNext()) {
                list.add(cursor.next());
            }
        } finally {
            cursor.close();
        }
        return list;
    }
    public void add(Agency agency){
        getCollection().insertOne(agency);
    }
    private MongoCollection<Agency> getCollection(){
        return mongoClient.getDatabase("Agency").getCollection("Agency", Agency.class);
    }
}
