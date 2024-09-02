package  com.binit.agencylocationmanagement.repository;
import  com.binit.agencylocationmanagement.agency.Agency;
import java.util.List;

public interface AgencyRepository {
  
    public void add(Agency agency);

    public List<Agency> list(); 
    
    public void removeById(String id); 

    public void update(Agency agency);

    public Agency getByID(String id); 
    

}
