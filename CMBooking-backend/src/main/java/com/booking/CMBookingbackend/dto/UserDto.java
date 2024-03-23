package com.booking.CMBookingbackend.dto;

import com.booking.CMBookingbackend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private int age;
    private String email;
    private String city;
    private String addressStreet;
    private int addressNumber;
    private String password;
    private String CUI;
    private Collection<Role> roles;
}
