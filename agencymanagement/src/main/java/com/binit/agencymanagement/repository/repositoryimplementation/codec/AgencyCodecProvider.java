package com.binit.agencymanagement.repository.repositoryimplementation.codec;
import com.binit.agencymanagement.agency.Agency;
import org.bson.codecs.Codec;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;

public class AgencyCodecProvider implements CodecProvider {
    @SuppressWarnings("unchecked")
    @Override
    public <T> Codec<T> get(Class<T> clazz, CodecRegistry registry) {
        if (clazz.equals(Agency.class)) {
            return (Codec<T>) new AgencyCodec();
        }
        return null;
    }

}
