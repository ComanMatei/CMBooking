package com.booking.CMBookingbackend.repository;

import com.booking.CMBookingbackend.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findFirstByOrderByIdDesc();
}
