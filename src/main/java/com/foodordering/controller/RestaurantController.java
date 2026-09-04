package com.foodordering.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.foodordering.dto.RestaurantDto;
import com.foodordering.service.RestaurantService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    // Create Restaurant
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public RestaurantDto addRestaurant(@Valid @RequestBody RestaurantDto restaurantDto) {
        return restaurantService.addRestaurant(restaurantDto);
    }

 // Get All Restaurants
    @GetMapping
    public List<RestaurantDto> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    // Get Restaurant By ID
    @GetMapping("/{id}")
    public RestaurantDto getRestaurantById(@PathVariable Long id) {
        return restaurantService.getRestaurantById(id);
    }

    // Update Restaurant
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public RestaurantDto updateRestaurant(@PathVariable Long id,
                                          @Valid @RequestBody RestaurantDto restaurantDto) {
        return restaurantService.updateRestaurant(id, restaurantDto);
    }

    // Delete Restaurant
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return "Restaurant deleted successfully.";
    }
    
    @GetMapping("/search")
    public List<RestaurantDto> searchByName(@RequestParam String name) {

        return restaurantService.searchByName(name);
    }
    
    @GetMapping("/address")
    public List<RestaurantDto> searchByAddress(@RequestParam String address) {

        return restaurantService.searchByAddress(address);
    }
    
    @GetMapping("/rating")
    public List<RestaurantDto> searchByRating(@RequestParam Double rating) {

        return restaurantService.searchByRating(rating);
    }
    
    
    @GetMapping("/page")
    public Page<RestaurantDto> getRestaurants(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "id") String sortBy,

            @RequestParam(defaultValue = "asc") String direction){

        return restaurantService.getRestaurants(
                page,
                size,
                sortBy,
                direction);

    }
    
    
    
    
    
    
    
    
}