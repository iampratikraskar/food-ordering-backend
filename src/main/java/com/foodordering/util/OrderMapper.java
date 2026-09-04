package com.foodordering.util;

import java.util.stream.Collectors;

import com.foodordering.dto.OrderDto;
import com.foodordering.dto.OrderItemDto;
import com.foodordering.entity.Order;
import com.foodordering.entity.OrderItem;

public class OrderMapper {

    public static OrderItemDto toItemDto(OrderItem item) {

        OrderItemDto dto = new OrderItemDto();

        dto.setId(item.getId());
        dto.setFoodId(item.getFood().getId());
        dto.setFoodName(item.getFood().getName());
        dto.setPrice(item.getPrice());
        dto.setQuantity(item.getQuantity());
        dto.setSubtotal(item.getSubtotal());

        return dto;
    }

    public static OrderDto toDto(Order order) {

        OrderDto dto = new OrderDto();

        dto.setId(order.getId());
        dto.setCustomerId(order.getCustomer().getId());
        dto.setOrderDate(order.getOrderDate());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setDeliveryAddress(order.getDeliveryAddress());
        dto.setPaymentMethod(order.getPaymentMethod());

        dto.setItems(order.getItems()
                .stream()
                .map(OrderMapper::toItemDto)
                .collect(Collectors.toList()));

        return dto;
    }
}