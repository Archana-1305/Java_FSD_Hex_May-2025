package com.payrollmanagement.easypay.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.payrollmanagement.easypay.exception.ResourceNotFoundException;
import com.payrollmanagement.easypay.model.Allowances;
import com.payrollmanagement.easypay.model.Company;
import com.payrollmanagement.easypay.repository.AllowancesRepository;
import com.payrollmanagement.easypay.repository.CompanyRepository;

@Service
public class AllowancesService {

    private  AllowancesRepository allowancesRepository;
    private  CompanyRepository companyRepository;

    public AllowancesService(AllowancesRepository allowancesRepository, CompanyRepository companyRepository) {
        this.allowancesRepository = allowancesRepository;
        this.companyRepository = companyRepository;
    }

    // Add Allowance
    public Allowances addAllowance(int companyId, Allowances allowance) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company Not Found"));

        allowance.setCompany(company);
        return allowancesRepository.save(allowance);
    }

    // Get Allowance by ID
    public Allowances getById(int id) {
        return allowancesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Allowance Not Found"));
    }

    // Update Allowance
    public Allowances updateAllowance(int id, Allowances updated) {
        Allowances existing = allowancesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Allowance Not Found"));

        if (updated.getName() != null)
            existing.setName(updated.getName());

        if (updated.getDescription() != null)
            existing.setDescription(updated.getDescription());

        if (updated.getAssignToAll() != null)
            existing.setAssignToAll(updated.getAssignToAll());

        if (updated.getIsActive() != null)
            existing.setIsActive(updated.getIsActive());

        return allowancesRepository.save(existing);
    }

    // Get All Active Allowances for a Company
    public List<Allowances> getAll() {
        return allowancesRepository.findAll();
    }

    //Get By CompanyId
	public List<Allowances>  getByCompanyId(int companyId) {
		return allowancesRepository.getByCompanyId(companyId);
	}
}