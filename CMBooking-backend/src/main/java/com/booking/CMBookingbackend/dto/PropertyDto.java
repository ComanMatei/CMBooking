package com.booking.CMBookingbackend.dto;

import com.booking.CMBookingbackend.entity.Image;
import com.booking.CMBookingbackend.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PropertyDto {
    private Long id;
    private String name;
    private String location;
    private String description;
    private Double price;
    private int availableSpots;
    @JsonIgnore
    private Image image;
    @JsonIgnore
    private User user;
}
