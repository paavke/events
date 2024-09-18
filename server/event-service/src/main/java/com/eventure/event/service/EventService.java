package com.eventure.event.service;

import com.eventure.event.dto.EventDTO;
import com.eventure.event.mapper.EventMapper;
import com.eventure.event.model.Event;
import com.eventure.event.repository.EventRepository;
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


    public List<Event> getEventsByUserId(String userId) {
        return eventRepository.findByUserId(userId);
    }


    public List<Event> getPastEventsByUserId(String userId) {
        return eventRepository.findPastEventsByUserId(userId);
    }

    public EventDTO createEvent(EventDTO eventDTO) {

        Event event = EventMapper.toEntity(eventDTO);


        event = eventRepository.save(event);


        return EventMapper.toDTO(event);
    }

    public Event updateEvent(String id, Event eventDetails) {
        return eventRepository.findById(id)
                .map(event -> {
                    event.setName(eventDetails.getName());
                    event.setDate(eventDetails.getDate());
                    event.setLocation(eventDetails.getLocation());
                    event.setDescription(eventDetails.getDescription());
                    event.setUserId(eventDetails.getUserId());

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
