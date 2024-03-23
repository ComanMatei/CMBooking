package com.booking.CMBookingbackend.mapper;

import com.booking.CMBookingbackend.dto.UserDto;
import com.booking.CMBookingbackend.entity.User;

public class UserMapper {

    public static UserDto mapToUserDto(User user){
        return new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getAge(),
                user.getEmail(),
                user.getCity(),
                user.getAddressStreet(),
                user.getAddressNumber(),
                user.getPassword(),
                user.getCUI(),
                user.getRoles()
        );
    }

    public static User mapToUser(UserDto userDto){
        return new User(
                userDto.getId(),
                userDto.getFirstName(),
                userDto.getLastName(),
                userDto.getAge(),
                userDto.getEmail(),
                userDto.getCity(),
                userDto.getAddressStreet(),
                userDto.getAddressNumber(),
                userDto.getPassword(),
                userDto.getCUI(),
                userDto.getRoles()
        );
    }
}
