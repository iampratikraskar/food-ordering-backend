package com.foodordering.dto;

public class DashboardDto {

    private long totalCustomers;

    private long totalRestaurants;

    private long totalFoods;

    private long totalOrders;

    private long pendingOrders;

    private long confirmedOrders;

    private long preparingOrders;

    private long outForDeliveryOrders;

    private long deliveredOrders;

    private long cancelledOrders;

    private Double totalRevenue;

    public DashboardDto() {
    }

	public long getTotalCustomers() {
		return totalCustomers;
	}

	public void setTotalCustomers(long totalCustomers) {
		this.totalCustomers = totalCustomers;
	}

	public long getTotalRestaurants() {
		return totalRestaurants;
	}

	public void setTotalRestaurants(long totalRestaurants) {
		this.totalRestaurants = totalRestaurants;
	}

	public long getTotalFoods() {
		return totalFoods;
	}

	public void setTotalFoods(long totalFoods) {
		this.totalFoods = totalFoods;
	}

	public long getTotalOrders() {
		return totalOrders;
	}

	public void setTotalOrders(long totalOrders) {
		this.totalOrders = totalOrders;
	}

	public long getPendingOrders() {
		return pendingOrders;
	}

	public void setPendingOrders(long pendingOrders) {
		this.pendingOrders = pendingOrders;
	}

	public long getConfirmedOrders() {
		return confirmedOrders;
	}

	public void setConfirmedOrders(long confirmedOrders) {
		this.confirmedOrders = confirmedOrders;
	}

	public long getPreparingOrders() {
		return preparingOrders;
	}

	public void setPreparingOrders(long preparingOrders) {
		this.preparingOrders = preparingOrders;
	}

	public long getOutForDeliveryOrders() {
		return outForDeliveryOrders;
	}

	public void setOutForDeliveryOrders(long outForDeliveryOrders) {
		this.outForDeliveryOrders = outForDeliveryOrders;
	}

	public long getDeliveredOrders() {
		return deliveredOrders;
	}

	public void setDeliveredOrders(long deliveredOrders) {
		this.deliveredOrders = deliveredOrders;
	}

	public long getCancelledOrders() {
		return cancelledOrders;
	}

	public void setCancelledOrders(long cancelledOrders) {
		this.cancelledOrders = cancelledOrders;
	}

	public Double getTotalRevenue() {
		return totalRevenue;
	}

	public void setTotalRevenue(Double totalRevenue) {
		this.totalRevenue = totalRevenue;
	}

    

}