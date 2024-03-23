package com.booking.CMBookingbackend.service;

import com.booking.CMBookingbackend.dto.RoleDto;
import com.booking.CMBookingbackend.dto.UserDto;

public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto assignRoleToUser(Long userId, Long roleId);

    UserDto getUserById(Long userId);

    UserDto updateUser(Long userId, UserDto userDto);
}
