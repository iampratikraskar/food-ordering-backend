package com.foodordering.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.foodordering.dto.RestaurantDto;

public interface RestaurantService {

    RestaurantDto addRestaurant(RestaurantDto restaurantDto);

    List<RestaurantDto> getAllRestaurants();

    RestaurantDto getRestaurantById(Long id);

    RestaurantDto updateRestaurant(Long id, RestaurantDto restaurantDto);

    void deleteRestaurant(Long id);
    
    List<RestaurantDto> searchByName(String name);

    List<RestaurantDto> searchByAddress(String address);

    List<RestaurantDto> searchByRating(Double rating);
    
    Page<RestaurantDto> getRestaurants(int page, int size);
    
    public Page<RestaurantDto> getRestaurants(
            int page,
            int size,
            String sortBy,
            String direction);
}