package com.foodordering.service.impl;

import org.springframework.stereotype.Service;

import com.foodordering.dto.AddToCartRequest;
import com.foodordering.dto.CartDto;
import com.foodordering.dto.UpdateCartRequest;
import com.foodordering.entity.Cart;
import com.foodordering.entity.CartItem;
import com.foodordering.entity.Customer;
import com.foodordering.entity.Food;
import com.foodordering.exception.CartNotFoundException;
import com.foodordering.repository.CartItemRepository;
import com.foodordering.repository.CartRepository;
import com.foodordering.repository.CustomerRepository;
import com.foodordering.repository.FoodRepository;
import com.foodordering.service.CartService;
import com.foodordering.util.CartMapper;

@Service
public class CartServiceImpl implements CartService {

	private final CartRepository cartRepository;
	private final CartItemRepository cartItemRepository;
	private final CustomerRepository customerRepository;
	private final FoodRepository foodRepository;

	public CartServiceImpl(CartRepository cartRepository, CartItemRepository cartItemRepository,
			CustomerRepository customerRepository, FoodRepository foodRepository) {

		this.cartRepository = cartRepository;
		this.cartItemRepository = cartItemRepository;
		this.customerRepository = customerRepository;
		this.foodRepository = foodRepository;
	}

	@Override
	public CartDto addToCart(String email, AddToCartRequest request) {

		Customer customer = customerRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Customer not found"));

		Food food = foodRepository.findById(request.getFoodId())
				.orElseThrow(() -> new RuntimeException("Food not found"));

		Cart cart = cartRepository.findByCustomerId(customer.getId()).orElseGet(() -> {

			Cart newCart = new Cart();
			newCart.setCustomer(customer);
			newCart.setTotalPrice(0.0);

			return cartRepository.save(newCart);
		});

		CartItem item = cartItemRepository.findByCartIdAndFoodId(cart.getId(), food.getId()).orElse(null);

		if (item != null) {

			item.setQuantity(item.getQuantity() + request.getQuantity());

			item.setSubtotal(item.getQuantity() * item.getPrice());

		} else {

			item = new CartItem();

			item.setCart(cart);
			item.setFood(food);

			item.setPrice(food.getPrice());

			item.setQuantity(request.getQuantity());

			item.setSubtotal(food.getPrice() * request.getQuantity());

			cart.getItems().add(item);
		}

		/*
		 * item.setCart(cart); item.setFood(food);
		 * item.setQuantity(request.getQuantity());
		 * 
		 * item.setPrice(food.getPrice());
		 * 
		 * item.setSubtotal( food.getPrice() * request.getQuantity());
		 * 
		 * cart.getItems().add(item);
		 * 
		 * cart.setTotalPrice( cart.getTotalPrice() + item.getSubtotal());
		 */

		double total = cart.getItems().stream().mapToDouble(CartItem::getSubtotal).sum();

		cart.setTotalPrice(total);

		cartItemRepository.save(item);

		cartRepository.save(cart);

		return CartMapper.toDto(cart);
	}

	@Override
	public CartDto getCart(String email) {

	    Customer customer = customerRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("Customer not found"));

	    Cart cart = cartRepository.findByCustomerId(customer.getId())
	            .orElseThrow(() ->
	                    new RuntimeException("Cart is empty"));

	    return CartMapper.toDto(cart);
	}

	@Override
	public CartDto updateCart(String email,
	                          UpdateCartRequest request) {

	    Customer customer = customerRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("Customer not found"));

	    Cart cart = cartRepository.findByCustomerId(customer.getId())
	            .orElseThrow(() ->
	                    new CartNotFoundException("Cart not found"));

	    CartItem item = cartItemRepository.findById(request.getItemId())
	            .orElseThrow(() ->
	                    new RuntimeException("Cart item not found"));

	    // Security check
	    if (!item.getCart().getId().equals(cart.getId())) {
	        throw new RuntimeException("Unauthorized cart access");
	    }

	    item.setQuantity(request.getQuantity());

	    item.setSubtotal(item.getPrice() * request.getQuantity());

	    cartItemRepository.save(item);

	    double total = cart.getItems()
	                       .stream()
	                       .mapToDouble(CartItem::getSubtotal)
	                       .sum();

	    cart.setTotalPrice(total);

	    cartRepository.save(cart);

	    return CartMapper.toDto(cart);
	}

	@Override
	public CartDto removeItem(String email, Long itemId) {

	    Customer customer = customerRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("Customer not found"));

	    Cart cart = cartRepository.findByCustomerId(customer.getId())
	            .orElseThrow(() ->
	                    new CartNotFoundException("Cart not found"));

	    CartItem item = cartItemRepository.findById(itemId)
	            .orElseThrow(() ->
	                    new RuntimeException("Cart item not found"));

	    // Security check
	    if (!item.getCart().getId().equals(cart.getId())) {
	        throw new RuntimeException("Unauthorized cart access");
	    }

	    cart.getItems().remove(item);

	    cartItemRepository.delete(item);

	    double total = cart.getItems()
	            .stream()
	            .mapToDouble(CartItem::getSubtotal)
	            .sum();

	    cart.setTotalPrice(total);

	    cartRepository.save(cart);

	    return CartMapper.toDto(cart);
	}

	@Override
	public CartDto clearCart(String email) {

	    Customer customer = customerRepository.findByEmail(email)
	            .orElseThrow(() ->
	                    new RuntimeException("Customer not found"));

	    Cart cart = cartRepository.findByCustomerId(customer.getId())
	            .orElseThrow(() ->
	                    new CartNotFoundException("Cart not found"));

	    cart.getItems().clear();

	    cart.setTotalPrice(0.0);

	    cartRepository.save(cart);

	    return CartMapper.toDto(cart);
	}

}
