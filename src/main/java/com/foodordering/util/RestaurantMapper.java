package com.foodordering.util;

import com.foodordering.dto.RestaurantDto;
import com.foodordering.entity.Restaurant;

public class RestaurantMapper {

    // DTO -> Entity
    public static Restaurant toEntity(RestaurantDto dto) {

        Restaurant restaurant = new Restaurant();

        restaurant.setId(dto.getId());
        restaurant.setName(dto.getName());
        restaurant.setAddress(dto.getAddress());
        restaurant.setPhone(dto.getPhone());
        restaurant.setRating(dto.getRating());

        return restaurant;
    }

    // Entity -> DTO
    public static RestaurantDto toDto(Restaurant restaurant) {

        RestaurantDto dto = new RestaurantDto();

        dto.setId(restaurant.getId());
        dto.setName(restaurant.getName());
        dto.setAddress(restaurant.getAddress());
        dto.setPhone(restaurant.getPhone());
        dto.setRating(restaurant.getRating());

        return dto;
    }
}