package com.foodordering.service.impl;

import org.springframework.stereotype.Service;

import com.foodordering.dto.DashboardDto;
import com.foodordering.entity.OrderStatus;
import com.foodordering.repository.CustomerRepository;
import com.foodordering.repository.OrderRepository;
import com.foodordering.repository.RestaurantRepository;
import com.foodordering.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService {

    private final CustomerRepository customerRepository;
    private final RestaurantRepository restaurantRepository;
    private final OrderRepository orderRepository;

    public AdminServiceImpl(
            CustomerRepository customerRepository,
            RestaurantRepository restaurantRepository,
            OrderRepository orderRepository) {

        this.customerRepository = customerRepository;
        this.restaurantRepository = restaurantRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public DashboardDto getDashboard() {

        DashboardDto dto = new DashboardDto();

        // Total customers
        dto.setTotalCustomers(
                customerRepository.count());

        // Total restaurants
        dto.setTotalRestaurants(
                restaurantRepository.count());

        // Total orders
        dto.setTotalOrders(
                orderRepository.count());

        // Orders by status
        dto.setPendingOrders(
                orderRepository.countByStatus(OrderStatus.PENDING));

        dto.setConfirmedOrders(
                orderRepository.countByStatus(OrderStatus.CONFIRMED));

        dto.setPreparingOrders(
                orderRepository.countByStatus(OrderStatus.PREPARING));

        dto.setOutForDeliveryOrders(
                orderRepository.countByStatus(OrderStatus.OUT_FOR_DELIVERY));

        dto.setDeliveredOrders(
                orderRepository.countByStatus(OrderStatus.DELIVERED));

        dto.setCancelledOrders(
                orderRepository.countByStatus(OrderStatus.CANCELLED));
        
        Double totalRevenue = orderRepository.getTotalRevenue(OrderStatus.DELIVERED);
        
        dto.setTotalRevenue(totalRevenue);

        return dto;
    }
}