package com.eventure.event.service;

import com.eventure.event.dto.EventDTO;
import com.eventure.event.mapper.EventMapper;
import com.eventure.event.model.Event;
import com.eventure.event.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private RestTemplate restTemplate;


    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Optional<Event> getEventById(String id) {
        return eventRepository.findById(id);
    }

    // EventService.java
    public List<Event> getEventsByUserId(String userId) {
        return eventRepository.findByUserId(userId);
    }

    // Service method to fetch past events for a given userId
    public List<Event> getPastEventsByUserId(String userId) {
        return eventRepository.findPastEventsByUserId(userId);
    }

    public EventDTO createEvent(EventDTO eventDTO) {

        Event event = EventMapper.toEntity(eventDTO);


        event = eventRepository.save(event);


        return EventMapper.toDTO(event);
    }

    private void createParticipant(String userId, String eventId) {
        String participantServiceUrl = "http://localhost:8080/apiman-gateway/default/participants/1.0?apikey=dd4c8216-cfb7-4629-aad3-bb3da1a4c4ec"; // URL of ParticipantService


        Map<String, String> participantPayload = new HashMap<>();
        participantPayload.put("userId", userId);
        participantPayload.put("eventId", eventId);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<Map<String, String>> request = new HttpEntity<>(participantPayload, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(participantServiceUrl, HttpMethod.POST, request, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("Participant created successfully");
            } else {
                System.out.println("Failed to create participant");
            }
        } catch (Exception e) {
            System.out.println("Error during participant creation: " + e.getMessage());

        }
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
