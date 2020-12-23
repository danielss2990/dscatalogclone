import React from 'react';
import { render, screen } from '@testing-library/react'
import Buttonicon from '../index';

test('should hander ButtonIcon', () =>{
    
    const text = 'logar';

    render(
        <Buttonicon text={text} />
    );

    const textElement = screen.getByText(text);
    const iconElement = screen.getByTestId('arrow-icon');

    expect(textElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
});