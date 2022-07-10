import { render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { useListaParticipantes } from '../../state/hooks/useListaParticipantes';
import ListaPartipantes from './ListaParticipantes';

jest.mock('../../state/hooks/useListaParticipantes', () => {
	return {
		useListaParticipantes: jest.fn(),
	};
});

describe('uma lista vazia de participantes', () => {
	beforeEach(() => {
		(useListaParticipantes as jest.Mock).mockReturnValue([]);
	});
	test('deve ser renderizada sem elementos', () => {
		render(
			<RecoilRoot>
				<ListaPartipantes />
			</RecoilRoot>
		);

		const items = screen.queryAllByRole('listitem');
		expect(items).toHaveLength(0);
	});
});

describe('uma lista preenchida de participantes', () => {
	const participantes = ['Catarina', 'João'];

	//fazer um mock de uma lista preenchida

	beforeEach(() => {
		(useListaParticipantes as jest.Mock).mockReturnValue(participantes);
	});

	test('deve ser renderizada com elementos', () => {
		render(
			<RecoilRoot>
				<ListaPartipantes />
			</RecoilRoot>
		);

		const items = screen.queryAllByRole('listitem');
		expect(items).toHaveLength(participantes.length);
	});
});
