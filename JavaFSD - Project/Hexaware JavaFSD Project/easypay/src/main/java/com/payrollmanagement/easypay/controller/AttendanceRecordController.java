package com.payrollmanagement.easypay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.payrollmanagement.easypay.dto.AttendanceRecordResponse;
import com.payrollmanagement.easypay.dto.BulkAttendanceRequest;
import com.payrollmanagement.easypay.dto.BulkAttendanceUpdateRequest;
import com.payrollmanagement.easypay.model.AttendanceRecord;
import com.payrollmanagement.easypay.service.AttendanceRecordService;

@RestController
@RequestMapping("/api/attendance-records")
@CrossOrigin(origins = "http://localhost:5173")
public class AttendanceRecordController {

    private AttendanceRecordService attendanceRecordService;
  
    public AttendanceRecordController(AttendanceRecordService attendanceRecordService) {
    	this.attendanceRecordService = attendanceRecordService;
    }
    

    /* AIM      : To fetch an Attendance Record by its ID
     * PATH     : /api/attendance-records/{id}
     * METHOD   : GET
     * PARAM    : @PathVariable int id
     * RESPONSE : AttendanceRecord details for the given ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getAttendanceRecordById(@PathVariable int id) {
    	return ResponseEntity
    			.status(HttpStatus.OK)
    			.body(attendanceRecordService.getAttendanceRecordById(id));
    }

    /* AIM      : To fetch all Attendance Records
     * PATH     : /api/attendance-records
     * METHOD   : GET
     * PARAM    : None
     * RESPONSE : List of all AttendanceRecord entries
     */
    @GetMapping
    public ResponseEntity<?> getAllAttendanceRecords() {
    	return ResponseEntity
    			.status(HttpStatus.OK)
    			.body(attendanceRecordService.getAllAttendanceRecords());
    }

   
    
    /* AIM      : To save bulk Attendance Records for multiple employees
     * PATH     : /api/attendance-records/bulk
     * METHOD   : POST
     * PARAM    : @RequestBody BulkAttendanceRequest request
     * RESPONSE : Success message after saving attendance
     */
    @PostMapping("/bulk")
    public ResponseEntity<?> saveBulkAttendance(@RequestBody BulkAttendanceRequest request) {
    	attendanceRecordService.saveBulkAttendance(request);
    	return ResponseEntity.ok().body("{\"msg\": \"Attendance saved successfully\"}");
    }
    
    
    /* AIM      : To fetch bulk Attendance Records based on Department, Month, and Year
     * PATH     : /api/attendance-records/getBulk
     * METHOD   : GET
     * PARAM    : @RequestParam Integer departmentId, @RequestParam Integer month, @RequestParam Integer year
     * RESPONSE : List of AttendanceRecordResponse for the specified filters
     */
    @GetMapping("/getBulk")
    public List<AttendanceRecordResponse> getAttendance(
            @RequestParam Integer departmentId,
            @RequestParam Integer month,
            @RequestParam Integer year
    ) {
    	return attendanceRecordService.getAttendanceByDepartmentMonthYear(departmentId, month, year);
    }
    
    
    /* AIM      : To update bulk Attendance Records for multiple employees
     * PATH     : /api/attendance-records/bulkUpdate
     * METHOD   : PUT
     * PARAM    : @RequestBody BulkAttendanceUpdateRequest request
     * RESPONSE : Success message after updating attendance
     */
    @PutMapping("/bulkUpdate")
    public ResponseEntity<?> updateBulkAttendance(@RequestBody BulkAttendanceUpdateRequest request) {
    	attendanceRecordService.updateBulkAttendance(request);
    	return ResponseEntity.ok().body("{\"msg\": \"Attendance updated successfully\"}");
    }
    
    
}