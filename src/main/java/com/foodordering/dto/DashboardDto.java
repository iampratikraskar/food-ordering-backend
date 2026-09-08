package com.foodordering.dto;

public class DashboardDto {

    private long totalOrders;
    private long pendingOrders;
    private long confirmedOrders;
    private long preparingOrders;
    private long outForDeliveryOrders;
    private long deliveredOrders;
    private long cancelledOrders;

    private long totalRestaurants;
    private long totalCustomers;

    private Double totalRevenue;


    public DashboardDto() {
    }


    public DashboardDto(
            long totalOrders,
            long pendingOrders,
            long confirmedOrders,
            long preparingOrders,
            long outForDeliveryOrders,
            long deliveredOrders,
            long cancelledOrders,
            long totalRestaurants,
            long totalCustomers,
            Double totalRevenue) {

        this.totalOrders = totalOrders;
        this.pendingOrders = pendingOrders;
        this.confirmedOrders = confirmedOrders;
        this.preparingOrders = preparingOrders;
        this.outForDeliveryOrders = outForDeliveryOrders;
        this.deliveredOrders = deliveredOrders;
        this.cancelledOrders = cancelledOrders;
        this.totalRestaurants = totalRestaurants;
        this.totalCustomers = totalCustomers;
        this.totalRevenue = totalRevenue;
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

    public void setOutForDeliveryOrders(
            long outForDeliveryOrders) {

        this.outForDeliveryOrders =
                outForDeliveryOrders;
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


    public long getTotalRestaurants() {
        return totalRestaurants;
    }

    public void setTotalRestaurants(
            long totalRestaurants) {

        this.totalRestaurants =
                totalRestaurants;
    }


    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(
            long totalCustomers) {

        this.totalCustomers =
                totalCustomers;
    }


    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}