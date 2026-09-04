package com.foodordering.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;


public class RestaurantDto {

    private Long id;

    @NotBlank(message = "Restaurant name is required")
    @Size(min = 3, max = 100, message = "Restaurant name must be between 3 and 100 characters")
    private String name;

    @NotBlank(message = "Address is required")
    private String address;

    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Phone number must contain exactly 10 digits"
    )
    private String phone;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating cannot be more than 5")
    private Double rating;

    public RestaurantDto() {
    }

    public RestaurantDto(Long id, String name, String address,
                         String phone, Double rating) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.rating = rating;
    }
    // Generate Getters and Setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

    
    
}