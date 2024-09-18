package com.eventure.service;

import com.eventure.model.Task;
import com.eventure.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getTasksByEvent(String eventId) {
        return taskRepository.findByEventId(eventId);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(String id, Task taskDetails) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setName(taskDetails.getName());
                    task.setDescription(taskDetails.getDescription());
                    task.setStatus(taskDetails.getStatus());
                    return taskRepository.save(task);
                })
                .orElseGet(() -> {
                    taskDetails.setId(id);
                    return taskRepository.save(taskDetails);
                });
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }
}
