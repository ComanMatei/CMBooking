package com.booking.CMBookingbackend.service;

import com.booking.CMBookingbackend.dto.PropertyDto;
import com.booking.CMBookingbackend.dto.RentingDto;
import com.booking.CMBookingbackend.response.VerifyResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RentingService {

    RentingDto createRenting(RentingDto rentingDto);


    List<RentingDto> getAllRentings(String email);

    List<RentingDto> getRentingByPropertyId(Long propertyId);

    void deleteRenting(Long rentingId);
}
