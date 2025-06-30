package com.payrollmanagement.easypay.controller;

import java.security.Principal;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.payrollmanagement.easypay.model.Employee;
import com.payrollmanagement.easypay.service.EmployeeService;

@RestController
@RequestMapping("/api/employee")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {
	
	@Autowired
    private EmployeeService employeeService;

    private Logger logger = LoggerFactory.getLogger("EmployeeController");
    
    @PostMapping("/add/{departmentId}/{designationId}/{companyId}")
    public Employee addEmployee(@PathVariable int departmentId,
                                @PathVariable int designationId,
                                @PathVariable int companyId,
                                @RequestBody Employee employee) {
        logger.info("Adding new employee to department: {}, designation: {}, company: {}", departmentId, designationId, companyId);
        return employeeService.addEmployee(employee, departmentId, designationId, companyId);
    }
    
    /* AIM      : To add a new Employee under a specific Designation
     * PATH     : /api/employee/add/{designationId}
     * METHOD   : POST
     * PARAM    : @PathVariable int designationId, @RequestBody Employee employee
     * RESPONSE : Employee with saved details under the given designation
     */
    @PostMapping("/add/{designationId}")
    public Employee insertEmployee(@PathVariable int designationId, @RequestBody Employee employee) {
    	logger.info("Adding new employee to designation: {}", designationId);
    	return employeeService.insertEmployee(designationId, employee);
    }
    
    /* AIM      : To fetch all Employees in the system
     * PATH     : /api/employee/getAll
     * METHOD   : GET
     * PARAM    : None
     * RESPONSE : List of all Employees
     */
    @GetMapping("/getAll")
    public ResponseEntity<List<Employee>> getAllEmployees() {
    	return ResponseEntity
    			.status(HttpStatus.OK)
    			.body(employeeService.getAllEmployees());
    }
    
    /* AIM      : To fetch all Employees under a specific Designation
     * PATH     : /api/employee/getByDesignationId/{designationId}
     * METHOD   : GET
     * PARAM    : @PathVariable int designationId
     * RESPONSE : List of Employees for the given designation
     */
    @GetMapping("/getByDesignationId/{designationId}")
    public ResponseEntity<?> getEmployeesByDesignationId(@PathVariable int designationId) {
    	logger.info("Fetching employees for designation id: " + designationId);
    	return ResponseEntity
    			.status(HttpStatus.OK)
    			.body(employeeService.getEmployeesByDesignationId(designationId));
    }
    
    /* AIM      : To fetch all Employees under a specific Department
     * PATH     : /api/employee/getByDepartmentId/{departmentId}
     * METHOD   : GET
     * PARAM    : @PathVariable int departmentId
     * RESPONSE : List of Employees for the given department
     */
    @GetMapping("/getByDepartmentId/{departmentId}")
    public ResponseEntity<?> getEmployeesByDepartmentId(@PathVariable int departmentId) {
    	logger.info("Fetching employees for department id: " + departmentId);
    	return ResponseEntity
    			.status(HttpStatus.OK)
    			.body(employeeService.getEmployeesByDepartmentId(departmentId));
    }

   

    /* AIM      : To fetch all Employees under a specific Company
     * PATH     : /api/employee/getByCompanyId/{companyId}
     * METHOD   : GET
     * PARAM    : @PathVariable int companyId
     * RESPONSE : List of Employees for the given Company ID
     */
    @GetMapping("/getByCompanyId/{companyId}")
    public ResponseEntity<?> getEmployeesByCompanyId(@PathVariable int companyId) {
    	logger.info("Fetching employees for company id: " + companyId);
    	return ResponseEntity
    			.status(HttpStatus.OK)
    			.body(employeeService.getEmployeesByCompanyId(companyId));
    }
    
    /* AIM      : To update an existing Employee by their ID
     * PATH     : /api/employee/update/{id}
     * METHOD   : PUT
     * PARAM    : @PathVariable int id, @RequestBody Employee updatedEmployee
     * RESPONSE : Updated Employee details
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable int id,
                                            @RequestBody Employee updatedEmployee) {
        logger.info("Updating employee id: " + id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(employeeService.updateEmployee(id, updatedEmployee));
    }
    
    /* AIM      : To perform a soft delete on an Employee by their ID
     * PATH     : /api/employee/delete/{id}
     * METHOD   : DELETE
     * PARAM    : @PathVariable int id
     * RESPONSE : Success message after marking the employee as deleted
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> softDeleteEmployee(@PathVariable int id) {
        logger.info("Soft deleting employee with id: {}", id);
        employeeService.softDeleteEmployee(id);
        return ResponseEntity.ok("Employee marked as deleted");
    }
    
    /* AIM      : To fetch details of the currently logged-in Employee
     * PATH     : /api/employee/get
     * METHOD   : GET
     * PARAM    : Principal principal
     * RESPONSE : Logged-in Employee details
     */
    @GetMapping("/get")
    public Employee getMyInfo(Principal principal) {
        return employeeService.getEmployeeInfo(principal.getName());
    }

    

    
}
