import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import App from '../App';
import Home from '../pages/Home';

// Diz ao Jest para interceptar as chamadas do axios neste arquivo
jest.mock('axios');

describe('Teste de Rotas e Requisições HTTP', () => {

  test('Página de listagem deve chamar axios GET ao inicializar', async () => {
    // Configura o retorno 'falso' para a chamada http de listagem de séries
    axios.get.mockResolvedValue({ 
      data: [{ id: 1, title: 'Mocked Series 1' }] 
    });

    render(
      <MemoryRouter initialEntries={['/listar']}>
        <App />
      </MemoryRouter>
    );

    // O App no useEffect inicial faz um GET
    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/series');
  });

  test('Renderiza a Home corretamente sob o path principal da Rota', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Gerenciamento de Séries')).toBeInTheDocument();
  });

});
