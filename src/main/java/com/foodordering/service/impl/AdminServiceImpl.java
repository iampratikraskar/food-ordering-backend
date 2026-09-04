package com.foodordering.service.impl;

import org.springframework.stereotype.Service;

import com.foodordering.dto.DashboardDto;
import com.foodordering.entity.OrderStatus;
import com.foodordering.repository.CustomerRepository;
import com.foodordering.repository.FoodRepository;
import com.foodordering.repository.OrderRepository;
import com.foodordering.repository.RestaurantRepository;
import com.foodordering.service.AdminService;

@Service
public class AdminServiceImpl implements AdminService{
	
	private final CustomerRepository customerRepository;
	private final RestaurantRepository restaurantRepository;
	private final FoodRepository foodRepository;
	private final OrderRepository orderRepository;
	
	public AdminServiceImpl(
	        CustomerRepository customerRepository,
	        RestaurantRepository restaurantRepository,
	        FoodRepository foodRepository,
	        OrderRepository orderRepository) {

	    this.customerRepository = customerRepository;
	    this.restaurantRepository = restaurantRepository;
	    this.foodRepository = foodRepository;
	    this.orderRepository = orderRepository;
	}

	@Override
	public DashboardDto getDashboard() {

	    DashboardDto dto = new DashboardDto();

	    dto.setTotalCustomers(customerRepository.count());

	    dto.setTotalRestaurants(restaurantRepository.count());

	    dto.setTotalFoods(foodRepository.count());

	    dto.setTotalOrders(orderRepository.count());

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

	    dto.setTotalRevenue(
	            orderRepository.getTotalRevenue());

	    return dto;
	}

}
