package com.devsuperior.dscatalog.tests.services;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Product;
import com.devsuperior.dscatalog.repositories.ProductRepository;
import com.devsuperior.dscatalog.services.ProductService;
import com.devsuperior.dscatalog.services.exceptions.DatabaseException;
import com.devsuperior.dscatalog.services.exceptions.ResourceNotFoundException;
import com.devsuperior.dscatalog.tests.factory.ProductFactory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {

	@InjectMocks
	private ProductService service;
	
	@Mock() 
	private ProductRepository repository;
	
	private long existingId;
	private long nonExistingId;
	private long dependentId;
	private Product product;
	private ProductDTO productDto;
	private PageImpl<Product> page;
	private PageImpl<ProductDTO> pageDto;
	
	@BeforeEach
	void setup() throws Exception{
		existingId = 1L;
		nonExistingId = 1000L;
		dependentId = 4L;
		product = ProductFactory.createProduct();
		productDto = ProductFactory.createProductDto();
		page = new PageImpl<>(List.of(product));
		pageDto = new PageImpl<>(List.of(productDto));
		
		
		Mockito.when(service.findAllPaged(ArgumentMatchers.any(), ArgumentMatchers.anyString(),ArgumentMatchers.any()))
		.thenReturn(pageDto);
		
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);
		
		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product));
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());
		
		Mockito.when(service.findById(existingId)).thenReturn(productDto);
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());
		
		
		Mockito.doNothing().when(service).update(existingId, productDto);
		Mockito.doThrow(ResourceNotFoundException.class).when(service).update(nonExistingId, productDto);
		
		Mockito.doNothing().when(repository).deleteById(existingId);
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
	}
	
	/*
	@Test
	public void deleteShouldThrowDataBaseExceptionWhenIdD() {
		
		Assertions.assertThrows(DatabaseException.class, () -> {
			service.delete(dependentId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
	}
	
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);
	}*/
}
