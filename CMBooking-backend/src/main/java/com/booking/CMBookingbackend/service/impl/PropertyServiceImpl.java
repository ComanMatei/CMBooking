package com.booking.CMBookingbackend.service.impl;

import com.booking.CMBookingbackend.dto.PropertyDto;
import com.booking.CMBookingbackend.entity.Image;
import com.booking.CMBookingbackend.entity.Property;
import com.booking.CMBookingbackend.entity.User;
import com.booking.CMBookingbackend.mapper.PropertyMapper;
import com.booking.CMBookingbackend.repository.ImageRepository;
import com.booking.CMBookingbackend.repository.PropertyRepository;
import com.booking.CMBookingbackend.repository.UserRepository;
import com.booking.CMBookingbackend.response.VerifyResponse;
import com.booking.CMBookingbackend.service.PropertyService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class PropertyServiceImpl implements PropertyService {

    private PropertyRepository propertyRepository;

    private UserRepository userRepository;

    private ImageRepository imageRepository;
    @Override
    public PropertyDto createProperty(PropertyDto propertyDto) {
        Property property = PropertyMapper.mapToProperty(propertyDto);

        Property savedProperty = propertyRepository.save(property);

        return PropertyMapper.mapToPropertyDto(savedProperty);
    }
    @Override
    public PropertyDto assignOwnerAndImageToProperty(String email, Long propertyId) {
        User user = userRepository.findByEmail(email);
        Optional<Property> propertyOptional = propertyRepository.findById(propertyId);

        if (user != null && propertyOptional.isPresent()) {
            Property property = propertyOptional.get();

            Optional<Image> lastImageOptional = imageRepository.findFirstByOrderByIdDesc();

            if (lastImageOptional.isPresent()) {
                Image lastImage = lastImageOptional.get();
                property.setImage(lastImage);
                imageRepository.save(lastImage);

                property.setUser(user);
                propertyRepository.save(property);

                return PropertyMapper.mapToPropertyDto(property);
            }
        }
        return null;
    }

    @Override
    public VerifyResponse findByLocation(String location) {
        Optional<Property> property = Optional.ofNullable(propertyRepository.findByLocation(location));

        if(property.isPresent()){
            return new VerifyResponse("Location exist", true);
        } else {
            return new VerifyResponse("Location dosen't exist", false);
        }
    }

    @Override
    public Page<Property> getAllProperties(int page, int size) {
        Page<Property> propertiesPage = propertyRepository.findAll(PageRequest.of(page, size));

        return propertiesPage;
    }

    @Override
    public void deleteProperty(Long propertyId) {
        Optional<Property> property = propertyRepository.findById(propertyId);

        propertyRepository.deleteById(propertyId);
    }

}
