package com.booking.CMBookingbackend.controller;

import com.booking.CMBookingbackend.dto.PropertyDto;
import com.booking.CMBookingbackend.entity.Property;
import com.booking.CMBookingbackend.response.VerifyResponse;
import com.booking.CMBookingbackend.service.PropertyService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/property")
public class PropertyController {

    private PropertyService propertyService;

    @PostMapping()
    public ResponseEntity<PropertyDto> createProperty (@RequestBody PropertyDto propertyDto){
        PropertyDto savedProperty = propertyService.createProperty(propertyDto);
        return new ResponseEntity<>(savedProperty, HttpStatus.CREATED);
    }

    @Transactional
    @PostMapping("/{email}/{propertyId}")
    public ResponseEntity<PropertyDto> assignOwnerAndImageToProperty(@PathVariable String email,
                                                             @PathVariable Long propertyId){
        PropertyDto assignProperty = propertyService.assignOwnerAndImageToProperty(email, propertyId);

        return ResponseEntity.ok(assignProperty);
    }

    @Transactional
    @PostMapping("/{location}")
    public ResponseEntity<?> findByLocation(@PathVariable("location") String location){
        VerifyResponse verifyResponse = propertyService.findByLocation(location);

        return ResponseEntity.ok(verifyResponse);
    }

    @GetMapping
    public ResponseEntity <Page<Property>> getAllProperties(@RequestParam(value = "page", defaultValue = "0") int page,
                                                            @RequestParam(value = "size", defaultValue = "4") int size){
        return ResponseEntity.ok().body(propertyService.getAllProperties(page,size));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProperty(@PathVariable("id") Long propertyId){
        propertyService.deleteProperty(propertyId);

        return ResponseEntity.ok("Property deleted succesfully");
    }

}
