package com.foodordering.util;

import com.foodordering.dto.AddressDto;
import com.foodordering.entity.Address;

public class AddressMapper {

    public static AddressDto toDto(Address address) {

        AddressDto dto = new AddressDto();

        dto.setId(address.getId());
        dto.setFullName(address.getFullName());
        dto.setPhone(address.getPhone());
        dto.setHouseNo(address.getHouseNo());
        dto.setStreet(address.getStreet());
        dto.setLandmark(address.getLandmark());
        dto.setCity(address.getCity());
        dto.setState(address.getState());
        dto.setPincode(address.getPincode());
        dto.setDefault(address.isDefault());

        return dto;
    }
}