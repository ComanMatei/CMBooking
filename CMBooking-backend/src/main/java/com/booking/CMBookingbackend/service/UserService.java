package com.booking.CMBookingbackend.service;

import com.booking.CMBookingbackend.dto.LoginDto;
import com.booking.CMBookingbackend.dto.UserDto;
import com.booking.CMBookingbackend.entity.Role;
import com.booking.CMBookingbackend.response.LoginResponse;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto assignRoleToUser(Long userId, Long roleId);

    LoginResponse loginUser(LoginDto loginDto);

    UserDto getUser(String email);

    UserDto findEmail(String email);

    UserDto updateForgotPassword(UserDto userDto, UserDto updatedUser);

    UserDto updateUser(String email, UserDto userDto);
}
