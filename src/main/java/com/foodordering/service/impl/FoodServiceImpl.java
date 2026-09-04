package com.foodordering.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.foodordering.dto.FoodDto;
import com.foodordering.entity.Category;
import com.foodordering.entity.Food;
import com.foodordering.entity.Restaurant;
import com.foodordering.exception.RestaurantNotFoundException;
import com.foodordering.repository.CategoryRepository;
import com.foodordering.repository.FoodRepository;
import com.foodordering.repository.RestaurantRepository;
import com.foodordering.service.FoodService;
import com.foodordering.util.FoodMapper;

@Service
public class FoodServiceImpl implements FoodService {

    private final FoodRepository foodRepository;
    private final RestaurantRepository restaurantRepository;
    private final CategoryRepository categoryRepository;

    public FoodServiceImpl(
            FoodRepository foodRepository,
            RestaurantRepository restaurantRepository,
            CategoryRepository categoryRepository) {

        this.foodRepository = foodRepository;
        this.restaurantRepository = restaurantRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public FoodDto addFood(FoodDto dto) {

        Restaurant restaurant = restaurantRepository.findById(dto.getRestaurantId())
                .orElseThrow(() ->
                        new RestaurantNotFoundException("Restaurant not found"));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() ->
                        new RuntimeException("Category not found"));

        Food food = new Food();

        food.setName(dto.getName());
        food.setDescription(dto.getDescription());
        food.setPrice(dto.getPrice());
        food.setImageUrl(dto.getImageUrl());
        food.setAvailable(dto.getAvailable());
        food.setRestaurant(restaurant);
        food.setCategory(category);

        return FoodMapper.toDto(foodRepository.save(food));
    }

    @Override
    public List<FoodDto> getAllFoods() {

        return foodRepository.findAll()
                .stream()
                .map(FoodMapper::toDto)
                .toList();
    }

    @Override
    public FoodDto getFoodById(Long id) {

        Food food = foodRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Food not found"));

        return FoodMapper.toDto(food);
    }

    @Override
    public FoodDto updateFood(Long id, FoodDto dto) {

        Food food = foodRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Food not found"));

        food.setName(dto.getName());
        food.setDescription(dto.getDescription());
        food.setPrice(dto.getPrice());
        food.setImageUrl(dto.getImageUrl());
        food.setAvailable(dto.getAvailable());

        return FoodMapper.toDto(foodRepository.save(food));
    }

    @Override
    public void deleteFood(Long id) {

        foodRepository.deleteById(id);
    }

    @Override
    public List<FoodDto> getFoodsByRestaurant(Long restaurantId) {

        return foodRepository.findByRestaurantId(restaurantId)
                .stream()
                .map(FoodMapper::toDto)
                .toList();
    }

    @Override
    public List<FoodDto> getFoodsByCategory(Long categoryId) {

        return foodRepository.findByCategoryId(categoryId)
                .stream()
                .map(FoodMapper::toDto)
                .toList();
    }

    @Override
    public List<FoodDto> searchFood(String name) {

        return foodRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(FoodMapper::toDto)
                .toList();
    }

    @Override
    public List<FoodDto> getFoodsByPrice(Double minPrice, Double maxPrice) {

        return foodRepository.findByPriceBetween(minPrice, maxPrice)
                .stream()
                .map(FoodMapper::toDto)
                .toList();
    }

    @Override
    public List<FoodDto> getAvailableFoods() {

        return foodRepository.findByAvailableTrue()
                .stream()
                .map(FoodMapper::toDto)
                .toList();
    }

}