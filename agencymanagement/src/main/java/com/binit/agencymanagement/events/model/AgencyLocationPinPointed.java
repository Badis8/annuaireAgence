package com.binit.agencymanagement.events.model;

public record AgencyLocationPinPointed(
        String agencyID,
        double longitude,
        double latitude) {
}
