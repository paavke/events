package com.eventure.controller;

import com.eventure.messages.TaskDTO;
import com.eventure.conversion.TaskMapper;
import com.eventure.model.Task;
import com.eventure.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/event/{eventId}")
    public List<TaskDTO> getTasksByEvent(@PathVariable String eventId) {
        return taskService.getTasksByEvent(eventId).stream()
                .map(TaskMapper::toDTO)
                .collect(Collectors.toList());
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
