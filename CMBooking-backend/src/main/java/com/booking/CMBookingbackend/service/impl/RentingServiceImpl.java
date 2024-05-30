package com.booking.CMBookingbackend.service.impl;

import com.booking.CMBookingbackend.dto.RentingDto;
import com.booking.CMBookingbackend.entity.Property;
import com.booking.CMBookingbackend.entity.Renting;
import com.booking.CMBookingbackend.entity.User;
import com.booking.CMBookingbackend.mapper.RentingMapper;
import com.booking.CMBookingbackend.repository.PropertyRepository;
import com.booking.CMBookingbackend.repository.RentingRepository;
import com.booking.CMBookingbackend.repository.UserRepository;
import com.booking.CMBookingbackend.response.VerifyResponse;
import com.booking.CMBookingbackend.service.PropertyService;
import com.booking.CMBookingbackend.service.RentingService;
import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
public class RentingServiceImpl implements RentingService {

    @Autowired
    private RentingRepository rentingRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public RentingDto createRenting(RentingDto rentingDto) {
        Renting renting = RentingMapper.mapToRenting(rentingDto);

        Long propertyId = rentingDto.getProperty().getId();
        Property property = propertyRepository.findById(propertyId).orElse(null);
        renting.setProperty(property);

        Long userId = rentingDto.getClient().getId();
        User user = userRepository.findById(userId).orElse(null);
        renting.setClient(user);

        List<Renting> rentings = rentingRepository.findAllByPropertyId(propertyId);
        for (Renting currentRenting : rentings) {
            if (renting.getStartDate().compareTo(currentRenting.getEndDate()) < 0 &&
                    renting.getEndDate().compareTo(currentRenting.getStartDate()) > 0) {
                return null;
            }
        }

        Renting savedRenting = rentingRepository.save(renting);
        return RentingMapper.mapToRentingDto(savedRenting);
    }

    @Override
    @Transactional
    public List<RentingDto> getAllRentings(String email) {
        User client = userRepository.findByEmail(email);

        if (client == null) {
            return Collections.emptyList();
        }

        List<Renting> rentings = rentingRepository.findAllByClient(client);

        return rentings.stream().map((renting -> RentingMapper.mapToRentingDto(renting)))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<RentingDto> getRentingByPropertyId(Long propertyId) {
        List<Renting> rentings = rentingRepository.findAllByPropertyId(propertyId);

        return rentings.stream()
                .map(RentingMapper::mapToRentingDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteRenting(Long rentingId) {
        Optional<Renting> rentingOptional = rentingRepository.findById(rentingId);

        if (rentingOptional.isPresent()) {
            Renting renting = rentingOptional.get();

            // Adăugați un log înainte de ștergere
            System.out.println("Șterg închirierea cu id: " + rentingId);

            rentingRepository.delete(renting);

            // Adăugați un log după ștergere
            System.out.println("Închirierea cu id: " + rentingId + " a fost ștearsă");
        } else {
            System.out.println("Închirierea cu id: " + rentingId + " nu a fost găsită");
        }
    }



}
