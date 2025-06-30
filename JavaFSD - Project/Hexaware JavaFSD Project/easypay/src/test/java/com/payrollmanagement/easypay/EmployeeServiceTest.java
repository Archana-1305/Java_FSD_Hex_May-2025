package com.payrollmanagement.easypay;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.payrollmanagement.easypay.dto.EmployeeDto;
import com.payrollmanagement.easypay.enums.EmpStatus;
import com.payrollmanagement.easypay.enums.EmployeeType;
import com.payrollmanagement.easypay.enums.Gender;
import com.payrollmanagement.easypay.exception.InvalidOperationException;
import com.payrollmanagement.easypay.exception.ResourceNotFoundException;
import com.payrollmanagement.easypay.model.Company;
import com.payrollmanagement.easypay.model.Department;
import com.payrollmanagement.easypay.model.Designation;
import com.payrollmanagement.easypay.model.Employee;
import com.payrollmanagement.easypay.model.User;
import com.payrollmanagement.easypay.repository.CompanyRepository;
import com.payrollmanagement.easypay.repository.DepartmentRepository;
import com.payrollmanagement.easypay.repository.DesignationRepository;
import com.payrollmanagement.easypay.repository.EmployeeRepository;
import com.payrollmanagement.easypay.service.EmployeeService;
import com.payrollmanagement.easypay.service.UserService;

@SpringBootTest
public class EmployeeServiceTest {

    @InjectMocks
    private EmployeeService employeeService;

    @Mock
    private EmployeeRepository employeeRepository;
    @Mock
    private DepartmentRepository departmentRepository;
    @Mock
    private DesignationRepository designationRepository;
    @Mock
    private CompanyRepository companyRepository;
    @Mock
    private UserService userService;

    private Company company;
    private Department department;
    private Designation designation;
    private Employee employee;
    private User user;

    @BeforeEach
    public void init() {
        company = new Company();
        company.setId(3);
        company.setName("TestCo");

        department = new Department();
        department.setId(4);
        department.setDepartmentName("HR");
        department.setIsActive(true);

        designation = new Designation();
        designation.setId(5);
        designation.setDesignationName("Manager");
        designation.setActive(true);

        user = new User();
        user.setId(9);
        user.setUsername("empuser");
        user.setPassword("pass");

        employee = new Employee();
        employee.setId(6);
        employee.setFirst_name("Archana");
        employee.setLast_name("G V");
        employee.setEmployeeCode("E001");
        employee.setUser(user);
        employee.setDepartment(department);
        employee.setDesignation(designation);
        employee.setCompany(company);
        employee.setIsDelete(false);

        System.out.println("company created at " + company);
        System.out.println("department created at " + department);
        System.out.println("designation created at " + designation);
        System.out.println("user created at " + user);
        System.out.println("employee created at " + employee);
    }

    @Test
    public void addEmployeeTest() {
        when(userService.signUp(user)).thenReturn(user);
        when(departmentRepository.findById(4)).thenReturn(Optional.of(department));
        when(designationRepository.findById(5)).thenReturn(Optional.of(designation));
        when(companyRepository.findById(3)).thenReturn(Optional.of(company));
        when(employeeRepository.save(employee)).thenReturn(employee);

        Employee result = employeeService.addEmployee(employee, 4, 5, 3);

        assertEquals(employee, result);
        assertEquals(department, result.getDepartment());
        assertEquals(designation, result.getDesignation());
        assertEquals(company, result.getCompany());
        assertEquals(user, result.getUser());
        assertEquals(false, result.getIsDelete());
    }

