package com.booking.CMBookingbackend.service.impl;

import com.booking.CMBookingbackend.dto.LoginDto;
import com.booking.CMBookingbackend.dto.UserDto;
import com.booking.CMBookingbackend.entity.Role;
import com.booking.CMBookingbackend.entity.User;
import com.booking.CMBookingbackend.exception.ResourceNotFoundException;
import com.booking.CMBookingbackend.mapper.UserMapper;
import com.booking.CMBookingbackend.repository.RoleRepository;
import com.booking.CMBookingbackend.repository.UserRepository;
import com.booking.CMBookingbackend.response.LoginResponse;
import com.booking.CMBookingbackend.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = UserMapper.mapToUser(userDto);
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        System.out.println("Afisare user");
        System.out.println("Id: " + savedUser.getId());
        System.out.println("Id: " + savedUser.getFirstName());
        System.out.println("Id: " + savedUser.getLastName());
        System.out.println("Id: " + savedUser.getEmail());
        System.out.println("Parola este: " + this.passwordEncoder.encode(savedUser.getPassword()));

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
    public LoginResponse loginUser(LoginDto loginDto) {
        String msg = "";
        User user1 = userRepository.findByEmail(loginDto.getEmail());

        if(user1 != null){
            String password = loginDto.getPassword();
            String encodedPassword = user1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if(isPwdRight){
                Optional<User> user = userRepository.findOneByEmailAndPassword(loginDto.getEmail(), encodedPassword);
                if(user.isPresent())
                    return new LoginResponse("Login Success", true);
                else
                    return new LoginResponse("Login Failed", false);
            }
            else
                return new LoginResponse("password not match", false);
        }
        else
            return new LoginResponse("Email not found", false);
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
