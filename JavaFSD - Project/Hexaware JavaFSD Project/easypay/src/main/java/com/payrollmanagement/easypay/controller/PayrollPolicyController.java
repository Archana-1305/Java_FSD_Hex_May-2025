package com.payrollmanagement.easypay.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payrollmanagement.easypay.model.PayrollPolicy;
import com.payrollmanagement.easypay.service.PayrollPolicyService;

@RestController
@RequestMapping("/api/payroll-policy")
@CrossOrigin(origins = "http://localhost:5173")
public class PayrollPolicyController {
	
	@Autowired
	private PayrollPolicyService payrollPolicyService;

	private Logger logger = LoggerFactory.getLogger("PayrollPolicyController");
	
	/* AIM      : To add a new Payroll Policy for a specific Company
	 * PATH     : /api/payroll-policy/add/{companyId}
	 * METHOD   : POST
	 * PARAM    : @PathVariable int companyId, @RequestBody PayrollPolicy policy
	 * RESPONSE : Saved PayrollPolicy details for the company
	 */
	@PostMapping("/add/{companyId}")
	public ResponseEntity<?> addPayrollPolicy(@PathVariable int companyId, @RequestBody PayrollPolicy policy) {
		logger.info("Adding payroll policy for company: " + companyId);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(payrollPolicyService.addPayrollPolicy(companyId, policy));
	}

	/* AIM      : To fetch all Payroll Policies in the system
	 * PATH     : /api/payroll-policy/getAll
	 * METHOD   : GET
	 * PARAM    : None
	 * RESPONSE : List of all PayrollPolicy records
	 */
	@GetMapping("/getAll")
	public ResponseEntity<?> getAllPayrollPolicies() {
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(payrollPolicyService.getAllPayrollPolicies());
	}

	/* AIM      : To fetch a Payroll Policy by its ID
	 * PATH     : /api/payroll-policy/getById/{id}
	 * METHOD   : GET
	 * PARAM    : @PathVariable int id
	 * RESPONSE : PayrollPolicy details for the given ID
	 */
	@GetMapping("/getById/{id}")
	public ResponseEntity<?> getPayrollPolicyById(@PathVariable int id) {
		logger.info("Fetching payroll policy by id: " + id);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(payrollPolicyService.getPayrollPolicyById(id));
	}

	/* AIM      : To fetch all Payroll Policies for a specific Company
	 * PATH     : /api/payroll-policy/getByCompanyId/{companyId}
	 * METHOD   : GET
	 * PARAM    : @PathVariable int companyId
	 * RESPONSE : List of Payroll Policies for the given company
	 */
	@GetMapping("/getByCompanyId/{companyId}")
	public ResponseEntity<?> getPayrollPolicyByCompanyId(@PathVariable int companyId) {
		logger.info("Fetching payroll policy for company id: " + companyId);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(payrollPolicyService.getPayrollPolicyByCompanyId(companyId));
	}

	/* AIM      : To update an existing Payroll Policy by ID
	 * PATH     : /api/payroll-policy/update/{id}
	 * METHOD   : PUT
	 * PARAM    : @PathVariable int id, @RequestBody PayrollPolicy updatedPolicy
	 * RESPONSE : Updated PayrollPolicy details
	 */
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updatePayrollPolicy(@PathVariable int id, @RequestBody PayrollPolicy updatedPolicy) {
		logger.info("Updating payroll policy id: " + id);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(payrollPolicyService.updatePayrollPolicy(id, updatedPolicy));
	}

	/* AIM      : To perform a soft delete of a Payroll Policy by ID
	 * PATH     : /api/payroll-policy/delete/{id}
	 * METHOD   : DELETE
	 * PARAM    : @PathVariable int id
	 * RESPONSE : Success message after marking policy as deleted
	 */
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> softDeletePolicy(@PathVariable int id) {
		payrollPolicyService.softDeletePolicy(id);
		return ResponseEntity.ok("Policy marked as deleted");
	}


}
