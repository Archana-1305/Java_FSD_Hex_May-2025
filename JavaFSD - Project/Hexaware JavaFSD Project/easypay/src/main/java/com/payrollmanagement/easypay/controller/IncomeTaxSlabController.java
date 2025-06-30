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

import com.payrollmanagement.easypay.enums.TaxRegime;
import com.payrollmanagement.easypay.model.IncomeTaxSlab;
import com.payrollmanagement.easypay.service.IncomeTaxSlabService;

@RestController
@RequestMapping("/api/tax-slabs/income")
@CrossOrigin(origins = "http://localhost:5173")
public class IncomeTaxSlabController {
	
	@Autowired
    private IncomeTaxSlabService incomeTaxSlabService;
    private final Logger logger = LoggerFactory.getLogger(IncomeTaxSlabController.class);

    /* AIM      : To add a batch of Income Tax Slabs
     * PATH     : /api/income-tax-slab/add-batch
     * METHOD   : POST
     * PARAM    : @RequestBody List<IncomeTaxSlab> incomeTaxSlab
     * RESPONSE : List of saved IncomeTaxSlab entries
     */
    @PostMapping("/add-batch")
    public ResponseEntity<?> addIncomeTaxSlabs(@RequestBody List<IncomeTaxSlab> incomeTaxSlab) {
    	return ResponseEntity 
    			.status(HttpStatus.OK)
    			.body(incomeTaxSlabService.addIncomeTaxSlabs(incomeTaxSlab));
    }

    /* AIM      : To fetch Income Tax Slabs by Financial Year and Tax Regime
     * PATH     : /api/income-tax-slab/get
     * METHOD   : GET
     * PARAM    : @RequestParam String financialYear, @RequestParam TaxRegime taxRegime
     * RESPONSE : List of matching IncomeTaxSlab entries
     */
    @GetMapping("/get")
    public ResponseEntity<?> getSlabsByYearAndRegime(
            @RequestParam String financialYear,
            @RequestParam TaxRegime taxRegime) {
    	logger.info("Request to fetch income tax slabs for year: " + financialYear + " and regime: " + taxRegime);
    	return ResponseEntity
    			.status(HttpStatus.OK)
    			.body(incomeTaxSlabService.getSlabsByYearAndRegime(financialYear, taxRegime));
    }

    /* AIM      : To fetch all Income Tax Slabs
     * PATH     : /api/income-tax-slab/getAll
     * METHOD   : GET
     * PARAM    : None
     * RESPONSE : List of all IncomeTaxSlab records
     */
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllIncomeTaxSlab() {
    	return ResponseEntity
    			.status(HttpStatus.OK)
    			.body(incomeTaxSlabService.getAllIncomeTaxSlab());
    }

    

}
