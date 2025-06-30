package com.payrollmanagement.easypay;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.payrollmanagement.easypay.exception.DesignationNotFoundException;
import com.payrollmanagement.easypay.exception.InvalidOperationException;
import com.payrollmanagement.easypay.exception.ResourceNotFoundException;
import com.payrollmanagement.easypay.model.Department;
import com.payrollmanagement.easypay.model.Designation;
import com.payrollmanagement.easypay.repository.DepartmentRepository;
import com.payrollmanagement.easypay.repository.DesignationRepository;
import com.payrollmanagement.easypay.service.DesignationService;

@SpringBootTest
public class DesignationServiceTest {

    @InjectMocks
    private DesignationService designationService;
    @Mock
    private DesignationRepository designationRepository;
    @Mock
    private DepartmentRepository departmentRepository;

    private Department department;
    private Designation designation;

    @BeforeEach
    public void init() {
        department = new Department();
        department.setId(2);
        department.setDepartmentName("IT");
        department.setDepartmentCode("IT01");
        department.setDescription("IT Dept");
        department.setIsActive(true);
        department.setIsDelete(false);

        designation = new Designation();
        designation.setId(10);
        designation.setDesignationName("Manager");
        designation.setDesignationCode("MNG01");
        designation.setDescription("Manages team");
        designation.setDepartment(department);
        designation.setCreatedOn(LocalDate.now());
        designation.setActive(true);
        designation.setIsDelete(false);

        System.out.println("department created at " + department);
        System.out.println("designation created at " + designation);
    }

    @Test
    public void addDesignationTest() {
        when(departmentRepository.findById(2)).thenReturn(Optional.of(department));
        when(designationRepository.save(designation)).thenReturn(designation);

        Designation result = designationService.addDesignation(2, designation);

        assertEquals(designation, result);
        assertEquals(department, result.getDepartment());
        assertEquals(true, result.isActive());
        assertEquals(false, result.getIsDelete());
    }

    @Test
    public void addDesignationDepartmentNotFoundTest() {
        when(departmentRepository.findById(99)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> designationService.addDesignation(99, designation));
        assertEquals("Department Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void addDesignationInactiveDepartmentTest() {
        department.setIsActive(false);
        when(departmentRepository.findById(2)).thenReturn(Optional.of(department));
        InvalidOperationException e = assertThrows(InvalidOperationException.class,
                () -> designationService.addDesignation(2, designation));
        assertEquals("Cannot add designation to an inactive department.".toLowerCase(),
                e.getMessage().toLowerCase());
    }

    @Test
    public void getAllDesignationsTest() {
        List<Designation> expectedList = List.of(designation);
        when(designationRepository.findAll()).thenReturn(expectedList);
        List<Designation> actualList = designationService.getAllDesignations();
        assertEquals(expectedList, actualList);
    }

    @Test
    public void getDesignationByIdTest() {
        when(designationRepository.findById(10)).thenReturn(Optional.of(designation));
        Designation result = designationService.getDesignationById(10);
        assertEquals(designation, result);
    }

    @Test
    public void getDesignationByIdNotFoundTest() {
        when(designationRepository.findById(99)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> designationService.getDesignationById(99));
        assertEquals("Designation Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void getDesignationsByDepartmentIdTest() {
        when(departmentRepository.findById(2)).thenReturn(Optional.of(department));
        List<Designation> expectedList = List.of(designation);
        when(designationRepository.findByDepartmentId(2)).thenReturn(expectedList);
        List<Designation> actualList = designationService.getDesignationsByDepartmentId(2);
        assertEquals(expectedList, actualList);
    }

    @Test
    public void getDesignationsByDepartmentId_DepartmentNotFoundTest() {
        when(departmentRepository.findById(99)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> designationService.getDesignationsByDepartmentId(99));
        assertEquals("Department Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void getDesignationsByDepartmentId_EmptyListTest() {
        when(departmentRepository.findById(2)).thenReturn(Optional.of(department));
        when(designationRepository.findByDepartmentId(2)).thenReturn(List.of());
        DesignationNotFoundException e = assertThrows(DesignationNotFoundException.class,
                () -> designationService.getDesignationsByDepartmentId(2));
        assertEquals("Designation not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void updateDesignationTest() {
        Designation updated = new Designation();
        updated.setDesignationName("Lead");
        updated.setDesignationCode("LEAD01");
        updated.setDescription("Leads team");
        updated.setFullTimeAllowed(true);
        updated.setMinFullTimeCtc(30000.0);
        updated.setMaxFullTimeCtc(70000.0);
        updated.setisPartTimeAllowed(false);
        updated.setMinPartTimeCtc(12000.0);
        updated.setMaxPartTimeCtc(20000.0);
        updated.setActive(false);

        when(designationRepository.findById(10)).thenReturn(Optional.of(designation));
        when(designationRepository.save(designation)).thenReturn(designation);

        Designation result = designationService.updateDesignation(10, updated);

        assertEquals("Lead", result.getDesignationName());
        assertEquals("LEAD01", result.getDesignationCode());
        assertEquals("Leads team", result.getDescription());
        assertEquals(true, result.getIsFullTimeAllowed());
        assertEquals(30000.0, result.getMinFullTimeCtc());
        assertEquals(70000.0, result.getMaxFullTimeCtc());
        assertEquals(false, result.isPartTimeAllowed());
        assertEquals(12000.0, result.getMinPartTimeCtc());
        assertEquals(20000.0, result.getMaxPartTimeCtc());
        assertEquals(false, result.isActive());
    }

    @Test
    public void updateDesignationNotFoundTest() {
        Designation updated = new Designation();
        when(designationRepository.findById(99)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> designationService.updateDesignation(99, updated));
        assertEquals("Designation Id Invalid".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void softDeleteDesignationTest() {
        when(designationRepository.findById(10)).thenReturn(Optional.of(designation));
        when(designationRepository.save(designation)).thenReturn(designation);

        designationService.softDeleteDesignation(10);
        assertEquals(true, designation.getIsDelete());
    }

    @Test
    public void softDeleteDesignationNotFoundTest() {
        when(designationRepository.findById(88)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> designationService.softDeleteDesignation(88));
        assertEquals("Designation Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @AfterEach
    public void afterTest() {
        department = null;
        designation = null;
        System.out.println("Department and Designation objects released.." + department + ", " + designation);
    }
}