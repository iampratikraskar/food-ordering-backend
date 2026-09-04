package com.foodordering.dto;

public class CartItemDto {

    private Long id;

    private Long foodId;

    private String foodName;

    private Double price;

    private Integer quantity;

    private Double subtotal;

    public CartItemDto() {
    }

    public CartItemDto(Long id,
                       Long foodId,
                       String foodName,
                       Double price,
                       Integer quantity,
                       Double subtotal) {

        this.id = id;
        this.foodId = foodId;
        this.foodName = foodName;
        this.price = price;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getFoodId() {
		return foodId;
	}

	public void setFoodId(Long foodId) {
		this.foodId = foodId;
	}

	public String getFoodName() {
		return foodName;
	}

	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Double getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(Double subtotal) {
		this.subtotal = subtotal;
	}
    
    

}