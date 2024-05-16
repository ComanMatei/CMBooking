package com.booking.CMBookingbackend.entity;

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
    private User user;
    private Property property;
    private LocalDate startDate;
    private LocalDate endDate;
    private int headcount;
}
