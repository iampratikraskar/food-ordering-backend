package com.foodordering.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.foodordering.entity.Restaurant;
import com.foodordering.exception.RestaurantNotFoundException;
import com.foodordering.repository.RestaurantRepository;
import com.foodordering.service.RestaurantService;
import com.foodordering.dto.RestaurantDto;
import com.foodordering.util.RestaurantMapper;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository repository;

    public RestaurantServiceImpl(RestaurantRepository repository) {
        this.repository = repository;
    }

    @Override
    public RestaurantDto addRestaurant(RestaurantDto restaurantDto) {

        Restaurant restaurant = RestaurantMapper.toEntity(restaurantDto);

        Restaurant savedRestaurant = repository.save(restaurant);

        return RestaurantMapper.toDto(savedRestaurant);
    }

    @Override
    public List<RestaurantDto> getAllRestaurants() {

        return repository.findAll()
                .stream()
                .map(RestaurantMapper::toDto)
                .toList();
    }

    @Override
    public RestaurantDto getRestaurantById(Long id) {

    	Restaurant restaurant = repository.findById(id)
    	        .orElseThrow(() ->
    	            new RestaurantNotFoundException(
    	                "Restaurant not found with id : " + id));

        return RestaurantMapper.toDto(restaurant);
    }

    @Override
    public RestaurantDto updateRestaurant(Long id,
                                          RestaurantDto restaurantDto) {

        Restaurant existing = repository.findById(id).orElse(null);

        if (existing == null) {
            return null;
        }

        existing.setName(restaurantDto.getName());
        existing.setAddress(restaurantDto.getAddress());
        existing.setPhone(restaurantDto.getPhone());
        existing.setRating(restaurantDto.getRating());

        Restaurant updated = repository.save(existing);

        return RestaurantMapper.toDto(updated);
    }

    @Override
    public void deleteRestaurant(Long id) {

        Restaurant restaurant = repository.findById(id)
                .orElseThrow(() ->
                    new RestaurantNotFoundException(
                        "Restaurant not found with id : " + id));

        repository.delete(restaurant);
    }

    @Override
    public List<RestaurantDto> searchByName(String name) {

        return repository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(RestaurantMapper::toDto)
                .toList();
    }

    @Override
    public List<RestaurantDto> searchByAddress(String address) {

        return repository.findByAddressContainingIgnoreCase(address)
                .stream()
                .map(RestaurantMapper::toDto)
                .toList();
    }
    
    @Override
    public List<RestaurantDto> searchByRating(Double rating) {

        return repository.findByRatingGreaterThanEqual(rating)
                .stream()
                .map(RestaurantMapper::toDto)
                .toList();
    }

    @Override
    public Page<RestaurantDto> getRestaurants(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return repository.findAll(pageable)
                .map(RestaurantMapper::toDto);
    }

    @Override
    public Page<RestaurantDto> getRestaurants(
            int page,
            int size,
            String sortBy,
            String direction){

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page,size,sort);

        return repository.findAll(pageable)
                .map(RestaurantMapper::toDto);
    }
}