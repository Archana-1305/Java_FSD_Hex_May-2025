package com.payrollmanagement.easypay;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.verify;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.payrollmanagement.easypay.dto.DepartmentDto;
import com.payrollmanagement.easypay.exception.DepartmentNotFoundException;
import com.payrollmanagement.easypay.exception.ResourceNotFoundException;
import com.payrollmanagement.easypay.model.Company;
import com.payrollmanagement.easypay.model.Department;
import com.payrollmanagement.easypay.repository.CompanyRepository;
import com.payrollmanagement.easypay.repository.DepartmentRepository;
import com.payrollmanagement.easypay.service.DepartmentService;

@SpringBootTest
public class DepartmentServiceTest {

    @InjectMocks
    private DepartmentService departmentService;

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    private CompanyRepository companyRepository;

    private Company company;
    private Department department;

    @BeforeEach
    public void init() {
        company = new Company();
        company.setId(1);
        company.setName("Test Company");

        department = new Department();
        department.setId(10);
        department.setDepartmentName("IT");
        department.setDepartmentCode("IT001");
        department.setDescription("Information Technology");
        department.setIsActive(true);
        department.setIsDelete(false);
        department.setCompany(company);
        department.setCreatedOn(LocalDate.now());

        System.out.println("Company object created at " + company);
        System.out.println("Department object created at " + department);
    }

    @Test
    public void addDepartmentTest() {
        when(companyRepository.findById(1)).thenReturn(Optional.of(company));
        when(departmentRepository.save(department)).thenReturn(department);

        Department result = departmentService.addDepartment(1, department);

        assertEquals(department, result);
        assertEquals(company, result.getCompany());
        assertEquals(true, result.getIsActive());
        assertEquals(false, result.getIsDelete());
    }

    @Test
    public void addDepartmentCompanyNotFoundTest() {
        when(companyRepository.findById(2)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> departmentService.addDepartment(2, department));
        assertEquals("Company Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void getAllDepartmentsTest() {
        List<Department> expectedList = List.of(department);
        when(departmentRepository.getAllDepartments()).thenReturn(expectedList);
        List<Department> actualList = departmentService.getAllDepartments();
        assertEquals(expectedList, actualList);
    }

    @Test
    public void getDepartmentByIdTest() {
        when(departmentRepository.findById(10)).thenReturn(Optional.of(department));
        DepartmentDto result = departmentService.getDepartmentById(10);
        assertEquals(department.getId(), result.getId());
        assertEquals(department.getDepartmentName(), result.getDepartmentName());
        assertEquals(department.getDepartmentCode(), result.getDepartmentCode());
    }

    @Test
    public void getDepartmentByIdNotFoundTest() {
        when(departmentRepository.findById(20)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> departmentService.getDepartmentById(20));
        assertEquals("Department Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void getDepartmentsByCompanyIdTest() {
        when(companyRepository.findById(1)).thenReturn(Optional.of(company));
        List<Department> expectedList = List.of(department);
        when(departmentRepository.getDepartmentsByCompanyId(1)).thenReturn(expectedList);
        List<Department> actualList = departmentService.getDepartmentsByCompanyId(1);
        assertEquals(expectedList, actualList);
    }

    @Test
    public void getDepartmentsByCompanyId_NotFoundTest() {
        when(companyRepository.findById(2)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> departmentService.getDepartmentsByCompanyId(2));
        assertEquals("Company Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void getDepartmentsByCompanyId_EmptyListTest() {
        when(companyRepository.findById(1)).thenReturn(Optional.of(company));
        when(departmentRepository.getDepartmentsByCompanyId(1)).thenReturn(List.of());
        DepartmentNotFoundException e = assertThrows(DepartmentNotFoundException.class,
                () -> departmentService.getDepartmentsByCompanyId(1));
        assertEquals("No Department Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void updateDepartmentTest() {
        Department updated = new Department();
        updated.setDepartmentName("HR");
        updated.setDepartmentCode("HR001");
        updated.setDescription("Human Resources");
        updated.setIsActive(false);

        when(departmentRepository.findById(10)).thenReturn(Optional.of(department));
        when(departmentRepository.save(department)).thenReturn(department);

        Department result = departmentService.updateDepartment(10, updated);

        assertEquals("HR", result.getDepartmentName());
        assertEquals("HR001", result.getDepartmentCode());
        assertEquals("Human Resources", result.getDescription());
        assertEquals(false, result.getIsActive());
    }

    @Test
    public void updateDepartmentNotFoundTest() {
        Department updated = new Department();
        when(departmentRepository.findById(11)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> departmentService.updateDepartment(11, updated));
        assertEquals("Department Id Invalid".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void simulateDeleteByIdTest() {
        when(departmentRepository.findById(10)).thenReturn(Optional.of(department));
        when(departmentRepository.save(department)).thenReturn(department);

        departmentService.simulateDeleteById(10);
        assertEquals(true, department.getIsDelete());
        verify(departmentRepository).save(department);
    }

    @Test
    public void simulateDeleteByIdNotFoundTest() {
        when(departmentRepository.findById(21)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> departmentService.simulateDeleteById(21));
        assertEquals("Department Id Invalid".toLowerCase(), e.getMessage().toLowerCase());
    }

    @AfterEach
    public void afterTest() {
        company = null;
        department = null;
        System.out.println("Company and Department objects released.." + company + ", " + department);
    }
}