package com.binit.agencylocationmanagement.events.model;

public record AgencyLocationPinPointed(
        String agencyID,
        double longitude,
        double latitude) {
}
