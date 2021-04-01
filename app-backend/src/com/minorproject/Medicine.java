package com.minorproject;

public class Medicine {
	private String name;
	private int concentration;
	private String unit;
	private String expiry;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public int getConcentration() {
		return concentration;
	}
	public void setConcentration(int concentration) {
		this.concentration = concentration;
	}
	
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	
	public String getExpiry() {
		return expiry;
	}
	public void setExpiry(String expiry) {
		this.expiry = expiry;
	}
}
