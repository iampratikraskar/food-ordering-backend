package com.foodordering.dto;

import java.time.LocalDateTime;
import java.util.List;

public class CartDto {

    private Long id;

    private Long customerId;

    private Double totalPrice;

    private LocalDateTime createdAt;

    private List<CartItemDto> items;

    public CartDto() {
    }

    public CartDto(Long id,
                   Long customerId,
                   Double totalPrice,
                   LocalDateTime createdAt,
                   List<CartItemDto> items) {

        this.id = id;
        this.customerId = customerId;
        this.totalPrice = totalPrice;
        this.createdAt = createdAt;
        this.items = items;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public List<CartItemDto> getItems() {
		return items;
	}

	public void setItems(List<CartItemDto> items) {
		this.items = items;
	}


}