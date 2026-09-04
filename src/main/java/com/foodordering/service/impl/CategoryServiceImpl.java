package com.foodordering.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.foodordering.dto.CategoryDto;
import com.foodordering.entity.Category;
import com.foodordering.entity.Restaurant;
import com.foodordering.exception.RestaurantNotFoundException;
import com.foodordering.repository.CategoryRepository;
import com.foodordering.repository.RestaurantRepository;
import com.foodordering.service.CategoryService;
import com.foodordering.util.CategoryMapper;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final RestaurantRepository restaurantRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository,
                               RestaurantRepository restaurantRepository) {

        this.categoryRepository = categoryRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public CategoryDto addCategory(CategoryDto dto) {

        Restaurant restaurant = restaurantRepository.findById(dto.getRestaurantId())
                .orElseThrow(() -> new RestaurantNotFoundException(
                        "Restaurant not found with id : " + dto.getRestaurantId()));

        Category category = new Category();

        category.setName(dto.getName());
        category.setRestaurant(restaurant);

        Category saved = categoryRepository.save(category);

        return CategoryMapper.toDto(saved);
    }

    @Override
    public List<CategoryDto> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(CategoryMapper::toDto)
                .toList();
    }

    @Override
    public CategoryDto getCategoryById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return CategoryMapper.toDto(category);
    }

    @Override
    public CategoryDto updateCategory(Long id, CategoryDto dto) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        category.setName(dto.getName());

        return CategoryMapper.toDto(categoryRepository.save(category));
    }

    @Override
    public void deleteCategory(Long id) {

        categoryRepository.deleteById(id);
    }

    @Override
    public List<CategoryDto> getCategoriesByRestaurant(Long restaurantId) {

        return categoryRepository.findByRestaurantId(restaurantId)
                .stream()
                .map(CategoryMapper::toDto)
                .toList();
    }
}