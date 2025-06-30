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

import com.payrollmanagement.easypay.enums.City;
import com.payrollmanagement.easypay.enums.States;
import com.payrollmanagement.easypay.exception.ResourceNotFoundException;
import com.payrollmanagement.easypay.model.Company;
import com.payrollmanagement.easypay.repository.CompanyRepository;
import com.payrollmanagement.easypay.service.CompanyService;

@SpringBootTest
public class CompanyServiceTest {

    @InjectMocks
    private CompanyService companyService;

    @Mock
    private CompanyRepository companyRepository;

    private Company company;

    @BeforeEach
    public void init() {
        company = new Company();
        company.setId(1);
        company.setName("Test Company");
        company.setPan("PAN123");
        company.setTan("TAN456");
        company.setEmail("test@company.com");
        company.setWebsite("www.testcompany.com");
        company.setAddress("Test Address");
        company.setCity(City.Chennai); 
        company.setState(States.TamilNadu); 
        company.setPfCode("PF001");
        company.setEsiCode("ESI001");
        company.setPtCode("PT001");
        company.setIsActive(true);
        System.out.println("Company object created at " + company);
    }

    @Test
    public void addCompanyTest() {
        when(companyRepository.save(company)).thenReturn(company);
        Company result = companyService.addCompany(company);
        assertEquals(company, result);
    }

    @Test
    public void getCompanyByIdTest() {
        when(companyRepository.findById(1)).thenReturn(Optional.of(company));
        Company result = companyService.getCompanyById(1);
        assertEquals(company, result);
    }

    @Test
    public void getCompanyByIdNotFoundTest() {
        when(companyRepository.findById(2)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class, () -> companyService.getCompanyById(2));
        assertEquals("Company Not Found".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void updateCompanyTest() {
        Company updated = new Company();
        updated.setName("Updated Company");
        updated.setPan("NEWPAN");
        updated.setTan("NEWTAN");
        updated.setEmail("updated@company.com");
        updated.setWebsite("www.updated.com");
        updated.setAddress("New Address");
        updated.setCity(City.Chennai); 
        updated.setState(States.TamilNadu); 
        updated.setPfCode("NEWPF");
        updated.setEsiCode("NEWESI");
        updated.setPtCode("NEWPT");
        updated.setIsActive(false);

        when(companyRepository.findById(1)).thenReturn(Optional.of(company));
        when(companyRepository.save(company)).thenReturn(company);

        Company result = companyService.updateCompany(1, updated);

        assertEquals("Updated Company", result.getName());
        assertEquals("NEWPAN", result.getPan());
        assertEquals("NEWTAN", result.getTan());
        assertEquals("updated@company.com", result.getEmail());
        assertEquals("www.updated.com", result.getWebsite());
        assertEquals("New Address", result.getAddress());
        assertEquals(City.Chennai, result.getCity());
        assertEquals(States.TamilNadu, result.getState());
        assertEquals("NEWPF", result.getPfCode());
        assertEquals("NEWESI", result.getEsiCode());
        assertEquals("NEWPT", result.getPtCode());
        assertEquals(false, result.getIsActive());
    }

    @Test
    public void updateCompanyNotFoundTest() {
        Company updated = new Company();
        when(companyRepository.findById(2)).thenReturn(Optional.empty());
        ResourceNotFoundException e = assertThrows(ResourceNotFoundException.class,
                () -> companyService.updateCompany(2, updated));
        assertEquals("Company Id Invalid".toLowerCase(), e.getMessage().toLowerCase());
    }

    @Test
    public void getAllCompaniesTest() {
        List<Company> expectedList = List.of(company);
        when(companyRepository.findAll()).thenReturn(expectedList);
        List<Company> actualList = companyService.getAll();
        assertEquals(expectedList, actualList);
    }

    @AfterEach
    public void afterTest() {
        company = null;
        System.out.println("Company object released.." + company);
    }
}