package com.booking.CMBookingbackend.mapper;

import com.booking.CMBookingbackend.dto.PropertyDto;
import com.booking.CMBookingbackend.entity.Property;

public class PropertyMapper {

    public static PropertyDto mapToPropertyDto(Property property){
        return new PropertyDto(
                property.getId(),
                property.getName(),
                property.getLocation(),
                property.getDescription(),
                property.getPrice(),
                property.getAvailableSpots(),
                property.getImage(),
                property.getUser()
        );
    }

    public static Property mapToProperty(PropertyDto propertyDto){
        return new Property(
                propertyDto.getId(),
                propertyDto.getName(),
                propertyDto.getLocation(),
                propertyDto.getDescription(),
                propertyDto.getPrice(),
                propertyDto.getAvailableSpots(),
                propertyDto.getImage(),
                propertyDto.getUser()
        );
    }
}
