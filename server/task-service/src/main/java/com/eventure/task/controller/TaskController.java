package com.eventure.task.controller;

import com.eventure.task.dto.TaskDTO;
import com.eventure.task.mapper.TaskMapper;
import com.eventure.task.model.Task;
import com.eventure.task.service.TaskService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {


    private static final Logger LOGGER = LogManager.getLogger(TaskController.class);

    @Autowired
    private TaskService taskService;

    @GetMapping("/event/{eventId}")
    public List<TaskDTO> getTasksByEvent(@PathVariable String eventId) {
        return taskService.getTasksByEvent(eventId).stream()
                .map(TaskMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping
    public List<TaskDTO> getAllTasks() {
        return taskService.getAllTasks().stream()
                .map(TaskMapper::toDTO)
                .collect(Collectors.toList());
    }


    @GetMapping("/assignee/{assigneeId}")
    public ResponseEntity<List<TaskDTO>> getTasksByAssigneeId(@PathVariable String assigneeId) {
        List<TaskDTO> tasks = taskService.getTasksByAssigneeId(assigneeId).stream()
                .map(TaskMapper::toDTO)
                .collect(Collectors.toList());

        System.out.println("Fetched Tasks: " + tasks);  // Add logging to inspect tasks

        return ResponseEntity.ok()
                .header("Transfer-Encoding", "identity")
                .body(tasks);
    }


    // New method to get task by ID
    @GetMapping("/{id}")
    public TaskDTO getTaskById(@PathVariable("id") String id) {
        Task task = taskService.getTaskById(id);
        return TaskMapper.toDTO(task);
    }

    @PostMapping
    public TaskDTO createTask(@RequestBody TaskDTO taskDTO) {
        Task task = TaskMapper.toEntity(taskDTO);
        return TaskMapper.toDTO(taskService.createTask(task));
    }

    @PutMapping("/{id}")
    public TaskDTO updateTask(@PathVariable String id, @RequestBody TaskDTO taskDTO) {
        Task task = TaskMapper.toEntity(taskDTO);
        return TaskMapper.toDTO(taskService.updateTask(id, task));
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
    }
}
