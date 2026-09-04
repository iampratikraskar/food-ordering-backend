package com.foodordering.util;

import com.foodordering.dto.PaymentDto;
import com.foodordering.entity.Payment;

public class PaymentMapper {

    public static PaymentDto toDto(Payment payment){

        PaymentDto dto = new PaymentDto();

        dto.setId(payment.getId());
        dto.setOrderId(payment.getOrder().getId());
        dto.setAmount(payment.getAmount());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setPaymentStatus(payment.getPaymentStatus());
        dto.setTransactionId(payment.getTransactionId());
        dto.setPaymentDate(payment.getPaymentDate());

        return dto;
    }

}