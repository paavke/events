package com.eventure.event.repository;

import com.eventure.event.model.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event, String> {

    List<Event> findByUserId(String userId);
    @Query("{'user.id': ?0, 'date': { $lt: new Date() }}")
    List<Event> findPastEventsByUserId(String userId);
}