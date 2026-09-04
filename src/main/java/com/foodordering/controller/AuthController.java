package com.foodordering.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.foodordering.dto.LoginRequest;
import com.foodordering.dto.LoginResponse;
import com.foodordering.exception.InvalidCredentialsException;
import com.foodordering.security.CustomUserDetailsService;
import com.foodordering.security.JwtService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Validated
public class AuthController {

	private final AuthenticationManager authenticationManager;
	private final CustomUserDetailsService userDetailsService;
	private final JwtService jwtService;

	public AuthController(AuthenticationManager authenticationManager, CustomUserDetailsService userDetailsService,
			JwtService jwtService) {

		this.authenticationManager = authenticationManager;
		this.userDetailsService = userDetailsService;
		this.jwtService = jwtService;
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {

		try {

			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

		} catch (Exception ex) {

			throw new InvalidCredentialsException("Invalid email or password");
		}

		UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

		String token = jwtService.generateToken(userDetails);

		return ResponseEntity.status(HttpStatus.OK).body(new LoginResponse(token));
	}
}