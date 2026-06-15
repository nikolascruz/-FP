import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NavBar from '../componentes/Bar/NavBar';
import FootBar from '../componentes/Bar/FootBar';

describe('Testes de Componentes Bar (NavBar, FootBar)', () => {

    test('Renderiza a NavBar com a logo e os links corretamente', () => {
        // Necessário envolver com MemoryRouter pois a NavBar possui componentes <Link>
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );

        // Verifica elementos textuais
        expect(screen.getByText('SérieJornal')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Cadastrar')).toBeInTheDocument();
    });

    test('Renderiza a FootBar com as informações corretas', () => {
        render(<FootBar />);
        expect(screen.getByText(/Feito e mantido por Nikolas Cruz/i)).toBeInTheDocument();
    });

});
