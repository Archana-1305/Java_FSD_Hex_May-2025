package com.payrollmanagement.easypay.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.payrollmanagement.easypay.enums.TaxRegime;
import com.payrollmanagement.easypay.exception.DuplicateResourceException;
import com.payrollmanagement.easypay.model.IncomeTaxSlab;
import com.payrollmanagement.easypay.repository.IncomeTaxSlabRepository;

@Service
public class IncomeTaxSlabService {
	 private IncomeTaxSlabRepository incomeTaxSlabRepository;

	    public IncomeTaxSlabService(IncomeTaxSlabRepository incomeTaxSlabRepository) {
	        this.incomeTaxSlabRepository = incomeTaxSlabRepository;
	    }

	   
	    public List<IncomeTaxSlab> addIncomeTaxSlabs(List<IncomeTaxSlab> slabs) {
	        if (slabs == null || slabs.isEmpty()) {
	            throw new IllegalArgumentException("Tax slab list cannot be empty.");
	        }

	        // All slabs in a batch should have the same year and regime
	        String financialYear = slabs.get(0).getFinancialYear();
	        TaxRegime taxRegime = slabs.get(0).getTaxRegime();

	        // Check if slabs for this year and regime already exist
	        if (!incomeTaxSlabRepository.findByFinancialYearAndTaxRegime(financialYear, taxRegime).isEmpty()) {
	            throw new DuplicateResourceException("Income tax slabs for financial year '" + financialYear +
	                    "' and regime '" + taxRegime + "' already exist.");
	        }

	        return incomeTaxSlabRepository.saveAll(slabs);
	    }

	    
	    public List<IncomeTaxSlab> getSlabsByYearAndRegime(String financialYear, TaxRegime taxRegime) {
	        return incomeTaxSlabRepository.findByFinancialYearAndTaxRegime(financialYear, taxRegime);
	    }


		public List<IncomeTaxSlab> getAllIncomeTaxSlab() {
			// TODO Auto-generated method stub
			return incomeTaxSlabRepository.findAll();
		}
}