    @Test
    public void addEmployeeDepartmentNotFoundTest() {
        when(departmentRepository.findById(44)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> employeeService.addEmployee(employee, 44, 5, 3));
        assertEquals("Department Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void addEmployeeDesignationNotFoundTest() {
        when(departmentRepository.findById(4)).thenReturn(Optional.of(department));
        when(designationRepository.findById(55)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> employeeService.addEmployee(employee, 4, 55, 3));
        assertEquals("Designation Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void addEmployeeCompanyNotFoundTest() {
        when(departmentRepository.findById(4)).thenReturn(Optional.of(department));
        when(designationRepository.findById(5)).thenReturn(Optional.of(designation));
        when(companyRepository.findById(33)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> employeeService.addEmployee(employee, 4, 5, 33));
        assertEquals("Company Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void addEmployeeInactiveDepartmentTest() {
        department.setIsActive(false);
        when(departmentRepository.findById(4)).thenReturn(Optional.of(department));
        when(designationRepository.findById(5)).thenReturn(Optional.of(designation));
        when(companyRepository.findById(3)).thenReturn(Optional.of(company));
        InvalidOperationException e = assertThrows(InvalidOperationException.class,
                () -> employeeService.addEmployee(employee, 4, 5, 3));
        assertEquals("Cannot add designation to an inactive department.".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void addEmployeeInactiveDesignationTest() {
        designation.setActive(false);
        when(departmentRepository.findById(4)).thenReturn(Optional.of(department));
        when(designationRepository.findById(5)).thenReturn(Optional.of(designation));
        when(companyRepository.findById(3)).thenReturn(Optional.of(company));
        InvalidOperationException e = assertThrows(InvalidOperationException.class,
                () -> employeeService.addEmployee(employee, 4, 5, 3));
        assertEquals("Cannot add designation to an inactive department.".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void getAllEmployeesTest() {
        List<Employee> expectedList = List.of(employee);
        when(employeeRepository.findAll()).thenReturn(expectedList);
        List<Employee> actualList = employeeService.getAllEmployees();
        assertEquals(expectedList, actualList);
    }

    @Test
    public void getEmployeesByDesignationIdTest() {
        when(designationRepository.findById(5)).thenReturn(Optional.of(designation));
        List<Employee> expectedList = List.of(employee);
        when(employeeRepository.getEmployeesByDesignationId(5)).thenReturn(expectedList);
        List<Employee> actualList = employeeService.getEmployeesByDesignationId(5);
        assertEquals(expectedList, actualList);
    }

    @Test
    public void getEmployeesByDesignationIdNotFoundTest() {
        when(designationRepository.findById(99)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> employeeService.getEmployeesByDesignationId(99));
        assertEquals("Designation Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void getEmployeesByDepartmentIdTest() {
        when(departmentRepository.findById(4)).thenReturn(Optional.of(department));
        List<Employee> expectedList = List.of(employee);
        when(employeeRepository.findByDepartmentId(4)).thenReturn(expectedList);
        List<Employee> actualList = employeeService.getEmployeesByDepartmentId(4);
        assertEquals(expectedList, actualList);
    }

    @Test
    public void getEmployeesByDepartmentIdNotFoundTest() {
        when(departmentRepository.findById(77)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> employeeService.getEmployeesByDepartmentId(77));
        assertEquals("Department Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void getEmployeesByCompanyIdTest() {
        when(companyRepository.findById(3)).thenReturn(Optional.of(company));
        List<Employee> empList = List.of(employee);
        when(employeeRepository.findByCompanyId(3)).thenReturn(empList);
        List<EmployeeDto> actualList = employeeService.getEmployeesByCompanyId(3);
        List<EmployeeDto> expectedList = EmployeeDto.convertEmployeeListToDto(empList);

        // Compare each field rather than relying on equals
        assertEquals(expectedList.size(), actualList.size());
        for (int i = 0; i < expectedList.size(); i++) {
            EmployeeDto expectedDto = expectedList.get(i);
            EmployeeDto actualDto = actualList.get(i);
            assertEquals(expectedDto.getId(), actualDto.getId());
            // add more field assertions as needed (e.g., name, code, etc.)
        }
    }

    @Test
    public void getEmployeesByCompanyIdNotFoundTest() {
        when(companyRepository.findById(33)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> employeeService.getEmployeesByCompanyId(33));
        assertEquals("Company Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void updateEmployeeTest() {
        Employee updated = new Employee();
        updated.setEmployeeCode("E002");
        updated.setFirst_name("UpdatedName");
        updated.setLast_name("UpdatedLast");
        updated.setGender(Gender.FEMALE);
        updated.setEmail("abc@xyz.com");
        updated.setContact("1234567890");
        updated.setAddress("Updated Address");
        updated.setDob("1990-01-01");
        updated.setEmp_type(EmployeeType.FULL_TIME);
        updated.setDate_of_joining("2020-01-01");
        updated.setDate_of_leaving("2022-01-01");
        updated.setStatus(EmpStatus.ACTIVE);
        updated.setCtcAmount(100000.0);
        updated.setBankName("Axis Bank");
        updated.setAccountNumber("00012345678");
        updated.setIfscCode("UTIB0000001");
        User newUser = new User();
        newUser.setId(10);
        updated.setUser(newUser);
        Designation newDesig = new Designation();
        newDesig.setId(6);
        updated.setDesignation(newDesig);
        Department newDept = new Department();
        newDept.setId(7);
        updated.setDepartment(newDept);
        Company newComp = new Company();
        newComp.setId(8);
        updated.setCompany(newComp);

        when(employeeRepository.findById(6)).thenReturn(Optional.of(employee));
        when(employeeRepository.save(employee)).thenReturn(employee);

        Employee result = employeeService.updateEmployee(6, updated);

        assertEquals("E002", result.getEmployeeCode());
        assertEquals("UpdatedName", result.getFirst_name());
        assertEquals("UpdatedLast", result.getLast_name());
        assertEquals(Gender.FEMALE, result.getGender());
        assertEquals("abc@xyz.com", result.getEmail());
        assertEquals("1234567890", result.getContact());
        assertEquals("Updated Address", result.getAddress());
        assertEquals("1990-01-01", result.getDob());
        assertEquals(EmployeeType.FULL_TIME, result.getEmp_type());
        assertEquals("2020-01-01", result.getDate_of_joining());
        assertEquals("2022-01-01", result.getDate_of_leaving());
        assertEquals(EmpStatus.ACTIVE, result.getStatus());
        assertEquals(100000.0, result.getCtcAmount());
        assertEquals("Axis Bank", result.getBankName());
        assertEquals("00012345678", result.getAccountNumber());
        assertEquals("UTIB0000001", result.getIfscCode());
        assertEquals(newUser, result.getUser());
        assertEquals(newDesig, result.getDesignation());
        assertEquals(newDept, result.getDepartment());
        assertEquals(newComp, result.getCompany());
    }

    @Test
    public void updateEmployeeNotFoundTest() {
        Employee updated = new Employee();
        when(employeeRepository.findById(77)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> employeeService.updateEmployee(77, updated));
        assertEquals("Employee Id Invalid".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void softDeleteEmployeeTest() {
        when(employeeRepository.findById(6)).thenReturn(Optional.of(employee));
        when(employeeRepository.save(employee)).thenReturn(employee);

        employeeService.softDeleteEmployee(6);
        assertEquals(true, employee.getIsDelete());
    }

    @Test
    public void softDeleteEmployeeNotFoundTest() {
        when(employeeRepository.findById(88)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> employeeService.softDeleteEmployee(88));
        assertEquals("Employee Id Invalid".toLowerCase(), e.getMessage().toLowerCase());
    }

    @AfterEach
    public void afterTest() {
        company = null;
        department = null;
        designation = null;
        employee = null;
        user = null;
        System.out.println("All objects released.." + company + department + designation + employee + user);
    }
}