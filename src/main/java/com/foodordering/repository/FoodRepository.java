package com.foodordering.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodordering.entity.Food;

public interface FoodRepository extends JpaRepository<Food, Long> {

    List<Food> findByRestaurantId(Long restaurantId);

    List<Food> findByCategoryId(Long categoryId);

    List<Food> findByAvailableTrue();

    List<Food> findByPriceBetween(Double minPrice, Double maxPrice);

    List<Food> findByNameContainingIgnoreCase(String name);

}