package com.eventure.task.repo;

import com.eventure.task.model.Task;
import com.eventure.task.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
class TaskRepositoryTest {

    @Autowired
    TaskRepository repository;

    @BeforeEach
    void setup() {
        repository.deleteAll();
    }

    @Test
    void savesAndFindsTasks() {
        
        Task t = new Task();
        t.setTitle("Write tests");
        t.setDescription("Add integration tests for task-service");
        t.setDeadline(Instant.now().plusSeconds(3600));
        t.setAssigneeId("user-123");
        t.setEventId("event-xyz");
        t.setStatus("In Progress");

        Task saved = repository.save(t);
        assertThat(saved.getId()).isNotBlank();

        List<Task> all = repository.findAll();
        assertThat(all).hasSize(1);
        assertThat(all.get(0).getTitle()).isEqualTo("Write tests");
    }
}
