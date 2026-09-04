package com.foodordering.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodordering.entity.Restaurant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long>{
	 List<Restaurant> findByNameContainingIgnoreCase(String name);

	    // Search by address
	    List<Restaurant> findByAddressContainingIgnoreCase(String address);

	    // Search by rating
	    List<Restaurant> findByRatingGreaterThanEqual(Double rating);
}
