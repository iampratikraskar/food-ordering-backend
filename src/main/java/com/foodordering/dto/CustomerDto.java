package com.foodordering.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class CustomerDto {

    private Long id;

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@NotBlank(message = "Full name is required")
    private String fullName;

	
	@NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    private String email;

    @Pattern(
            regexp = "^[0-9]{10}$",
            message = "Phone must contain exactly 10 digits")
    private String phone;

    @NotBlank(message = "Password is required")
    @JsonProperty(access = Access.WRITE_ONLY)
    private String password;

    public CustomerDto() {
    }

    public CustomerDto(Long id,
                       String fullName,
                       String email,
                       String phone,
                       String password) {

        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

    // Generate Getters and Setters
}