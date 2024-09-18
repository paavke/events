package com.eventure.participant.service;

import com.eventure.participant.model.Participant;
import com.eventure.participant.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    public List<Participant> getAllParticipants() {
        return participantRepository.findAll();
    }

    public Optional<Participant> getParticipantById(String id) {
        return participantRepository.findById(id);
    }

    public List<Participant> getParticipantsByEventId(String eventId) {
        return participantRepository.findByEventId(eventId);
    }

    public Participant createParticipant(Participant participant) {
        return participantRepository.save(participant);
    }

    public Participant updateParticipant(String id, Participant participantDetails) {
        return participantRepository.findById(id)
                .map(participant -> {
                    participant.setUserId(participantDetails.getUserId());
                    participant.setEventId(participantDetails.getEventId());
                    participant.setRole(participantDetails.getRole());
                    return participantRepository.save(participant);
                })
                .orElseGet(() -> {
                    participantDetails.setId(id);
                    return participantRepository.save(participantDetails);
                });
    }

    public void deleteParticipant(String id) {
        participantRepository.deleteById(id);
    }
}
