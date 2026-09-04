package com.foodordering.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodordering.dto.AddressDto;
import com.foodordering.dto.AddressRequest;
import com.foodordering.entity.Address;
import com.foodordering.entity.Customer;
import com.foodordering.repository.AddressRepository;
import com.foodordering.repository.CustomerRepository;
import com.foodordering.service.AddressService;
import com.foodordering.util.AddressMapper;

@Service
public class AddressServiceImpl implements AddressService {

	private final AddressRepository addressRepository;
	private final CustomerRepository customerRepository;

	public AddressServiceImpl(AddressRepository addressRepository, CustomerRepository customerRepository) {

		this.addressRepository = addressRepository;
		this.customerRepository = customerRepository;
	}

	@Override
	@Transactional
	public AddressDto addAddress(String email,
	                             AddressRequest request) {

	    Customer customer = customerRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("Customer not found"));

	    Address address = new Address();

	    address.setFullName(request.getFullName());
	    address.setPhone(request.getPhone());
	    address.setHouseNo(request.getHouseNo());
	    address.setStreet(request.getStreet());
	    address.setLandmark(request.getLandmark());
	    address.setCity(request.getCity());
	    address.setState(request.getState());
	    address.setPincode(request.getPincode());

	    address.setCustomer(customer);

	    List<Address> addresses =
	            addressRepository.findByCustomerId(customer.getId());

	    // First address becomes default
	    if (addresses.isEmpty()) {
	        address.setDefault(true);
	    }

	    address = addressRepository.save(address);

	    return AddressMapper.toDto(address);
	}

	@Override
	public List<AddressDto> getMyAddresses(String email) {

	    Customer customer = customerRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("Customer not found"));

	    List<Address> addresses =
	            addressRepository.findByCustomerId(customer.getId());

	    return addresses.stream()
	            .map(AddressMapper::toDto)
	            .toList();
	}

	@Override
	public AddressDto getAddressById(String email,
	                                 Long addressId) {

	    Customer customer = customerRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("Customer not found"));

	    Address address = addressRepository.findById(addressId)
	            .orElseThrow(() ->
	                    new RuntimeException("Address not found"));

	    if (!address.getCustomer().getId().equals(customer.getId())) {
	        throw new RuntimeException("Unauthorized access");
	    }

	    return AddressMapper.toDto(address);
	}

	@Override
	@Transactional
	public AddressDto updateAddress(String email,
	                                Long addressId,
	                                AddressRequest request) {

	    Customer customer = customerRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("Customer not found"));

	    Address address = addressRepository.findById(addressId)
	            .orElseThrow(() ->
	                    new RuntimeException("Address not found"));

	    if (!address.getCustomer().getId().equals(customer.getId())) {
	        throw new RuntimeException("Unauthorized access");
	    }

	    address.setFullName(request.getFullName());
	    address.setPhone(request.getPhone());
	    address.setHouseNo(request.getHouseNo());
	    address.setStreet(request.getStreet());
	    address.setLandmark(request.getLandmark());
	    address.setCity(request.getCity());
	    address.setState(request.getState());
	    address.setPincode(request.getPincode());

	    address = addressRepository.save(address);

	    return AddressMapper.toDto(address);
	}

	@Override
	@Transactional
	public void deleteAddress(String email,
	                          Long addressId) {

	    Customer customer = customerRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("Customer not found"));

	    Address address = addressRepository.findById(addressId)
	            .orElseThrow(() ->
	                    new RuntimeException("Address not found"));

	    if (!address.getCustomer().getId().equals(customer.getId())) {
	        throw new RuntimeException("Unauthorized access");
	    }

	    addressRepository.delete(address);
	}

	@Override
	@Transactional
	public AddressDto setDefaultAddress(String email,
	                                    Long addressId) {

	    Customer customer = customerRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("Customer not found"));

	    List<Address> addresses =
	            addressRepository.findByCustomerId(customer.getId());

	    Address selectedAddress = null;

	    for (Address address : addresses) {

	        if (address.isDefault()) {
	            address.setDefault(false);
	        }

	        if (address.getId().equals(addressId)) {
	            selectedAddress = address;
	        }
	    }

	    if (selectedAddress == null) {
	        throw new RuntimeException("Address not found");
	    }

	    selectedAddress.setDefault(true);

	    addressRepository.saveAll(addresses);

	    return AddressMapper.toDto(selectedAddress);
	}

}
