package com.foodordering.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class HomeController {
	
	@GetMapping("/")
	public String home() {
		return "Wellcome To Food Ordering Backend API...";
	}
	
	@GetMapping("/health")
	public String health() {
		return "health is fine.....";
	}
	
	@GetMapping("/nooo")
	public String option() {
		return "nncncnc";
	}

}


