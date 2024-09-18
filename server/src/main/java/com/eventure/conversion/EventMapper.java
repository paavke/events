package com.eventure.conversion;

import com.eventure.messages.EventDTO;
import com.eventure.model.Event;

public class EventMapper {

    public static EventDTO toDTO(Event event) {
        EventDTO dto = new EventDTO();
        dto.setId(event.getId());
        dto.setName(event.getName());
        dto.setDate(event.getDate());
        dto.setLocation(event.getLocation());
        dto.setDescription(event.getDescription());
        return dto;
    }

    public static Event toEntity(EventDTO dto) {
        Event event = new Event();
        event.setId(dto.getId());
        event.setName(dto.getName());
        event.setDate(dto.getDate());
        event.setLocation(dto.getLocation());
        event.setDescription(dto.getDescription());
        return event;
    }
}
