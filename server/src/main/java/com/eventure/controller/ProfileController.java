package com.eventure.controller;

import com.eventure.messages.UserDTO;
import com.eventure.conversion.UserMapper;
import com.eventure.model.User;
import com.eventure.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public UserDTO getUserProfile(@PathVariable String username) {
        User user = userService.getUserProfile(username);
        return UserMapper.toDTO(user);
    }

    @PutMapping("/{username}")
    public UserDTO updateUserProfile(@PathVariable String username, @RequestBody UserDTO userDTO) {
        User user = UserMapper.toEntity(userDTO);
        return UserMapper.toDTO(userService.updateUserProfile(username, user));
    }
}
