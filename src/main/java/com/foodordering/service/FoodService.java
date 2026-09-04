package com.foodordering.service;

import java.util.List;

import com.foodordering.dto.FoodDto;

public interface FoodService {

    FoodDto addFood(FoodDto dto);

    List<FoodDto> getAllFoods();

    FoodDto getFoodById(Long id);

    FoodDto updateFood(Long id, FoodDto dto);

    void deleteFood(Long id);

    List<FoodDto> getFoodsByRestaurant(Long restaurantId);

    List<FoodDto> getFoodsByCategory(Long categoryId);

    List<FoodDto> searchFood(String name);

    List<FoodDto> getFoodsByPrice(Double minPrice, Double maxPrice);

    List<FoodDto> getAvailableFoods();

}