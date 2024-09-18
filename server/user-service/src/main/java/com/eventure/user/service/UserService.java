package com.eventure.user.service;

import com.eventure.user.dto.PasswordChangeDTO;
import com.eventure.user.model.User;
import com.eventure.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }


    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(String id, User userDetails) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(userDetails.getName());
                    user.setEmail(userDetails.getEmail());
                    user.setPassword(userDetails.getPassword());
                    user.setRole(userDetails.getRole());
                    return userRepository.save(user);
                })
                .orElseGet(() -> {
                    userDetails.setId(id);
                    return userRepository.save(userDetails);
                });
    }


    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }


    public User updateUserProfile(String id, User updatedUserData) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setName(updatedUserData.getName());
        user.setEmail(updatedUserData.getEmail());
        user.setRole(updatedUserData.getRole());  // Manage role
        return userRepository.save(user);
    }


    public boolean changePassword(String id, PasswordChangeDTO passwordChangeDTO) {
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        String hashedPassword = passwordEncoder.encode(passwordChangeDTO.getNewPassword());
        user.setPassword(hashedPassword);
        userRepository.save(user);
        return true;
    }
}
