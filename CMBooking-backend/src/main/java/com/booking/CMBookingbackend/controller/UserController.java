package com.booking.CMBookingbackend.controller;

import com.booking.CMBookingbackend.dto.LoginDto;
import com.booking.CMBookingbackend.dto.UserDto;
import com.booking.CMBookingbackend.response.LoginResponse;
import com.booking.CMBookingbackend.response.VerifyResponse;
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

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
        UserDto savedUser = userService.createUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PostMapping("/{userId}/{roleId}")
    public ResponseEntity<UserDto> assignRoleToUser(@PathVariable Long userId,
                                                    @PathVariable Long roleId) {
        UserDto assignedUser = userService.assignRoleToUser(userId, roleId);

        return ResponseEntity.ok(assignedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
        LoginResponse loginResponse = userService.loginUser(loginDto);

        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/{email}")
    public ResponseEntity<UserDto> getUser(@PathVariable String email){
        UserDto userDto = userService.getUser(email);

        return ResponseEntity.ok(userDto);
    }
    @PostMapping("/{email}")
    public ResponseEntity<?> verifyEmail(@PathVariable String email) {
        VerifyResponse verifyEmailResponse = userService.findEmail(email);

        return ResponseEntity.ok(verifyEmailResponse);

    }

    @PutMapping("{email}")
    public ResponseEntity<UserDto> updateForgotPassword(@PathVariable("email") String email,
                                                        @RequestBody UserDto updatedUser) {
        UserDto userDto = new UserDto(email);
        UserDto updatedUserObj = userService.updateForgotPassword(userDto, updatedUser);

        return ResponseEntity.ok(updatedUserObj);
    }

    @PutMapping("/updateProfile/{email}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String email,
                                              @RequestBody UserDto updatedUser){
        UserDto userDto = userService.updateUser(email, updatedUser);

        return ResponseEntity.ok(userDto);
    }
}
