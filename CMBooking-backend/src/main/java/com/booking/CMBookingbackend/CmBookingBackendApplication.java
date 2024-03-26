package com.booking.CMBookingbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class CmBookingBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CmBookingBackendApplication.class, args);
	}

}
