package com.foodordering.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.foodordering.dto.FoodDto;
import com.foodordering.service.FoodService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/foods")
public class FoodController {

    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public FoodDto addFood(@Valid @RequestBody FoodDto dto) {
        return foodService.addFood(dto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','CUSTOMER')")
    @GetMapping
    public List<FoodDto> getAllFoods() {
        return foodService.getAllFoods();
    }

    @GetMapping("/{id}")
    public FoodDto getFood(@PathVariable Long id) {
        return foodService.getFoodById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public FoodDto updateFood(@PathVariable Long id,
                              @Valid @RequestBody FoodDto dto) {

        return foodService.updateFood(id, dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteFood(@PathVariable Long id) {

        foodService.deleteFood(id);

        return "Food deleted successfully";
    }

    @GetMapping("/restaurant/{restaurantId}")
    public List<FoodDto> getRestaurantFoods(
            @PathVariable Long restaurantId) {

        return foodService.getFoodsByRestaurant(restaurantId);
    }

    @GetMapping("/category/{categoryId}")
    public List<FoodDto> getCategoryFoods(
            @PathVariable Long categoryId) {

        return foodService.getFoodsByCategory(categoryId);
    }

    @GetMapping("/search")
    public List<FoodDto> searchFood(
            @RequestParam String name) {

        return foodService.searchFood(name);
    }

    @GetMapping("/price")
    public List<FoodDto> getByPrice(
            @RequestParam Double min,
            @RequestParam Double max) {

        return foodService.getFoodsByPrice(min, max);
    }

    @GetMapping("/available")
    public List<FoodDto> getAvailableFoods() {

        return foodService.getAvailableFoods();
    }

}