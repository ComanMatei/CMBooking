package com.booking.CMBookingbackend.service;

import com.booking.CMBookingbackend.dto.LoginDto;
import com.booking.CMBookingbackend.dto.UserDto;
import com.booking.CMBookingbackend.response.LoginResponse;

public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto assignRoleToUser(Long userId, Long roleId);

    LoginResponse loginUser(LoginDto loginDto);

    UserDto getUserById(Long userId);

    UserDto updateUser(Long userId, UserDto userDto);
}
