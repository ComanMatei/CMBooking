package com.booking.CMBookingbackend.repository;

import com.booking.CMBookingbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
