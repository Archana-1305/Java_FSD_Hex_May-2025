package com.payrollmanagement.easypay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.payrollmanagement.easypay.enums.PayrollRunStatus;
import com.payrollmanagement.easypay.model.PayrollRun;
import com.payrollmanagement.easypay.model.Payslip;
import com.payrollmanagement.easypay.service.PayrollRunService;

@RestController
@RequestMapping("/api/payroll")
@CrossOrigin(origins = "http://localhost:5173")
public class PayrollRunController {
    @Autowired
    private PayrollRunService payrollRunService;

    /* AIM      : To execute a full Payroll Run for all departments
     * PATH     : /api/payroll-run/run
     * METHOD   : POST
     * PARAM    : @RequestParam int month, @RequestParam int year, @RequestParam int policyId
     * RESPONSE : Generated PayrollRun details
     */
    @PostMapping("/run")
    public ResponseEntity<PayrollRun> runPayroll(@RequestParam int month, @RequestParam int year, @RequestParam int policyId) {
    	PayrollRun run = payrollRunService.executePayrollRun(month, year, policyId);
    	return ResponseEntity.ok(run);
    }

    /* AIM      : To update the status of a Payroll Run by its ID
     * PATH     : /api/payroll-run/{id}/status
     * METHOD   : PUT
     * PARAM    : @PathVariable int id, @RequestParam PayrollRunStatus status
     * RESPONSE : Updated PayrollRun with new status
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<PayrollRun> updateStatus(@PathVariable int id, @RequestParam PayrollRunStatus status) {
    	PayrollRun run = payrollRunService.updateStatus(id, status);
    	return ResponseEntity.ok(run);
    }

    /* AIM      : To execute a Payroll Run for a specific department
     * PATH     : /api/payroll-run/run-by-department
     * METHOD   : POST
     * PARAM    : @RequestParam int month, int year, int policyId, int departmentId
     * RESPONSE : Generated PayrollRun for the specified department
     */
    @PostMapping("/run-by-department")
    public ResponseEntity<PayrollRun> runPayrollByDepartment(
            @RequestParam int month,
            @RequestParam int year,
            @RequestParam int policyId,
            @RequestParam int departmentId) {
    	PayrollRun run = payrollRunService.executePayrollRunByDepartment(month, year, policyId, departmentId);
    	return ResponseEntity.ok(run);
    }

    /* AIM      : To revise Payroll for a specific department and month
     * PATH     : /api/payroll-run/revise
     * METHOD   : POST
     * PARAM    : @RequestParam int month, int year, int departmentId
     * RESPONSE : List of revised payslips or confirmation message
     */
    @PostMapping("/revise")
    public ResponseEntity<?> revisePayroll(@RequestParam int month,
                                           @RequestParam int year,
                                           @RequestParam int departmentId) {
    	return ResponseEntity.ok(payrollRunService.revisePayroll(month, year, departmentId));
    }

    /* AIM      : To fetch all Payslips for revision by department and period
     * PATH     : /api/payroll-run/revise/payslips
     * METHOD   : GET
     * PARAM    : @RequestParam int month, int year, int departmentId
     * RESPONSE : List of Payslips eligible for revision
     */
    @GetMapping("/revise/payslips")
    public ResponseEntity<List<Payslip>> getPayslipsForRevision(
            @RequestParam int month,
            @RequestParam int year,
            @RequestParam int departmentId) {
    	return ResponseEntity.ok(payrollRunService.getPayslipsForRevision(month, year, departmentId));
    }

    /* AIM      : To revise a single Payslip by its ID
     * PATH     : /api/payroll-run/revise/payslip/{payslipId}
     * METHOD   : POST
     * PARAM    : @PathVariable int payslipId
     * RESPONSE : Success message after revising the payslip
     */
    @PostMapping("/revise/payslip/{payslipId}")
    public ResponseEntity<String> revisePayslip(@PathVariable int payslipId) {
    	payrollRunService.revisePayslip(payslipId);
    	return ResponseEntity.ok("Payslip revised successfully.");
    }

    /* AIM      : To fetch all Payroll Run entries
     * PATH     : /api/payroll-run/getAllPayruns
     * METHOD   : GET
     * PARAM    : None
     * RESPONSE : List of all PayrollRun records
     */
    @GetMapping("/getAllPayruns")
    public ResponseEntity<?> getAllPayruns () {
    	return ResponseEntity
    			.status(HttpStatus.OK)
    			.body(payrollRunService.getAllPayruns());
    }

}