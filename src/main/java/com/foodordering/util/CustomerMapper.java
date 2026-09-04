package com.foodordering.util;

import com.foodordering.dto.CustomerDto;
import com.foodordering.entity.Customer;

public class CustomerMapper {

    public static CustomerDto toDto(Customer customer){

        CustomerDto dto = new CustomerDto();

        dto.setId(customer.getId());
        dto.setFullName(customer.getFullName());
        dto.setEmail(customer.getEmail());
        dto.setPhone(customer.getPhone());

        // Never expose the password
        dto.setPassword(null);

        return dto;
    }

}