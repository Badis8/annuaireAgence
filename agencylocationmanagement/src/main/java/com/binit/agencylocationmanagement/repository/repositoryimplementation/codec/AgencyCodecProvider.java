package com.binit.agencylocationmanagement.repository.repositoryimplementation.codec;
 
import org.bson.codecs.Codec;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;

import com.binit.agencylocationmanagement.agency.Agency;

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
