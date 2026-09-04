package com.foodordering.service;

import java.util.List;

import com.foodordering.dto.CategoryDto;

public interface CategoryService {

    CategoryDto addCategory(CategoryDto categoryDto);

    List<CategoryDto> getAllCategories();

    CategoryDto getCategoryById(Long id);

    CategoryDto updateCategory(Long id, CategoryDto categoryDto);

    void deleteCategory(Long id);

    List<CategoryDto> getCategoriesByRestaurant(Long restaurantId);
}