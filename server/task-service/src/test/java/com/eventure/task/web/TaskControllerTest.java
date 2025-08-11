package com.eventure.task.web;

import com.eventure.task.model.Task;
import com.eventure.task.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class TaskControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    TaskRepository repository;

    @BeforeEach
    void setup() {
        repository.deleteAll();

        Task t1 = new Task();
        t1.setTitle("Alpha");
        t1.setDescription("First task");
        t1.setDeadline(Instant.now().plusSeconds(3600));
        t1.setAssigneeId("user-1");
        t1.setEventId("event-1");
        t1.setStatus("Pending");

        Task t2 = new Task();
        t2.setTitle("Bravo");
        t2.setDescription("Second task");
        t2.setDeadline(Instant.now().plusSeconds(7200));
        t2.setAssigneeId("user-2");
        t2.setEventId("event-2");
        t2.setStatus("Completed");

        repository.save(t1);
        repository.save(t2);
    }

    @Test
    void listTasks_returns200AndArray() throws Exception {

        mvc.perform(get("/tasks").accept(MediaType.APPLICATION_JSON))
           .andExpect(status().isOk())
           .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
           .andExpect(jsonPath("$", isA(java.util.List.class)))
           .andExpect(jsonPath("$.length()", greaterThanOrEqualTo(2)))
           .andExpect(jsonPath("$[0].title", not(emptyOrNullString())));

    }

    @Test
    void getTaskById_returns200AndObject() throws Exception {
        String id = repository.findAll().get(0).getId();

        mvc.perform(get("/tasks/{id}", id).accept(MediaType.APPLICATION_JSON))
           .andExpect(status().isOk())
           .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
           .andExpect(jsonPath("$.id", is(id)))
           .andExpect(jsonPath("$.title", not(emptyOrNullString())));

    }

    @Test
    void createTask_returns201AndPersists() throws Exception {
        String body = """
            {
              "title": "Created via IT",
              "description": "Created from MockMvc",
              "deadline": "%s",
              "assigneeId": "user-9",
              "eventId": "event-9",
              "status": "In Progress"
            }
            """.formatted(Instant.now().plusSeconds(10_000).toString());

        mvc.perform(post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
           .andExpect(status().isCreated())
           .andExpect(header().exists("Location"));

        assert repository.findAll().size() >= 3;

    }
}
