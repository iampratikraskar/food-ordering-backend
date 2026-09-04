package com.foodordering.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.foodordering.dto.OrderDto;
import com.foodordering.dto.PlaceOrderRequest;
import com.foodordering.entity.OrderStatus;

public interface OrderService {

	OrderDto placeOrder(String email, PlaceOrderRequest request);

	List<OrderDto> getMyOrders(String email);

	OrderDto getOrderById(String email, Long orderId);

	OrderDto cancelOrder(String email, Long orderId);

	List<OrderDto> getAllOrders();

	OrderDto updateOrderStatus(Long orderId, OrderStatus status);

	Page<OrderDto> getAllOrders(int page, int size, String sortBy, String direction);

	Page<OrderDto> getOrdersByStatus(OrderStatus status, int page, int size);

	Page<OrderDto> searchOrdersByCustomer(String email, int page, int size);

}