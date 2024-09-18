package com.eventure.event.controller;

import com.eventure.event.dto.EventDTO;
import com.eventure.event.mapper.EventMapper;
import com.eventure.event.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;


    @GetMapping("/{id}")
    public EventDTO getEventById(@PathVariable String id) {
        return eventService.getEventById(id)
                .map(EventMapper::toDTO)
                .orElse(null);
    }

    @GetMapping("/user/{userId}/past-events")
    public List<EventDTO> getPastEventsByUserId(@PathVariable String userId) {
        return eventService.getPastEventsByUserId(userId).stream()
                .map(EventMapper::toDTO)
                .collect(Collectors.toList());
    }


    @GetMapping("/all")
    public List<EventDTO> getAllEvents() {
        return eventService.getAllEvents().stream()
                .map(EventMapper::toDTO)
                .collect(Collectors.toList());
    }

    // EventController.java
    @GetMapping("/user/{userId}")
    public List<EventDTO> getEventsByUserId(@PathVariable String userId) {
        return eventService.getEventsByUserId(userId).stream()
                .map(EventMapper::toDTO)
                .collect(Collectors.toList());
    }


    @PostMapping
    public EventDTO createEvent(@RequestBody EventDTO eventDTO) {
        return eventService.createEvent(eventDTO);
    }

    @PutMapping("/{id}")
    public EventDTO updateEvent(@PathVariable String id, @RequestBody EventDTO eventDTO) {
        return EventMapper.toDTO(eventService.updateEvent(id, EventMapper.toEntity(eventDTO)));
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
    }
}