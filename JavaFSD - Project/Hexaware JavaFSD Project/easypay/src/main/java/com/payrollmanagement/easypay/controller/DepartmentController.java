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

import com.payrollmanagement.easypay.model.Department;
import com.payrollmanagement.easypay.service.DepartmentService;

@RestController
@RequestMapping("/api/department")
@CrossOrigin(origins = "http://localhost:5173")
public class DepartmentController {

	@Autowired
	private DepartmentService departmentService;

	private Logger logger = LoggerFactory.getLogger("DepartmentController");

	/* AIM      : To add a new Department under a specific Company
	 * PATH     : /api/department/add/{companyId}
	 * METHOD   : POST
	 * PARAM    : @PathVariable int companyId, @RequestBody Department department
	 * RESPONSE : Department with saved details under the given company
	 */
	@PostMapping("/add/{companyId}")
	public ResponseEntity<?> addDepartment(@PathVariable int companyId, 
			@RequestBody Department department) {
		logger.info("Adding department to company: " + companyId);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(departmentService.addDepartment(companyId, department));
	}
	
	/* AIM      : To fetch all Departments available in the system
	 * PATH     : /api/department/getAll
	 * METHOD   : GET
	 * PARAM    : None
	 * RESPONSE : List of all Departments
	 */
	@GetMapping("/getAll")
	public ResponseEntity<?> getAllDepartments() {
		return ResponseEntity
        		.status(HttpStatus.OK)
        		.body(departmentService.getAllDepartments());	
	}
	
	/* AIM      : To fetch a Department by its ID
	 * PATH     : /api/department/getById/{id}
	 * METHOD   : GET
	 * PARAM    : @PathVariable int id
	 * RESPONSE : Department details for the given ID
	 */
	@GetMapping("/getById/{id}")
    public ResponseEntity<?> getDepartmentById(@PathVariable int id) {
        logger.info("Fetching department by id: " + id);
        return ResponseEntity
        		.status(HttpStatus.OK)
        		.body(departmentService.getDepartmentById(id));
    }
	
	/* AIM      : To fetch all Departments under a specific Company
	 * PATH     : /api/department/getByCompanyId/{companyId}
	 * METHOD   : GET
	 * PARAM    : @PathVariable int companyId
	 * RESPONSE : List of Departments for the specified Company ID
	 */
	@GetMapping("/getByCompanyId/{companyId}")
    public ResponseEntity<?> getDepartmentsByCompanyId(@PathVariable int companyId) {
        logger.info("Fetching departments for company id: " + companyId);
        return ResponseEntity
        		.status(HttpStatus.OK)
        		.body(departmentService.getDepartmentsByCompanyId(companyId));      		
    }
	
	/* AIM      : To update an existing Department by its ID
	 * PATH     : /api/department/update/{id}
	 * METHOD   : PUT
	 * PARAM    : @PathVariable int id, @RequestBody Department updatedDept
	 * RESPONSE : Updated Department details
	 */
	@PutMapping("/update/{id}")
    public ResponseEntity<?> updateDepartment(@PathVariable int id, @RequestBody Department updatedDept) {
        logger.info("Updating department id: " + id);
        return ResponseEntity
        		.status(HttpStatus.OK)
        		.body(departmentService.updateDepartment(id, updatedDept)); 
    }
	
	/* AIM      : To perform a simulated delete of a Department by its ID
	 * PATH     : /api/department/delete/{id}
	 * METHOD   : DELETE
	 * PARAM    : @PathVariable int id
	 * RESPONSE : Success message after simulated deletion
	 */
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> simulateDeleteDepartment(@PathVariable int id) {
	    logger.info("Simulated delete for location ID: {}", id);
	    departmentService.simulateDeleteById(id);
	    return ResponseEntity.ok("Department deleted");
	}

}
