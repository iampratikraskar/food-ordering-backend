package com.foodordering.util;

import com.foodordering.dto.FoodDto;
import com.foodordering.entity.Food;

public class FoodMapper {

    public static FoodDto toDto(Food food) {

        FoodDto dto = new FoodDto();

        dto.setId(food.getId());
        dto.setName(food.getName());
        dto.setDescription(food.getDescription());
        dto.setPrice(food.getPrice());
        dto.setImageUrl(food.getImageUrl());
        dto.setAvailable(food.getAvailable());

        if(food.getRestaurant()!=null){
            dto.setRestaurantId(food.getRestaurant().getId());
        }

        if(food.getCategory()!=null){
            dto.setCategoryId(food.getCategory().getId());
        }

        return dto;
    }

}