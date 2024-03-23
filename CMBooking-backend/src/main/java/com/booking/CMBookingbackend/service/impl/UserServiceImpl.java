package com.booking.CMBookingbackend.service.impl;

import com.booking.CMBookingbackend.dto.RoleDto;
import com.booking.CMBookingbackend.dto.UserDto;
import com.booking.CMBookingbackend.entity.Role;
import com.booking.CMBookingbackend.entity.User;
import com.booking.CMBookingbackend.exception.ResourceNotFoundException;
import com.booking.CMBookingbackend.mapper.UserMapper;
import com.booking.CMBookingbackend.repository.RoleRepository;
import com.booking.CMBookingbackend.repository.UserRepository;
import com.booking.CMBookingbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private RoleRepository roleRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto);
        User savedUser = userRepository.save(user);

        System.out.println("Afisare user");
        System.out.println("Id: " + savedUser.getId());
        System.out.println("Id: " + savedUser.getFirstName());
        System.out.println("Id: " + savedUser.getLastName());
        System.out.println("Id: " + savedUser.getEmail());

        return UserMapper.mapToUserDto(savedUser);
    }
    @Override
    public UserDto assignRoleToUser(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        Role role = roleRepository.findById(roleId) // Folosiți roleId aici, nu userId
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id:" + roleId));

        user.addRole(role);

        System.out.println("Id userlui este: " + userId);
        System.out.println("id rolului este: " + roleId);
        // Salvați utilizatorul actualizat în baza de date
        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }



    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        return UserMapper.mapToUserDto(user);
    }

    @Override
    public UserDto updateUser(Long userId, UserDto updatedUser) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        user.setEmail(updatedUser.getEmail());
        user.setAge(updatedUser.getAge());

        User updatedUserObj = userRepository.save(user);
        return UserMapper.mapToUserDto(updatedUserObj);
    }
}
