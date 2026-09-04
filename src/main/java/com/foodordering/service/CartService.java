package com.foodordering.service;

import com.foodordering.dto.AddToCartRequest;
import com.foodordering.dto.CartDto;
import com.foodordering.dto.UpdateCartRequest;

public interface CartService {

    CartDto addToCart(String email, AddToCartRequest request);
    
    CartDto getCart(String email);
    
    CartDto updateCart(String email, UpdateCartRequest request);
    
    CartDto removeItem(String email, Long itemId);

    CartDto clearCart(String email);

}