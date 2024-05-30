package com.booking.CMBookingbackend.controller;

import com.booking.CMBookingbackend.dto.ImageDto;
import com.booking.CMBookingbackend.service.ImageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLException;

import java.io.IOException;
import java.util.Base64;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("api/image")
public class ImageController {

    private ImageService imageService;

    @PostMapping()
    public ResponseEntity<String> createImage(@RequestParam("image1") MultipartFile file1,
                                              @RequestParam("image2") MultipartFile file2) throws IOException {
        if (file1.isEmpty() || file2.isEmpty()) {
            return ResponseEntity.badRequest().body("One or both image files are empty");
        }
        byte[] imageBytes1 = file1.getBytes();
        byte[] imageBytes2 = file2.getBytes();

        ImageDto imageDto = new ImageDto();
        imageDto.setImage1(imageBytes1);
        imageDto.setImage2(imageBytes2);

        imageService.createImage(imageDto);

        return ResponseEntity.status(HttpStatus.CREATED).body("Images created successfully");
    }

    @GetMapping("/{id}")
    @Transactional
    public ResponseEntity<byte[]> displayImage(@PathVariable("id") long id) throws IOException, SQLException {
        ImageDto imageDto = imageService.getImageById(id);

        if (imageDto == null) {
            return ResponseEntity.notFound().build();
        }

        byte[] imageBytes1 = Base64.getDecoder().decode(imageDto.getImage1());
        byte[] imageBytes2 = Base64.getDecoder().decode(imageDto.getImage2());

        int combinedLength = imageBytes1.length + imageBytes2.length;

        byte[] combinedImageBytes = new byte[combinedLength];

        System.arraycopy(imageBytes1, 0, combinedImageBytes, 0, imageBytes1.length);

        System.arraycopy(imageBytes2, 0, combinedImageBytes, imageBytes1.length, imageBytes2.length);

        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(combinedImageBytes);
    }



}
