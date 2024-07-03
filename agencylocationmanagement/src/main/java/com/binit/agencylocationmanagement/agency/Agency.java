package com.binit.agencylocationmanagement.agency;

import com.binit.agencylocationmanagement.events.model.AgencyLocationPinPointed;

public class Agency {

        private String agencyID;
        
        private double longitude;

        private double latitude;

        public Agency() {
        } 

        public Agency(AgencyLocationPinPointed  agencyLocationPinPointed) {
            this.agencyID=agencyLocationPinPointed.agencyID();
            this.longitude=agencyLocationPinPointed.longitude();
            this.latitude=agencyLocationPinPointed.latitude();
        }

        public Agency(String agencyID, double longitude, double latitude) {
            this.agencyID = agencyID;
            this.longitude = longitude;
            this.latitude = latitude;
        }
        public String getAgencyID() {
            return agencyID;
        }

        public void setAgencyID(String agencyID) {
            this.agencyID = agencyID;
        }

        public double getLongitude() {
            return longitude;
        }

        public void setLongitude(double longitude) {
            this.longitude = longitude;
        }

        public double getLatitude() {
            return latitude;
        }

        public void setLatitude(double latitude) {
            this.latitude = latitude;
        }

    
        @Override
        public String toString() {
            return "Agency{" +
                    "agencyID=" + agencyID +
                    ", longitude=" + longitude +
                    ", latitude=" + latitude +
                    '}';
        }
    }
