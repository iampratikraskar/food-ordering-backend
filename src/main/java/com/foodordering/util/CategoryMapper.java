package com.foodordering.util;

import com.foodordering.dto.CategoryDto;
import com.foodordering.entity.Category;

public class CategoryMapper {

    public static CategoryDto toDto(Category category) {

        CategoryDto dto = new CategoryDto();

        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setImageUrl(category.getImageUrl());

        if(category.getRestaurant()!=null){
            dto.setRestaurantId(category.getRestaurant().getId());
        }

        return dto;
    }

}