package com.foodordering.controller;

import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.foodordering.dto.AddToCartRequest;
import com.foodordering.dto.CartDto;
import com.foodordering.dto.UpdateCartRequest;
import com.foodordering.service.CartService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
@Validated
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<CartDto> addToCart(
            Principal principal,
            @Valid @RequestBody AddToCartRequest request) {

        CartDto dto = cartService.addToCart(
                principal.getName(),
                request);

        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
    
    @GetMapping
    public ResponseEntity<CartDto> getCart(Principal principal) {

        CartDto cart = cartService.getCart(principal.getName());

        return ResponseEntity.ok(cart);
    }
    
    @PutMapping("/update")
    public ResponseEntity<CartDto> updateCart(
            Principal principal,
            @Valid @RequestBody UpdateCartRequest request) {

        CartDto cart = cartService.updateCart(
                principal.getName(),
                request);

        return ResponseEntity.ok(cart);
    }
    
    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<CartDto> removeItem(
            Principal principal,
            @PathVariable Long itemId) {

        CartDto cart =
                cartService.removeItem(
                        principal.getName(),
                        itemId);

        return ResponseEntity.ok(cart);
    }
    
    @DeleteMapping("/clear")
    public ResponseEntity<CartDto> clearCart(
            Principal principal) {

        CartDto cart =
                cartService.clearCart(
                        principal.getName());

        return ResponseEntity.ok(cart);
    }
}