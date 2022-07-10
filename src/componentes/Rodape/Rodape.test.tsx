import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useListaParticipantes } from '../../state/hooks/useListaParticipantes';
import Rodape from './Rodape';

//mock da lista de participantes
jest.mock('../../state/hooks/useListaParticipantes', () => {
	return {
		useListaParticipantes: jest.fn(),
	};
});

const mockNavegacao = jest.fn();

jest.mock('react-router-dom', () => {
	return {
		useNavigate: () => mockNavegacao,
	};
});

describe('quando não existem participantes suficientes', () => {
	beforeEach(() => {
		(useListaParticipantes as jest.Mock).mockReturnValue([]);
	});
	test('a brincadeira não pode ser iniciada', () => {
		render(
			<RecoilRoot>
				<Rodape />
			</RecoilRoot>
		);

		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});
});

describe('quando existem participantes suficientes', () => {
	beforeEach(() => {
		(useListaParticipantes as jest.Mock).mockReturnValue(['Marisa', 'Ana', 'Silvio']);
	});
	test('a brincadeira pode ser iniciada', () => {
		render(
			<RecoilRoot>
				<Rodape />
			</RecoilRoot>
		);

		const button = screen.getByRole('button');
		expect(button).not.toBeDisabled();
	});

	test('a brincadeira foi iniciada', () => {
		render(
			<RecoilRoot>
				<Rodape />
			</RecoilRoot>
		);

		const button = screen.getByRole('button');
		fireEvent.click(button);

		expect(mockNavegacao).toHaveBeenCalledTimes(1);
		expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');
	});
});
