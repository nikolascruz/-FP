import React from 'react';
import { render, screen } from '@testing-library/react';
import SerieForm from '../componentes/SerieForm';
import SerieList from '../componentes/SerieList';

describe('Testes de Componentes Genéricos CRUD', () => {

  test('Renderiza o SerieForm no modo Cadastro (props vazias)', () => {
    const handleSalvar = jest.fn(); // Mock function simples

    render(<SerieForm onSalvar={handleSalvar} serieEditando={null} />);
    
    // Testa se título e botão de cadastro surgiram
    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cadastrar/i })).toBeInTheDocument();
  });

  test('Renderiza SerieList com mensagem de lista vazia', () => {
    render(<SerieList series={[]} onEditar={jest.fn()} onDeletar={jest.fn()} />);
    
    expect(screen.getByText(/Nenhuma série cadastrada ainda/i)).toBeInTheDocument();
  });

});
