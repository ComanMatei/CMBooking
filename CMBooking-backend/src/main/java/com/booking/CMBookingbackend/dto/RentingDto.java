package com.booking.CMBookingbackend.dto;

import com.booking.CMBookingbackend.entity.Property;
import com.booking.CMBookingbackend.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RentingDto {
    private Long id;
    private User client;
    private Property property;
    private LocalDate startDate;
    private LocalDate endDate;
    private int headcount;
}
