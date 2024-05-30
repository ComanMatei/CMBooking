package com.booking.CMBookingbackend.repository;

import com.booking.CMBookingbackend.entity.Property;
import com.booking.CMBookingbackend.entity.Renting;
import com.booking.CMBookingbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentingRepository extends JpaRepository<Renting, Long> {

    List<Renting> findAllByClient(User client);

    List<Renting> findAllByPropertyId(Long propertyId);
}
