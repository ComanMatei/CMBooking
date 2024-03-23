package com.booking.CMBookingbackend.mapper;

import com.booking.CMBookingbackend.dto.RoleDto;
import com.booking.CMBookingbackend.entity.Role;

public class RoleMapper {

    public static RoleDto mapToRolerDto(Role role){
        return new RoleDto(
                role.getId(),
                role.getName()
        );
    }

    public static Role mapToRole(RoleDto roleDto){
        return new Role(
                roleDto.getId(),
                roleDto.getName()
        );
    }
}
