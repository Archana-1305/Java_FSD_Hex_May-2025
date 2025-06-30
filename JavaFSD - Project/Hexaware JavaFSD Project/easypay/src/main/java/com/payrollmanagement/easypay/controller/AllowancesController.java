package com.payrollmanagement.easypay.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payrollmanagement.easypay.model.Allowances;
import com.payrollmanagement.easypay.service.AllowancesService;

@RestController
@RequestMapping("/api/allowance")
@CrossOrigin(origins = "http://localhost:5173")
public class AllowancesController {

    @Autowired
    private AllowancesService allowancesService;

    private Logger logger = LoggerFactory.getLogger("AllowanceController");

    /* AIM      : To add a new Allowance for a company
     * PATH     : /api/allowance/add/{companyId}
     * METHOD   : POST
     * PARAM    : @PathVariable int companyId, @RequestBody Allowances allowance
     * RESPONSE : Saved Allowance
     * */
    @PostMapping("/add/{companyId}")
    public ResponseEntity<?> addAllowance(@PathVariable int companyId, @RequestBody Allowances allowance) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(allowancesService.addAllowance(companyId, allowance));
    }

    /* AIM      : To get Allowance by ID
     * PATH     : /api/allowance/getById/{id}
     * METHOD   : GET
     * PARAM    : @PathVariable int id
     * RESPONSE : Allowance Details
     * */
    @GetMapping("/getById/{id}")
    public ResponseEntity<?> getById(@PathVariable int id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(allowancesService.getById(id));
    }

    /* AIM      : To update Allowance by ID
     * PATH     : /api/allowance/update/{id}
     * METHOD   : PUT
     * PARAM    : @PathVariable int id, @RequestBody Allowances updated
     * RESPONSE : Updated Allowance
     * */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAllowance(@PathVariable int id, @RequestBody Allowances updated) {
        logger.info("Updating Allowance with ID: " + id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(allowancesService.updateAllowance(id, updated));
    }

    /* AIM      : To get all active Allowances of a Company
     * PATH     : /api/allowance/getAll/{companyId}
     * METHOD   : GET
     * PARAM    : @PathVariable int companyId
     * RESPONSE : List of Allowances
     * */
    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(allowancesService.getAll());
    }
    
    /* AIM      : To fetch all Allowances for a given Company ID
     * PATH     : /api/allowances/getByCompanyId/{companyId}
     * METHOD   : GET
     * PARAM    : @PathVariable int companyId
     * RESPONSE : List of Allowances for the specified company
     */
    @GetMapping("/getByCompanyId/{companyId}")
    public ResponseEntity<?> getByCompanyId(@PathVariable int companyId) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(allowancesService.getByCompanyId(companyId));
    }
    
}