package com.foodordering.service;

import java.util.List;

import com.foodordering.dto.CustomerDto;

public interface CustomerService {

    CustomerDto register(CustomerDto dto);

    List<CustomerDto> getAllCustomers();

    CustomerDto getCustomerById(Long id);

    void deleteCustomer(Long id);

}