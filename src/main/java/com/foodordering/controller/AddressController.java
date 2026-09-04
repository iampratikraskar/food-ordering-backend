package com.foodordering.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.foodordering.dto.AddressDto;
import com.foodordering.dto.AddressRequest;
import com.foodordering.service.AddressService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/addresses")
@Validated
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping
    public ResponseEntity<AddressDto> addAddress(
            Principal principal,
            @Valid @RequestBody AddressRequest request) {

        AddressDto dto = addressService.addAddress(
                principal.getName(),
                request);

        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<AddressDto>> getMyAddresses(
            Principal principal) {

        return ResponseEntity.ok(
                addressService.getMyAddresses(
                        principal.getName()));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AddressDto> getAddress(
            Principal principal,
            @PathVariable Long id) {

        return ResponseEntity.ok(
                addressService.getAddressById(
                        principal.getName(),
                        id));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<AddressDto> updateAddress(
            Principal principal,
            @PathVariable Long id,
            @Valid @RequestBody AddressRequest request) {

        return ResponseEntity.ok(
                addressService.updateAddress(
                        principal.getName(),
                        id,
                        request));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAddress(
            Principal principal,
            @PathVariable Long id) {

        addressService.deleteAddress(
                principal.getName(),
                id);

        return ResponseEntity.ok("Address deleted successfully.");
    }
    
    @PutMapping("/{id}/default")
    public ResponseEntity<AddressDto> setDefaultAddress(
            Principal principal,
            @PathVariable Long id) {

        return ResponseEntity.ok(
                addressService.setDefaultAddress(
                        principal.getName(),
                        id));
    }
}