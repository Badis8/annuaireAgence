package com.binit.agencymanagement.repository.repositoryimplementation.codec;

import com.binit.agencymanagement.agency.Agency;
import com.binit.agencymanagement.agency.manager.Manager;
import com.binit.agencymanagement.agency.utility.WorkingHours;
import com.mongodb.MongoClientSettings;
import org.bson.*;
import org.bson.codecs.CollectibleCodec;
import org.bson.codecs.Codec;
import org.bson.codecs.DecoderContext;
import org.bson.codecs.EncoderContext;

import java.util.UUID;

public class AgencyCodec implements CollectibleCodec<Agency> {

    private final Codec<Document> documentCodec;

    public AgencyCodec() {
        this.documentCodec = MongoClientSettings.getDefaultCodecRegistry().get(Document.class);
    }

    @Override
    public void encode(BsonWriter writer, Agency agency, EncoderContext encoderContext) {
        Document doc = new Document();
        doc.put("name", agency.getName());
        doc.put("address", agency.getAddress());
        doc.put("workingHours", agency.getWorkingHours() != null ? agency.getWorkingHours().toString() : null);  
        doc.put("zone", agency.getZone());
        doc.put("id", agency.getId());
        doc.put("manager", agency.getmanager() != null ? agency.getmanager().toString() : null);  
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
        agency.setName(document.getString("name"));
        agency.setAddress(document.getString("address"));
        agency.setZone(document.getString("zone"));

 
        if (document.getString("workingHours") != null) {
            agency.setWorkingHours(WorkingHours.fromString(document.getString("workingHours")));
        }

        if (document.getString("manager") != null) {
            agency.setmanager(Manager.fromString(document.getString("manager")));
        }

        return agency;
    }
}
  