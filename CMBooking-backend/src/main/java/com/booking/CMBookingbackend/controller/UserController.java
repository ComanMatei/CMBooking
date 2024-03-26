package com.booking.CMBookingbackend.controller;

import com.booking.CMBookingbackend.dto.LoginDto;
import com.booking.CMBookingbackend.dto.UserDto;
import com.booking.CMBookingbackend.response.LoginResponse;
import com.booking.CMBookingbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/users")
public class UserController {

    private UserService userService;

    // Build Add User REST API
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        UserDto savedUser = userService.createUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/{userId}/{roleId}")
    public ResponseEntity<UserDto> assignRoleToUser(@PathVariable Long userId,
                                                    @PathVariable Long roleId) {
        // Implementați logica pentru atribuirea rolului utilizatorului cu id-ul 'userId' la rolul cu id-ul 'roleId'
        UserDto assignedUser = userService.assignRoleToUser(userId, roleId);

        // Returnați răspunsul HTTP cu obiectul UserDto asignat și codul de stare '200 OK'
        return ResponseEntity.ok(assignedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto){
        LoginResponse loginResponse = userService.loginUser(loginDto);

        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        UserDto userDto = userService.getUserById(userId);

        return ResponseEntity.ok(userDto);

    }

    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long userId,
                                              @RequestBody UserDto updateUser){
        UserDto userDto = userService.updateUser(userId, updateUser);
        return ResponseEntity.ok(userDto);
    }
}
