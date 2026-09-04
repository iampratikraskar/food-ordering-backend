package com.foodordering.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodordering.dto.PaymentDto;
import com.foodordering.dto.PaymentRequest;
import com.foodordering.entity.Customer;
import com.foodordering.entity.Order;
import com.foodordering.entity.Payment;
import com.foodordering.entity.PaymentMethod;
import com.foodordering.entity.PaymentStatus;
import com.foodordering.repository.CustomerRepository;
import com.foodordering.repository.OrderRepository;
import com.foodordering.repository.PaymentRepository;
import com.foodordering.service.PaymentService;
import com.foodordering.util.PaymentMapper;

@Service
public class PaymentServiceImpl implements PaymentService{
	
	private final PaymentRepository paymentRepository;
	private final OrderRepository orderRepository;
	private final CustomerRepository customerRepository;
	
	public PaymentServiceImpl(
	        PaymentRepository paymentRepository,
	        OrderRepository orderRepository,
	        CustomerRepository customerRepository) {

	    this.paymentRepository = paymentRepository;
	    this.orderRepository = orderRepository;
	    this.customerRepository = customerRepository;
	}

	@Override
	@Transactional
	public PaymentDto createPayment(String email,
	                                PaymentRequest request) {

	    Customer customer = customerRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("Customer not found"));

	    Order order = orderRepository.findById(request.getOrderId())
	            .orElseThrow(() ->
	                    new RuntimeException("Order not found"));

	    // Verify ownership
	    if (!order.getCustomer().getId().equals(customer.getId())) {
	        throw new RuntimeException("Unauthorized access");
	    }

	    // Prevent duplicate payments
	    if (paymentRepository.findByOrderId(order.getId()).isPresent()) {
	        throw new RuntimeException("Payment already exists");
	    }

	    Payment payment = new Payment();

	    payment.setOrder(order);
	    payment.setAmount(order.getTotalAmount());
	    payment.setPaymentMethod(request.getPaymentMethod());

	    if (request.getPaymentMethod() == PaymentMethod.CASH_ON_DELIVERY) {

	        payment.setPaymentStatus(PaymentStatus.PENDING);

	    } else {

	        payment.setPaymentStatus(PaymentStatus.PENDING);

	        payment.setTransactionId(
	                "TXN-" + System.currentTimeMillis());

	    }

	    payment = paymentRepository.save(payment);

	    return PaymentMapper.toDto(payment);
	}

	@Override
	public PaymentDto getPayment(Long orderId) {

	    Payment payment = paymentRepository.findByOrderId(orderId)
	            .orElseThrow(() ->
	                    new RuntimeException("Payment not found"));

	    return PaymentMapper.toDto(payment);
	}

}
