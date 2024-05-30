package com.booking.CMBookingbackend.mapper;

import com.booking.CMBookingbackend.dto.ImageDto;
import com.booking.CMBookingbackend.entity.Image;

public class ImageMapper {

    public static ImageDto mapToImageDto (Image image){
        return new ImageDto(
                image.getId(),
                image.getImage1(),
                image.getImage2()
        );
    }

    public static Image maptoImage (ImageDto imageDto){
        return new Image(
                imageDto.getId(),
                imageDto.getImage1(),
                imageDto.getImage2()
        );
    }
}
