package com.booking.CMBookingbackend.service;

import com.booking.CMBookingbackend.dto.ImageDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface ImageService {

    ImageDto createImage(ImageDto imageDto);

    ImageDto getImageById(Long id);
}
