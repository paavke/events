package com.eventure.event.mapper;

import com.eventure.event.dto.EventDTO;
import com.eventure.event.model.Event;

public class EventMapper {

    public static EventDTO toDTO(Event event) {
        EventDTO dto = new EventDTO();
        dto.setId(event.getId());
        dto.setName(event.getName());
        dto.setDate(event.getDate());
        dto.setLocation(event.getLocation());
        dto.setDescription(event.getDescription());
        dto.setUserId(event.getUserId());
        return dto;
    }

    public static Event toEntity(EventDTO dto) {
        Event event = new Event();
        event.setId(dto.getId());
        event.setName(dto.getName());
        event.setDate(dto.getDate());
        event.setLocation(dto.getLocation());
        event.setDescription(dto.getDescription());
        event.setUserId(dto.getUserId());
        return event;
    }
}
