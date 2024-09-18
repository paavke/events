package com.eventure.event.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class EventDTO {

        private String id;
        private String name;

        private LocalDateTime date;
        private String location;
        private String description;
        private String userId;



    public String getUserId() {
        return userId;
    }

        public void setUserId(String userId) {
        this.userId = userId;
    }


        public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }


}
