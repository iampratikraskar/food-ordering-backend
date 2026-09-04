package com.foodordering.controller;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.foodordering.dto.PaymentDto;
import com.foodordering.dto.PaymentRequest;
import com.foodordering.service.PaymentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payments")
@Validated
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create")
    public ResponseEntity<PaymentDto> createPayment(
            Principal principal,
            @Valid @RequestBody PaymentRequest request) {

        PaymentDto payment =
                paymentService.createPayment(
                        principal.getName(),
                        request);

        return new ResponseEntity<>(payment,
                HttpStatus.CREATED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<PaymentDto> getPayment(
            @PathVariable Long orderId) {

        return ResponseEntity.ok(

                paymentService.getPayment(orderId)

        );
    }
}