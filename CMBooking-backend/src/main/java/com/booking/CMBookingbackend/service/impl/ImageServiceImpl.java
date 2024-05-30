package com.booking.CMBookingbackend.service.impl;

import com.booking.CMBookingbackend.dto.ImageDto;
import com.booking.CMBookingbackend.entity.Image;
import com.booking.CMBookingbackend.mapper.ImageMapper;
import com.booking.CMBookingbackend.repository.ImageRepository;
import com.booking.CMBookingbackend.service.ImageService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ImageServiceImpl implements ImageService {

    private ImageRepository imageRepository;

    @Override
    public ImageDto createImage(ImageDto imageDto) {
        Image image = ImageMapper.maptoImage(imageDto);

        Image savedImage = imageRepository.save(image);

        return ImageMapper.mapToImageDto(savedImage);
    }

    @Override
    public ImageDto getImageById(Long id) {
        Image image = imageRepository.findById(id).get();

        ImageDto imageDto = ImageMapper.mapToImageDto(image);

        return imageDto;
    }
}
