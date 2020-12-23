import React from 'react';
import { render, screen } from '@testing-library/react'
import ProductPrice from '../index'

describe('Tests with price greather then zero', () => {
    test('should render ProductPrice', () => {
        //arrange
        const price = 1200;
        //act
        render(
            <ProductPrice price={price} />
        )
        //assert
        const currencyElement = screen.getByText('R$');
        const priceElement = screen.getByText('1.200,00');
    
        expect(currencyElement).toBeInTheDocument();
        expect(priceElement).toBeInTheDocument();
    });

    test('should render ProductPrice without thousand separator', () => {
        //arrange
        const price = 100;
        //act
        render(
            <ProductPrice price={price} />
        )
        //assert
        const currencyElement = screen.getByText('R$');
        const priceElement = screen.getByText('100,00');
    
        expect(currencyElement).toBeInTheDocument();
        expect(priceElement).toBeInTheDocument();
    });
    
})


describe('Tests with price lower then zero', () => {
    test('should render ProductPrice with price equals zero', () => {
        //arrange
        const price = 0;
        //act
        render(
            <ProductPrice price={price} />
        )
        //assert
        const currencyElement = screen.getByText('R$');
        const priceElement = screen.getByText('0,00');
    
        expect(currencyElement).toBeInTheDocument();
        expect(priceElement).toBeInTheDocument();
    });
    
})