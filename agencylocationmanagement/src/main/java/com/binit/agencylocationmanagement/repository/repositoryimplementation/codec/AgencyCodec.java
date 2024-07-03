package com.binit.agencylocationmanagement.repository.repositoryimplementation.codec;

 
 
import com.binit.agencylocationmanagement.agency.Agency;
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
    public void encode(BsonWriter writer,Agency agency, EncoderContext encoderContext) {
        
        Document doc = new Document();
        doc.put("agencyID", agency.getAgencyID());
        doc.put("longitude", agency.getLongitude());  
        doc.put("latitude", agency.getLatitude());
  
        documentCodec.encode(writer, doc, encoderContext);
    }

    @Override
    public Class<Agency> getEncoderClass() {
        return Agency.class;
    }

    @Override
    public Agency generateIdIfAbsentFromDocument(Agency document) {
        if (!documentHasId(document)) {
            document.setAgencyID(UUID.randomUUID().toString());
        }
        return document;
    }

    @Override
    public boolean documentHasId(Agency document) {
        return document.getAgencyID() != null;
    }

    @Override
    public BsonValue getDocumentId(Agency document) {
        return new BsonString(document.getAgencyID());
    }

    @Override
    public Agency decode(BsonReader reader, DecoderContext decoderContext) {

        Document document = documentCodec.decode(reader, decoderContext);
        Agency agency = new Agency();
        agency.setAgencyID(document.getString("agencyID"));
        agency.setLatitude(document.getDouble("latitude"));
        agency.setLongitude(document.getDouble("longitude"));
        
        return agency;
    }
}
  