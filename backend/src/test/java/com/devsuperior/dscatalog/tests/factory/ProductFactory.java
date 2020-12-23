package com.devsuperior.dscatalog.tests.factory;

import java.time.Instant;

import com.devsuperior.dscatalog.dto.ProductDTO;
import com.devsuperior.dscatalog.entities.Category;
import com.devsuperior.dscatalog.entities.Product;

public class ProductFactory {
	
	
	public static Product createProduct() {
		String dateTime = "2020-07-14T10:06:58.147Z";
		Product product =  new Product(1L, "Phone", "Good Phone", 800.00,"https://img.com/img.png", Instant.parse(dateTime));
		product.getCategories().add(new Category(1L, null));
		return product;
	}
	
	public static Product createProductPriceNegative() {
		String dateTime = "2020-07-14T10:06:58.147Z";
		Product product =  new Product(1L, "Phone", "Good Phone", -800.00,"https://img.com/img.png", Instant.parse(dateTime));
		product.getCategories().add(new Category(1L, null));
		return product;
	}
	
	public static ProductDTO createProductDto() {
		/*String dateTime = "2020-07-14T10:06:58.147Z";
		return new ProductDTO(new Product(1L, "Phone", "Good Phone", 800.00,"https://img.com/img.png", Instant.parse(dateTime)));*/
		
		Product product = createProduct();
		return new ProductDTO(product, product.getCategories());
	}
	
	public static ProductDTO createProductDto(Long id) {
		ProductDTO dto = createProductDto();
		dto.setId(id);
		return dto;
		
	}
	
	public static ProductDTO createProductDtoNegative() {

		Product product = createProductPriceNegative();
		return new ProductDTO(product, product.getCategories());
	}
	

}
