package com.booking.CMBookingbackend.controller;

import com.booking.CMBookingbackend.dto.LoginDto;
import com.booking.CMBookingbackend.dto.UserDto;
import com.booking.CMBookingbackend.entity.Role;
import com.booking.CMBookingbackend.entity.User;
import com.booking.CMBookingbackend.response.LoginResponse;
import com.booking.CMBookingbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/users")
public class UserController {

    private UserService userService;

    // Build Add User REST API
    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto) {
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
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto) {
        LoginResponse loginResponse = userService.loginUser(loginDto);

        return ResponseEntity.ok(loginResponse);
    }

        @GetMapping("/{email}")
    public ResponseEntity<UserDto> getUser(@PathVariable String email){
        UserDto userDto = userService.getUser(email);

        return ResponseEntity.ok(userDto);
    }
    @GetMapping("/verify-email/{email}")
    public ResponseEntity<String> findEmail(@PathVariable String email) {
        // Apelăm metoda din serviciu pentru a verifica dacă emailul există
        UserDto userDto = userService.findEmail(email);

        // Verificăm rezultatul și returnăm răspunsul corespunzător
        if (userDto != null) {
            return new ResponseEntity<>("Email found", HttpStatus.OK); // Emailul există
        } else {
            return new ResponseEntity<>("Email not found", HttpStatus.NOT_FOUND); // Emailul nu există
        }
    }

    @PutMapping("{email}")
    public ResponseEntity<UserDto> updateForgotPassword(@PathVariable("email") String email,
                                                        @RequestBody UserDto updatedUser) {
        UserDto userDto = new UserDto(email);
        // Apelul metodei din service pentru a actualiza parola utilizatorului
        UserDto updatedUserObj = userService.updateForgotPassword(userDto, updatedUser);

        // Returnează răspunsul cu utilizatorul actualizat
        return ResponseEntity.ok(updatedUserObj);
    }

    @PutMapping("/updateProfile/{email}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String email,
                                              @RequestBody UserDto updatedUser){
        UserDto userDto = userService.updateUser(email, updatedUser);

        return ResponseEntity.ok(userDto);
    }
}
