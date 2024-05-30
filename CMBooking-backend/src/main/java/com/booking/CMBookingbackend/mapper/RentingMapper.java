package com.booking.CMBookingbackend.mapper;

import com.booking.CMBookingbackend.dto.RentingDto;
import com.booking.CMBookingbackend.entity.Renting;

public class RentingMapper {

    public static RentingDto mapToRentingDto(Renting renting){
        return new RentingDto(
                renting.getId(),
                renting.getClient(),
                renting.getProperty(),
                renting.getStartDate(),
                renting.getEndDate(),
                renting.getHeadcount()
        );
    }

    public static Renting mapToRenting(RentingDto rentingDto){
        return new Renting(
                rentingDto.getId(),
                rentingDto.getClient(),
                rentingDto.getProperty(),
                rentingDto.getStartDate(),
                rentingDto.getEndDate(),
                rentingDto.getHeadcount()
        );
    }
}
