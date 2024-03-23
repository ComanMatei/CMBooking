package com.booking.CMBookingbackend.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AssignRoleRequest {
    private Long userId;
    private Long roleId;
}
