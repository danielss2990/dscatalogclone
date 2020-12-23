import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Form from '../Form';
import { Router } from 'react-router-dom';
import history from 'core/utils/history';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { categoriesResponse } from './fixtures';
import { ToastContainer } from 'react-toastify'; 

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        productId:'create'
    })
}));

const server = setupServer(
    rest.get('http://localhost:8080/categories', (req, res, ctx) => {
      return res(ctx.json(categoriesResponse))
    }),
    rest.post('http://localhost:8080/categories', (req, res, ctx) => {
        return res(ctx.status(201))
      })
  );
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

test('should render Form', async () => {

    render(
        <Router history={history}>
            <ToastContainer />
            <Form />
        </Router>
    );

    const submitButton = screen.getByRole('button', { name:/salvar/i });

    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const descriptionInput = screen.getByTestId('description');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const categoriesInput = screen.getByLabelText('Categorias');

    userEvent.type(nameInput, 'Computador');
    await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);

    userEvent.type(priceInput, '5000');
    userEvent.type(imgUrlInput, 'image.jpg');
    userEvent.type(descriptionInput, 'ótimo computador');

    userEvent.click(submitButton);
    
    await await waitFor(() => expect(screen.getByText('Produto salvo com sucesso!')).toBeInTheDocument());
    expect(history.location.pathname).toBe('admin/products');
    expect(screen.getAllByText(/CADASTRAR UM PRODUTO/i)).toBeInTheDocument();
});

test('should render Form', async () => {
    render(
        <Router history={history}>
            <Form />
        </Router>
    );

    const submitButton = screen.getByRole('button', {name:/salvar/i});
    userEvent.click(submitButton);

    await waitFor( () => expect(screen.getAllByText('Campo obrigatório')).toHaveLength(5));

    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const descriptionInput = screen.getByTestId('description');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const categoriesInput = screen.getByLabelText('Categorias');

    userEvent.type(nameInput, 'Computador');
    await selectEvent.select(categoriesInput, ['Computadores', 'Eletrônicos']);

    userEvent.type(priceInput, '5000');
    userEvent.type(imgUrlInput, 'image.jpg');
    userEvent.type(descriptionInput, 'ótimo computador');

    await waitFor( () => expect(screen.queryAllByText('Campo obrigatório')).toHaveLength(0));
})