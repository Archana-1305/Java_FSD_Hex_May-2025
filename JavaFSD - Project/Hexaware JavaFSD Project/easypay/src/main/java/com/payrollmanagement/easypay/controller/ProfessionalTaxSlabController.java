package com.payrollmanagement.easypay.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.payrollmanagement.easypay.enums.States;
import com.payrollmanagement.easypay.model.ProfessionalTaxSlab;
import com.payrollmanagement.easypay.service.ProfessionalTaxSlabService;

@RestController
@RequestMapping("/api/tax-slabs/professional")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfessionalTaxSlabController {
	@Autowired
    private ProfessionalTaxSlabService professionalTaxSlabService;
    private final Logger logger = LoggerFactory.getLogger(ProfessionalTaxSlabController.class);
    
    @PostMapping("/add-batch")
    public ResponseEntity<?> addProfessionalTaxSlabs(@RequestBody List<ProfessionalTaxSlab> slabs) {
       
        return  ResponseEntity
        		.status(HttpStatus.CREATED)
        		.body(professionalTaxSlabService.addProfessionalTaxSlabs(slabs));
    }

    
    @GetMapping("/get")
    public ResponseEntity<?> getSlabsByStateAndYear(
            @RequestParam States state,
            @RequestParam String financialYear) {
        logger.info("Request to fetch professional tax slabs for state: " + state + " and year: " + financialYear);
        return ResponseEntity.status(HttpStatus.OK)
        		.body(professionalTaxSlabService.getSlabsByStateAndYear(state, financialYear));
    }
    
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllProfessionalTax(){
    	return ResponseEntity.status(HttpStatus.OK)
        		.body(professionalTaxSlabService.getAllProfessionalTax());
 
    	
    }
    


}
