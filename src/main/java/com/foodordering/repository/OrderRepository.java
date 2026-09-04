package com.foodordering.repository;

import java.util.List;

import org.springframework.data.domain.*;
//import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.foodordering.entity.Order;
import com.foodordering.entity.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {

	List<Order> findByCustomerId(Long customerId);

	long countByStatus(OrderStatus status);

	@Query("""
			SELECT COALESCE(SUM(o.totalAmount),0)
			FROM Order o
			WHERE o.status='DELIVERED'
			""")
	Double getTotalRevenue();

	Page<Order> findAll(Pageable pageable);

	Page<Order> findByStatus(OrderStatus status, Pageable pageable);

	Page<Order> findByCustomerEmailContainingIgnoreCase(String email, Pageable pageable);

}