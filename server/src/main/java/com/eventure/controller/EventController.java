package com.eventure.controller;

import com.eventure.messages.EventDTO;
import com.eventure.conversion.EventMapper;
import com.eventure.model.Event;
import com.eventure.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public List<EventDTO> getAllEvents() {
        return eventService.getAllEvents().stream()
                .map(EventMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public EventDTO getEventById(@PathVariable String id) {
        return eventService.getEventById(id)
                .map(EventMapper::toDTO)
                .orElse(null);
    }

    @PostMapping
    public EventDTO createEvent(@RequestBody EventDTO eventDTO) {
        Event event = EventMapper.toEntity(eventDTO);
        return EventMapper.toDTO(eventService.createEvent(event));
    }

    @PutMapping("/{id}")
    public EventDTO updateEvent(@PathVariable String id, @RequestBody EventDTO eventDTO) {
        Event event = EventMapper.toEntity(eventDTO);
        return EventMapper.toDTO(eventService.updateEvent(id, event));
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
    }
}
