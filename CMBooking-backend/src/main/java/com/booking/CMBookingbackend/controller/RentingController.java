package com.booking.CMBookingbackend.controller;

import com.booking.CMBookingbackend.dto.PropertyDto;
import com.booking.CMBookingbackend.dto.RentingDto;
import com.booking.CMBookingbackend.entity.Property;
import com.booking.CMBookingbackend.service.PropertyService;
import com.booking.CMBookingbackend.service.RentingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/renting")
public class RentingController {

    private RentingService rentingService;

    @PostMapping
    public ResponseEntity<RentingDto> createRenting(@RequestBody RentingDto rentingDto){
        RentingDto savedRenting = rentingService.createRenting(rentingDto);

        return new ResponseEntity<>(savedRenting, HttpStatus.CREATED);
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<RentingDto>> getAllRentings(@PathVariable ("email") String email){
        List<RentingDto> rentings = rentingService.getAllRentings(email);

        return ResponseEntity.ok(rentings);
    }

    @GetMapping("/property/{id}")
    public ResponseEntity<List<RentingDto>> getRentingByPropertyId(@PathVariable ("id") Long propertyId){
        List<RentingDto> rentings = rentingService.getRentingByPropertyId(propertyId);

        return ResponseEntity.ok(rentings);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRenting(@PathVariable("id") Long rentingId){
        rentingService.deleteRenting(rentingId);

        return ResponseEntity.ok("Renting deleted succesfully");
    }
}
