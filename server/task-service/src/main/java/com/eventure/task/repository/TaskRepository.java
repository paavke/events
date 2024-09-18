package com.eventure.task.repository;

import com.eventure.task.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByEventId(String eventId);
    List<Task> findByAssigneeId(String assigneeId);
}

