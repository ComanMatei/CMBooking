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
import com.booking.CMBookingbackend.response.VerifyResponse;
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

        return UserMapper.mapToUserDto(savedUser);
    }
    @Override
    public UserDto assignRoleToUser(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found with id:" + roleId));

        user.setRoles(role);

        User savedUser = userRepository.save(user);
        return UserMapper.mapToUserDto(savedUser);
    }

    @Override
    public LoginResponse loginUser(LoginDto loginDto) {
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
    public UserDto getUser(String email) {
        User user = userRepository.findByEmail(email);

        UserDto userDto = UserMapper.mapToUserDto(user);

        return userDto;
    }

    @Override
    public VerifyResponse findEmail(String email) {
        Optional<User> user = Optional.ofNullable(userRepository.findByEmail(email));

        if (user.isPresent()) {
            return new VerifyResponse("Email exist", true);
        } else {
            return new VerifyResponse("Email dosen't exist", false);
        }
    }

    @Override
    public UserDto updateForgotPassword(UserDto userDto, UserDto updatedUser) {
        User user = userRepository.findByEmail(userDto.getEmail());
        if (user == null) {
            throw new RuntimeException("User with this email dosen't exist");
        }

        user.setPassword(this.passwordEncoder.encode(updatedUser.getPassword()));
        User updatedUserObj = userRepository.save(user);

        return UserMapper.mapToUserDto(updatedUserObj);
    }


    @Override
    public UserDto updateUser(String email, UserDto updatedUser) {
        User user = userRepository.findByEmail(email);

        if (updatedUser.getFirstName() != null) {
            user.setFirstName(updatedUser.getFirstName());
        }
        if (updatedUser.getLastName() != null) {
            user.setLastName(updatedUser.getLastName());
        }
        if (updatedUser.getCity() != null) {
            user.setCity(updatedUser.getCity());
        }
        if (updatedUser.getAddressStreet() != null) {
            user.setAddressStreet(updatedUser.getAddressStreet());
        }
        if (updatedUser.getAddressNumber() != 0) {
            user.setAddressNumber(updatedUser.getAddressNumber());
        }

        User updatedUserObj = userRepository.save(user);
        return UserMapper.mapToUserDto(updatedUserObj);
    }

}
