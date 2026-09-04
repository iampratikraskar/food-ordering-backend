package com.foodordering.util;

import java.util.stream.Collectors;

import com.foodordering.dto.CartDto;
import com.foodordering.dto.CartItemDto;
import com.foodordering.entity.Cart;
import com.foodordering.entity.CartItem;

public class CartMapper {

    public static CartItemDto toItemDto(CartItem item){

        CartItemDto dto = new CartItemDto();

        dto.setId(item.getId());
        dto.setFoodId(item.getFood().getId());
        dto.setFoodName(item.getFood().getName());
        dto.setPrice(item.getPrice());
        dto.setQuantity(item.getQuantity());
        dto.setSubtotal(item.getSubtotal());

        return dto;
    }

    public static CartDto toDto(Cart cart){

        CartDto dto = new CartDto();

        dto.setId(cart.getId());
        dto.setCustomerId(cart.getCustomer().getId());
        dto.setTotalPrice(cart.getTotalPrice());
        dto.setCreatedAt(cart.getCreatedAt());

        dto.setItems(

                cart.getItems()

                        .stream()

                        .map(CartMapper::toItemDto)

                        .collect(Collectors.toList())

        );

        return dto;
    }

}