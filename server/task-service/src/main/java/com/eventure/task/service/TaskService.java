package com.eventure.task.service;

import com.eventure.task.model.Task;
import com.eventure.task.repository.TaskRepository;
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

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }


    public List<Task> getTasksByAssigneeId(String assigneeId) {
        return taskRepository.findByAssigneeId(assigneeId);
    }


    public Task getTaskById(String id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(String id, Task taskDetails) {
        return taskRepository.findById(id)
                .map(task -> {
                    task.setTitle(taskDetails.getTitle());
                    task.setDescription(taskDetails.getDescription());
                    task.setStatus(taskDetails.getStatus());
                    task.setDeadline(taskDetails.getDeadline());
                    task.setEventId(taskDetails.getEventId());
                    task.setAssigneeId(taskDetails.getAssigneeId());
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
