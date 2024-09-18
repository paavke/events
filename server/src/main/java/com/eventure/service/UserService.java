package com.eventure.service;

import com.eventure.model.User;
import com.eventure.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserProfile(String username) {
        return userRepository.findByUsername(username);
    }

    public User updateUserProfile(String username, User userDetails) {
        User user = userRepository.findByUsername(username);
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword()); // Ensure this is securely handled
        return userRepository.save(user);
    }
}
