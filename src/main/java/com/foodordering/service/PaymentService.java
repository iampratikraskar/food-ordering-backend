package com.foodordering.service;

import com.foodordering.dto.PaymentDto;
import com.foodordering.dto.PaymentRequest;

public interface PaymentService {

    PaymentDto createPayment(String email,
                             PaymentRequest request);

    PaymentDto getPayment(Long orderId);

}