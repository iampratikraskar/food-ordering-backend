package com.foodordering.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.foodordering.dto.CustomerDto;
import com.foodordering.service.CustomerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // PUBLIC - Customer registration
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerDto register(
            @Valid @RequestBody CustomerDto dto) {

        return customerService.register(dto);
    }

    // ADMIN ONLY
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<CustomerDto> getAllCustomers() {

        return customerService.getAllCustomers();
    }

    // ADMIN ONLY
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public CustomerDto getCustomer(
            @PathVariable Long id) {

        return customerService.getCustomerById(id);
    }

    // ADMIN ONLY
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteCustomer(
            @PathVariable Long id) {

        customerService.deleteCustomer(id);

        return "Customer deleted successfully";
    }
}