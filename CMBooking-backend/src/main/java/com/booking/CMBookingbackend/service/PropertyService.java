package com.booking.CMBookingbackend.service;

import com.booking.CMBookingbackend.dto.PropertyDto;
import com.booking.CMBookingbackend.entity.Property;
import com.booking.CMBookingbackend.response.VerifyResponse;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface PropertyService {

    PropertyDto createProperty(PropertyDto propertyDto);

    PropertyDto assignOwnerAndImageToProperty(String email, Long propertyId);

    VerifyResponse findByLocation(String location);

    Page<Property> getAllProperties(int page, int size);

    void deleteProperty(Long propertyId);
}
