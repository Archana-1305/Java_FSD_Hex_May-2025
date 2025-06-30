package com.payrollmanagement.easypay.model;

import com.payrollmanagement.easypay.enums.City;
import com.payrollmanagement.easypay.enums.States;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "company")
public class Company {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;
	private String pan;
	private String tan;
	private String email;
	private String website;
	
private String address;
	
	@Enumerated(EnumType.STRING)
	private City city;
	
	@Enumerated(EnumType.STRING)
    private States state;
	
    private String pfCode;
    private String esiCode;
    private String ptCode;
    private Boolean isActive;
    private Boolean isDelete=false;
	
	public int getId() { return id; }
	public void setId(int id) { this.id = id; }

	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

	public String getPan() { return pan; }
	public void setPan(String pan) { this.pan = pan; }

	public String getTan() { return tan; }
	public void setTan(String tan) { this.tan = tan; }

	public String getEmail() { return email; }
	public void setEmail(String email) { this.email = email; }

	public String getWebsite() { return website; }
	public void setWebsite(String website) { this.website = website; }
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public City getCity() {
		return city;
	}
	public void setCity(City city) {
		this.city = city;
	}
	public States getState() {
		return state;
	}
	public void setState(States state) {
		this.state = state;
	}
	public String getPfCode() {
		return pfCode;
	}
	public void setPfCode(String pfCode) {
		this.pfCode = pfCode;
	}
	public String getEsiCode() {
		return esiCode;
	}
	public void setEsiCode(String esiCode) {
		this.esiCode = esiCode;
	}
	public String getPtCode() {
		return ptCode;
	}
	public void setPtCode(String ptCode) {
		this.ptCode = ptCode;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public Boolean getIsDelete() {
		return isDelete;
	}
	public void setIsDelete(Boolean isDelete) {
		this.isDelete = isDelete;
	}

	
}
