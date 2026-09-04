package com.foodordering.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.foodordering.dto.CustomerDto;
import com.foodordering.entity.Customer;
import com.foodordering.entity.Role;
import com.foodordering.exception.EmailAlreadyExistsException;
import com.foodordering.repository.CustomerRepository;
import com.foodordering.service.CustomerService;
import com.foodordering.util.CustomerMapper;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerServiceImpl(CustomerRepository customerRepository,
                               PasswordEncoder passwordEncoder) {

        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public CustomerDto register(CustomerDto dto) {

        if (customerRepository.existsByEmail(dto.getEmail())) {

            throw new EmailAlreadyExistsException(
                    "Email already registered.");
        }

        Customer customer = new Customer();

        customer.setFullName(dto.getFullName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());

        // Encrypt password
        customer.setPassword(passwordEncoder.encode(dto.getPassword()));

        customer.setRole(Role.CUSTOMER);

        Customer saved = customerRepository.save(customer);

        return CustomerMapper.toDto(saved);
    }

    @Override
    public List<CustomerDto> getAllCustomers() {

        return customerRepository.findAll()
                .stream()
                .map(CustomerMapper::toDto)
                .toList();
    }

    @Override
    public CustomerDto getCustomerById(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));

        return CustomerMapper.toDto(customer);
    }

    @Override
    public void deleteCustomer(Long id) {

        customerRepository.deleteById(id);
    }

}