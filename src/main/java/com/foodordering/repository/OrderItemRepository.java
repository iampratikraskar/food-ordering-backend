package com.foodordering.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodordering.entity.OrderItem;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, Long> {

}