package com.payrollmanagement.easypay.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payrollmanagement.easypay.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Integer> {

}
