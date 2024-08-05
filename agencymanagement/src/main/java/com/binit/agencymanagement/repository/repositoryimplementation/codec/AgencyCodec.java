package com.binit.agencymanagement.repository.repositoryimplementation.codec;

import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.agency.employe.Employe;
import com.binit.agencymanagement.agency.utility.TimeInterval;
import com.binit.agencymanagement.agency.utility.WorkingHours;
import com.binit.agencymanagement.agency.utility.WeeklyWorkingHours;
import com.mongodb.MongoClientSettings;
import org.bson.*;
import org.bson.codecs.CollectibleCodec;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;

import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;

public class AgencyCodec implements CollectibleCodec<Agency> {

    private final Codec<Document> documentCodec;

    public AgencyCodec() {
        this.documentCodec = MongoClientSettings.getDefaultCodecRegistry().get(Document.class);
    }

    private Document encodeTimeInterval(TimeInterval timeInterval) {
        Document doc = new Document();
        doc.put("from", timeInterval.getFrom().toString());
        doc.put("to", timeInterval.getTo().toString());
        return doc;
    }

   private TimeInterval decodeTimeInterval(Document doc) {
    Object fromObject = doc.get("from");
    Object toObject = doc.get("to");

    if (fromObject == null || toObject == null) {
        throw new IllegalArgumentException("TimeInterval fields are null");
    }

    LocalTime from;
    LocalTime to;

    if (fromObject instanceof Date) {
        from = ((Date) fromObject).toInstant().atZone(ZoneId.systemDefault()).toLocalTime();
    } else if (fromObject instanceof String) {
        from = LocalTime.parse((String) fromObject);
    } else {
        throw new IllegalArgumentException("Unsupported type for 'from' field: " + fromObject.getClass());
    }

    if (toObject instanceof Date) {
        to = ((Date) toObject).toInstant().atZone(ZoneId.systemDefault()).toLocalTime();
    } else if (toObject instanceof String) {
        to = LocalTime.parse((String) toObject);
    } else {
        throw new IllegalArgumentException("Unsupported type for 'to' field: " + toObject.getClass());
    }

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

    private Document encodeWeeklyWorkingHours(Map<String, WorkingHours> weeklyWorkingHours) {
        Document doc = new Document();
        for (Map.Entry<String, WorkingHours> entry : weeklyWorkingHours.entrySet()) {
            doc.put(entry.getKey(), encodeWorkingHours(entry.getValue()));
        }
        return doc;
    }

    private Map<String, WorkingHours> decodeWeeklyWorkingHours(Document doc) {
        Map<String, WorkingHours> weeklyWorkingHours = new HashMap<>();
        for (String key : doc.keySet()) {
            weeklyWorkingHours.put(key, decodeWorkingHours((Document) doc.get(key)));
        }
        return weeklyWorkingHours;
    }

    private Document encodeEmploye(Employe employe) {
        Document doc = new Document();
        doc.put("employeID", employe.getEmployeID());
        doc.put("fullName", employe.getFullName());
        doc.put("availability", employe.getAvailability() != null ? encodeWorkingHours(employe.getAvailability()) : null);
        doc.put("email", employe.getEmail());
        doc.put("phoneNumber", employe.getPhoneNumber());
        doc.put("job", employe.getJob());
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
        employe.setJob(doc.getString("job"));
        return employe;
    }

    @Override
    public void encode(BsonWriter writer, Agency agency, EncoderContext encoderContext) {
        Document doc = new Document();
        doc.put("address", agency.getAddress());
        doc.put("workingHours", encodeWeeklyWorkingHours(agency.getWorkingHours()));
        doc.put("zone", agency.getZone());
        doc.put("id", agency.getId());
        doc.put("manager", agency.getManager() != null ? encodeEmploye(agency.getManager()) : null);
        doc.put("commune", agency.getCommune());
        doc.put("phoneNumber",agency.getPhoneNumber());
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
        agency.setCommune(document.getString("commune"));
        agency.setPhoneNumber(document.getString("phoneNumber"));
        agency.setWorkingHours(decodeWeeklyWorkingHours((Document) document.get("workingHours")));
        if (document.get("manager") != null) {
            agency.setManager(decodeEmploye((Document) document.get("manager")));
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
