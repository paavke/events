package com.eventure.task.mapper;

import com.eventure.task.dto.TaskDTO;
import com.eventure.task.model.Task;

public class TaskMapper {

    public static TaskDTO toDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setDeadline(task.getDeadline());
        dto.setEventId(task.getEventId());
        dto.setAssigneeId(task.getAssigneeId());
        return dto;
    }

    public static Task toEntity(TaskDTO dto) {
        Task task = new Task();
        task.setId(dto.getId());
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());
        task.setDeadline(dto.getDeadline());
        task.setEventId(dto.getEventId());
        task.setAssigneeId(dto.getAssigneeId());
        return task;
    }
}
