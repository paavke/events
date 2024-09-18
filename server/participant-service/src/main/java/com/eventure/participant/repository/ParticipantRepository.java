package com.eventure.participant.repository;

import com.eventure.participant.model.Participant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipantRepository extends MongoRepository<Participant, String> {
    List<Participant> findByEventId(String eventId);
    List<Participant> findByUserId(String userId);
}
