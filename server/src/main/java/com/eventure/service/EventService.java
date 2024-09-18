package com.eventure.service;

import com.eventure.model.Event;
import com.eventure.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(String id) {
        return eventRepository.findById(id);
    }

    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event updateEvent(String id, Event eventDetails) {
        return eventRepository.findById(id)
                .map(event -> {
                    event.setName(eventDetails.getName());
                    event.setDate(eventDetails.getDate());
                    event.setLocation(eventDetails.getLocation());
                    event.setDescription(eventDetails.getDescription());
                    return eventRepository.save(event);
                })
                .orElseGet(() -> {
                    eventDetails.setId(id);
                    return eventRepository.save(eventDetails);
                });
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }
}
