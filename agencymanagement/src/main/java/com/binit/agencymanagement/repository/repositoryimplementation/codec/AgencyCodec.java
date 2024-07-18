package com.binit.agencymanagement.repository.repositoryimplementation.codec;

import com.aayushatharva.brotli4j.common.annotations.Local;
import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.agency.employe.Employe;
import com.binit.agencymanagement.agency.utility.TimeInterval;
import com.binit.agencymanagement.agency.utility.WorkingHours;
import com.mongodb.MongoClientSettings;
import org.bson.*;
import org.bson.codecs.CollectibleCodec;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;

import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public class AgencyCodec implements CollectibleCodec<Agency> {

    private final Codec<Document> documentCodec;

    public AgencyCodec() {
        this.documentCodec = MongoClientSettings.getDefaultCodecRegistry().get(Document.class);
    }
       private Document encodeTimeInterval(TimeInterval timeInterval) {
        Document doc = new Document();
        doc.put("from", timeInterval.getFrom());
        doc.put("to", timeInterval.getTo());
        return doc;
    }

  private TimeInterval decodeTimeInterval(Document doc) {
    Date fromDate = doc.getDate("from");
    Date toDate = doc.getDate("to");

    if (fromDate == null || toDate == null) {
        throw new IllegalArgumentException("Date fields are null");
    }

    LocalTime from = fromDate.toInstant().atZone(ZoneId.systemDefault()).toLocalTime();
    LocalTime to = toDate.toInstant().atZone(ZoneId.systemDefault()).toLocalTime();

    return new TimeInterval(from, to);
}

    private Document encodeWorkingHours(WorkingHours workingHours) {
        Document doc = new Document();
        if (workingHours.getMorningSession() != null) {
            doc.put("morningSession", encodeTimeInterval(workingHours.getMorningSession()));
        }
        if (workingHours.getEveningSession() != null) {
            doc.put("eveningSession", encodeTimeInterval(workingHours.getEveningSession()));
        }
        return doc;
    }

    private WorkingHours decodeWorkingHours(Document doc) {
        WorkingHours workingHours = new WorkingHours();
        if (doc.get("morningSession") != null) {
            workingHours.setMorningSession(decodeTimeInterval((Document) doc.get("morningSession")));
        }
        if (doc.get("eveningSession") != null) {
            workingHours.setEveningSession(decodeTimeInterval((Document) doc.get("eveningSession")));
        }
        return workingHours;
    }




    private Document encodeEmploye(Employe employe) {
        Document doc = new Document();
        doc.put("employeID", employe.getEmployeID());
        doc.put("fullName", employe.getFullName());
        doc.put("availability", employe.getAvailability() != null ? encodeWorkingHours(employe.getAvailability()) : null);
        doc.put("email", employe.getEmail());
        doc.put("phoneNumber", employe.getPhoneNumber());
        return doc;
    }

    private Employe decodeEmploye(Document doc) {
        Employe employe = new Employe();
        employe.setEmployeID(doc.getString("employeID"));
        employe.setFullName(doc.getString("fullName"));
        if (doc.get("availability") != null && doc.get("availability") instanceof Document) {
            employe.setAvailability(this.decodeWorkingHours((Document) doc.get("availability")));
        }
        employe.setEmail(doc.getString("email"));
        employe.setPhoneNumber(doc.getString("phoneNumber"));
        return employe;
    }
    @Override
    public void encode(BsonWriter writer, Agency agency, EncoderContext encoderContext) {
        Document doc = new Document();
        doc.put("address", agency.getAddress());
        doc.put("workingHours", this.encodeWorkingHours(agency.getWorkingHours()));
        doc.put("zone", agency.getZone());
        doc.put("id", agency.getId());
        doc.put("manager", agency.getmanager() != null ? encodeEmploye(agency.getmanager()) : null);

        if (agency.getEmployees() != null && !agency.getEmployees().isEmpty()) {
            List<Document> employeesDoc = new ArrayList<>();
            for (Employe employee : agency.getEmployees()) {
                employeesDoc.add(encodeEmploye(employee));
            }
            doc.put("employees", employeesDoc);
        }

        documentCodec.encode(writer, doc, encoderContext);
    }

    @Override
    public Class<Agency> getEncoderClass() {
        return Agency.class;
    }

    @Override
    public Agency generateIdIfAbsentFromDocument(Agency document) {
        if (!documentHasId(document)) {
            document.setId(UUID.randomUUID().toString());
        }
        return document;
    }

    @Override
    public boolean documentHasId(Agency document) {
        return document.getId() != null;
    }

    @Override
    public BsonValue getDocumentId(Agency document) {
        return new BsonString(document.getId());
    }

    @Override
    public Agency decode(BsonReader reader, DecoderContext decoderContext) {
        Document document = documentCodec.decode(reader, decoderContext);
        Agency agency = new Agency();
        agency.setId(document.getString("id"));
        agency.setAddress(document.getString("address"));
        agency.setZone(document.getString("zone"));
        agency.setWorkingHours(this.decodeWorkingHours((Document) document.get("workingHours")));
        if (document.get("manager") != null) {
            agency.setmanager(decodeEmploye((Document) document.get("manager")));
        }

        List<Employe> employees = new ArrayList<>();
        if (document.get("employees") instanceof List) {
            List<Document> employeeDocs = (List<Document>) document.get("employees");
            for (Document empDoc : employeeDocs) {
                employees.add(decodeEmploye(empDoc));
            }
        }
        agency.setEmployees(employees);

        return agency;
    }
      
}
  