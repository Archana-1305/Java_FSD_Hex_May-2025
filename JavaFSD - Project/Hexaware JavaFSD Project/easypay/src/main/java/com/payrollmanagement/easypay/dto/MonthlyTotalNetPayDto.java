package com.payrollmanagement.easypay.dto;

import java.util.List;

public class MonthlyTotalNetPayDto {
	 private int year;
	    private int month;
	    private double totalNetPay;

	    public MonthlyTotalNetPayDto(int year, int month, double totalNetPay) {
	        this.year = year;
	        this.month = month;
	        this.totalNetPay = totalNetPay;
	    }

	    // Getters and setters
	    public int getYear() { return year; }
	    public void setYear(int year) { this.year = year; }
	    public int getMonth() { return month; }
	    public void setMonth(int month) { this.month = month; }
	    public double getTotalNetPay() { return totalNetPay; }
	    public void setTotalNetPay(double totalNetPay) { this.totalNetPay = totalNetPay; }
	    }
