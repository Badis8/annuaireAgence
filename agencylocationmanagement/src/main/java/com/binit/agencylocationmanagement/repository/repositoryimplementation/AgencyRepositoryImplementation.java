package  com.binit.agencylocationmanagement.repository.repositoryimplementation;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;

import java.util.ArrayList;
import java.util.List;

 
import  com.binit.agencylocationmanagement.agency.Agency;
import com.binit.agencylocationmanagement.repository.AgencyRepository;

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
    public void removeById(String id) {
        getCollection().deleteOne(Filters.eq("agencyID", id));
    }
    @Override
    public void update(Agency agency) {
        MongoCollection<Agency> collection = getCollection();
    
 
        collection.replaceOne(
            Filters.eq("agencyID", agency.getAgencyID()),  
            agency 
        );
  
    }
    @Override
    public Agency getByID(String id) {
       
        MongoCollection<Agency> collection = getCollection();
        
      
        return collection.find(Filters.eq("agencyID", id)).first();
    }
    }
 

