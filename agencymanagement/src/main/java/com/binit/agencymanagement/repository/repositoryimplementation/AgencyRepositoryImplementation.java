package com.binit.agencymanagement.repository.repositoryimplementation;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;
 
import com.mongodb.client.model.Updates;
 

import java.util.ArrayList;
import java.util.List;

import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.agency.employe.Employe;
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
    @Override
    public void removeAll() {
        mongoClient.getDatabase("Agency").getCollection("Agency").deleteMany(Filters.empty());
    }
    @Override
    public void addEmployee(Employe employe, String id) {
        MongoCollection<Agency> collection = getCollection();
        collection.updateOne(Filters.eq("id", id), Updates.addToSet("employees", employe));
    }
    
    @Override
    public void removeEmployee(String employe, String id) {
        MongoCollection<Agency> collection = getCollection();
        collection.updateOne(Filters.eq("id", id), Updates.pull("employees", employe));
    }
    @Override
    public Agency getAgency(String agencyID) {
        MongoCollection<Agency> collection = getCollection();
        return collection.find(Filters.eq("id", agencyID)).first();
    }
    @Override
    public Agency removeById(String agencyID) {
        MongoCollection<Agency> collection = getCollection();
 
        Agency agency = collection.find(Filters.eq("id", agencyID)).first();
        if (agency != null) {
   
            collection.deleteOne(Filters.eq("id", agencyID));
        }
        return agency;
    }
    
}
