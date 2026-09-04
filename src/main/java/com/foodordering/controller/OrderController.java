package com.foodordering.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.foodordering.dto.OrderDto;
import com.foodordering.dto.PlaceOrderRequest;
import com.foodordering.entity.OrderStatus;
import com.foodordering.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/orders")
@Validated
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/place")
    public ResponseEntity<OrderDto> placeOrder(
            Principal principal,
            @Valid @RequestBody PlaceOrderRequest request) {

        OrderDto order = orderService.placeOrder(
                principal.getName(),
                request);

        return new ResponseEntity<>(order, HttpStatus.CREATED);
    }
    
    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderDto>> getMyOrders(
            Principal principal) {

        return ResponseEntity.ok(
                orderService.getMyOrders(principal.getName()));
    }
    
    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDto> getOrder(
            Principal principal,
            @PathVariable Long orderId) {

        return ResponseEntity.ok(
                orderService.getOrderById(
                        principal.getName(),
                        orderId));
    }
    
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<OrderDto> cancelOrder(
            Principal principal,
            @PathVariable Long orderId) {

        return ResponseEntity.ok(

                orderService.cancelOrder(
                        principal.getName(),
                        orderId)

        );
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/all")
    public ResponseEntity<List<OrderDto>> getAllOrders() {

        return ResponseEntity.ok(

                orderService.getAllOrders()

        );
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/admin/{orderId}/status")
    public ResponseEntity<OrderDto> updateStatus(

            @PathVariable Long orderId,

            @RequestParam OrderStatus status) {

        return ResponseEntity.ok(

                orderService.updateOrderStatus(
                        orderId,
                        status)

        );
    }
}