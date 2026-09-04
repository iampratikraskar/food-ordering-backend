package com.foodordering.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodordering.dto.OrderDto;
import com.foodordering.dto.PlaceOrderRequest;
import com.foodordering.entity.Cart;
import com.foodordering.entity.CartItem;
import com.foodordering.entity.Customer;
import com.foodordering.entity.Order;
import com.foodordering.entity.OrderItem;
import com.foodordering.entity.OrderStatus;
import com.foodordering.exception.CartNotFoundException;
import com.foodordering.repository.CartRepository;
import com.foodordering.repository.CustomerRepository;
import com.foodordering.repository.OrderItemRepository;
import com.foodordering.repository.OrderRepository;
import com.foodordering.service.OrderService;
import com.foodordering.util.OrderMapper;

@Service
public class OrderServiceImpl implements OrderService {

	private final OrderRepository orderRepository;
	private final OrderItemRepository orderItemRepository;
	private final CustomerRepository customerRepository;
	private final CartRepository cartRepository;

	public OrderServiceImpl(OrderRepository orderRepository, OrderItemRepository orderItemRepository,
			CustomerRepository customerRepository, CartRepository cartRepository) {

		this.orderRepository = orderRepository;
		this.orderItemRepository = orderItemRepository;
		this.customerRepository = customerRepository;
		this.cartRepository = cartRepository;
	}

	@Override
	@Transactional
	public OrderDto placeOrder(String email, PlaceOrderRequest request) {

		Customer customer = customerRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Customer not found"));

		Cart cart = cartRepository.findByCustomerId(customer.getId())
				.orElseThrow(() -> new CartNotFoundException("Cart not found"));

		if (cart.getItems().isEmpty()) {
			throw new RuntimeException("Cart is empty");
		}

		Order order = new Order();

		order.setCustomer(customer);
		order.setDeliveryAddress(request.getDeliveryAddress());
		order.setPaymentMethod(request.getPaymentMethod());
		order.setStatus(OrderStatus.PENDING);
		order.setTotalAmount(cart.getTotalPrice());

		order = orderRepository.save(order);

		for (CartItem cartItem : cart.getItems()) {

			OrderItem orderItem = new OrderItem();

			orderItem.setOrder(order);
			orderItem.setFood(cartItem.getFood());
			orderItem.setPrice(cartItem.getPrice());
			orderItem.setQuantity(cartItem.getQuantity());
			orderItem.setSubtotal(cartItem.getSubtotal());

			order.getItems().add(orderItem);

			orderItemRepository.save(orderItem);
		}

		cart.getItems().clear();
		cart.setTotalPrice(0.0);

		cartRepository.save(cart);

		return OrderMapper.toDto(order);
	}

	@Override
	public List<OrderDto> getMyOrders(String email) {

		Customer customer = customerRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Customer not found"));

		return orderRepository.findByCustomerId(customer.getId()).stream().map(OrderMapper::toDto).toList();
	}

	@Override
	public OrderDto getOrderById(String email, Long orderId) {

		Customer customer = customerRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Customer not found"));

		Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));

		// Security Check
		if (!order.getCustomer().getId().equals(customer.getId())) {
			throw new RuntimeException("Unauthorized access");
		}

		return OrderMapper.toDto(order);
	}

	@Override
	@Transactional
	public OrderDto cancelOrder(String email, Long orderId) {

		Customer customer = customerRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Customer not found"));

		Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("Order not found"));

		if (!order.getCustomer().getId().equals(customer.getId())) {
			throw new RuntimeException("Unauthorized access");
		}

		if (order.getStatus() != OrderStatus.PENDING && order.getStatus() != OrderStatus.CONFIRMED) {

			throw new RuntimeException("Order cannot be cancelled");
		}

		order.setStatus(OrderStatus.CANCELLED);

		orderRepository.save(order);

		return OrderMapper.toDto(order);
	}

	@Override
	public List<OrderDto> getAllOrders() {

		return orderRepository.findAll()

				.stream()

				.map(OrderMapper::toDto)

				.toList();
	}

	@Override
	@Transactional
	public OrderDto updateOrderStatus(Long orderId, OrderStatus status) {

		Order order = orderRepository.findById(orderId)

				.orElseThrow(() -> new RuntimeException("Order not found"));

		order.setStatus(status);

		orderRepository.save(order);

		return OrderMapper.toDto(order);
	}

	@Override
	public Page<OrderDto> getAllOrders(int page, int size, String sortBy, String direction) {

		Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : 
			Sort.by(sortBy).ascending();

		Pageable pageable = PageRequest.of(page, size, sort);

		return orderRepository.findAll(pageable).map(OrderMapper::toDto);
	}

	@Override
	public Page<OrderDto> getOrdersByStatus(
	        OrderStatus status,
	        int page,
	        int size) {

	    Pageable pageable =
	            PageRequest.of(page, size);

	    return orderRepository
	            .findByStatus(status, pageable)
	            .map(OrderMapper::toDto);
	}

	@Override
	public Page<OrderDto> searchOrdersByCustomer(
	        String email,
	        int page,
	        int size) {

	    Pageable pageable =
	            PageRequest.of(page, size);

	    return orderRepository
	            .findByCustomerEmailContainingIgnoreCase(
	                    email,
	                    pageable)
	            .map(OrderMapper::toDto);
	}

}
