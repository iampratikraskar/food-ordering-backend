package com.foodordering.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.foodordering.dto.DashboardDto;
import com.foodordering.dto.OrderDto;
import com.foodordering.entity.OrderStatus;
import com.foodordering.service.AdminService;
import com.foodordering.service.OrderService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	private final AdminService adminService;
	private final OrderService orderService;

	public AdminController(AdminService adminService,
	                       OrderService orderService) {

	    this.adminService = adminService;
	    this.orderService = orderService;
	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/dashboard")
	public ResponseEntity<DashboardDto> dashboard() {

		return ResponseEntity.ok(adminService.getDashboard());

	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/orders")
	public ResponseEntity<Page<OrderDto>> getAllOrders(

			@RequestParam(defaultValue = "0") int page,

			@RequestParam(defaultValue = "10") int size,

			@RequestParam(defaultValue = "orderDate") String sortBy,

			@RequestParam(defaultValue = "desc") String direction) {

		return ResponseEntity.ok(
				orderService.getAllOrders(
		                page,
		                size,
		                sortBy,
		                direction));

	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/orders/status")
	public ResponseEntity<Page<OrderDto>> getOrdersByStatus(

			@RequestParam OrderStatus status,

			@RequestParam(defaultValue = "0") int page,

			@RequestParam(defaultValue = "10") int size) {

		return ResponseEntity.ok(

				orderService.getOrdersByStatus(status, page, size));

	}

	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/orders/search")
	public ResponseEntity<Page<OrderDto>> searchOrders(

			@RequestParam String email,

			@RequestParam(defaultValue = "0") int page,

			@RequestParam(defaultValue = "10") int size) {

		return ResponseEntity.ok(

				orderService.searchOrdersByCustomer(email, page, size));

	}

}