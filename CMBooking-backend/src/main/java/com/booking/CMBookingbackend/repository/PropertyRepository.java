package com.booking.CMBookingbackend.repository;

import com.booking.CMBookingbackend.dto.PropertyDto;
import com.booking.CMBookingbackend.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    Property findByLocation(String location);

}
