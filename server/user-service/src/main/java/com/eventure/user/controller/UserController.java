package com.eventure.user.controller;

import com.eventure.user.dto.EventDTO;
import com.eventure.user.dto.PasswordChangeDTO;
import com.eventure.user.dto.TaskDTO;
import com.eventure.user.dto.UserDTO;
import com.eventure.user.mapper.UserMapper;
import com.eventure.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable String id) {
        return userService.getUserById(id)
                .map(UserMapper::toDTO)
                .orElse(null);
    }

    @PostMapping
    public UserDTO createUser(@RequestBody UserDTO userDTO) {
        return UserMapper.toDTO(userService.createUser(UserMapper.toEntity(userDTO)));
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable String id, @RequestBody UserDTO userDTO) {
        return UserMapper.toDTO(userService.updateUser(id, UserMapper.toEntity(userDTO)));
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }


    @PutMapping("/{id}/profile")
    public ResponseEntity<UserDTO> updateUserProfile(@PathVariable String id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(UserMapper.toDTO(userService.updateUserProfile(id, UserMapper.toEntity(userDTO))));
    }


    @PutMapping("/{id}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable String id, @RequestBody PasswordChangeDTO passwordChangeDTO) {
        boolean result = userService.changePassword(id, passwordChangeDTO);
        if (result) {
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating password.");
        }
    }


    @GetMapping("/{id}/past-events")
    public List<EventDTO> getPastEventsByUserId(@PathVariable String id) {
        String eventServiceUrl = "http://event-service/api/events/user/" + id + "/past-events";

        ResponseEntity<List<EventDTO>> response = restTemplate.exchange(
                eventServiceUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<EventDTO>>() {}
        );

        return response.getBody();
    }

    @GetMapping("/{id}/past-tasks")
    public List<TaskDTO> getPastTasksByUserId(@PathVariable String id) {
        String taskServiceUrl = "http://task-service/api/tasks/user/" + id + "/past-tasks";

        ResponseEntity<List<TaskDTO>> response = restTemplate.exchange(
                taskServiceUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<TaskDTO>>() {}
        );

        return response.getBody();
    }
}
