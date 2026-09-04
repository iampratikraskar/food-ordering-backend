package com.foodordering.service;

import java.util.List;

import com.foodordering.dto.AddressDto;
import com.foodordering.dto.AddressRequest;

public interface AddressService {

    AddressDto addAddress(String email,
                          AddressRequest request);

    List<AddressDto> getMyAddresses(String email);

    AddressDto getAddressById(String email,
                              Long addressId);

    AddressDto updateAddress(String email,
                             Long addressId,
                             AddressRequest request);

    void deleteAddress(String email,
                       Long addressId);

    AddressDto setDefaultAddress(String email,
                                 Long addressId);

}