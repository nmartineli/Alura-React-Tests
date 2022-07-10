import { render, screen } from '@testing-library/react';
import React from 'react';
import Formulario from './Formulario';

//Jest - O teste acaba servindo como documentação de como o componente tem que funcionar

test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
	render(<Formulario />);
	//encontrar no dom o input
	const input = screen.getByPlaceholderText('Insira os nomes dos participantes');

	//encontrar o botão
	const button = screen.getByRole('button');

	//garantir que o input esteja no documento - JEST
	expect(input).toBeInTheDocument();

	//garantir que o botão esteja desabilitado - JEST
	expect(button).toBeDisabled();
});
