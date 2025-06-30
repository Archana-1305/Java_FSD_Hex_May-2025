package com.payrollmanagement.easypay.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.payrollmanagement.easypay.enums.States;
import com.payrollmanagement.easypay.exception.DuplicateResourceException;
import com.payrollmanagement.easypay.model.ProfessionalTaxSlab;
import com.payrollmanagement.easypay.repository.ProfessionalTaxSlabRepository;

@Service
public class ProfessionalTaxSlabService {

	private ProfessionalTaxSlabRepository professionalTaxSlabRepository;

	public ProfessionalTaxSlabService(ProfessionalTaxSlabRepository professionalTaxSlabRepository) {
		this.professionalTaxSlabRepository = professionalTaxSlabRepository;
	}

	public List<ProfessionalTaxSlab> addProfessionalTaxSlabs(List<ProfessionalTaxSlab> slabs) {
		if (slabs == null || slabs.isEmpty()) {
			throw new IllegalArgumentException("Tax slab list cannot be empty.");
		}

		// All slabs in a batch should have the same state and year
		States state = slabs.get(0).getState();
		String financialYear = slabs.get(0).getFinancialYear();

		// Check if slabs for this state and year already exist
		if (!professionalTaxSlabRepository.findByStateAndFinancialYear(state, financialYear).isEmpty()) {
			throw new DuplicateResourceException("Professional tax slabs for state '" + state + "' and financial year '"
					+ financialYear + "' already exist.");
		}

		return professionalTaxSlabRepository.saveAll(slabs);
	}

	
	public List<ProfessionalTaxSlab> getSlabsByStateAndYear(States state, String financialYear) {
		return professionalTaxSlabRepository.findByStateAndFinancialYear(state, financialYear);
	}

	public List<ProfessionalTaxSlab> getAllProfessionalTax() {
		
		return professionalTaxSlabRepository.findAll();
	}

}
