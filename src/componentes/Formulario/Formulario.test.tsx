import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Formulario from './Formulario';

//Jest - O teste acaba servindo como documentação de como o componente tem que funcionar
describe('o comportamento do Formulario.tsx', () => {
	test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>
		);
		//encontrar no dom o input
		const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
		//encontrar o botão
		const button = screen.getByRole('button');
		//garantir que o input esteja no documento - JEST
		expect(input).toBeInTheDocument();
		//garantir que o botão esteja desabilitado - JEST
		expect(button).toBeDisabled();
	});

	test('adicionar um participante caso exista um nome preenchido', () => {
		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>
		);

		//encontrar no dom o input
		const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
		//encontrar o botão
		const button = screen.getByRole('button');

		//inserir um valor no input
		fireEvent.change(input, {
			target: {
				value: 'Marília',
			},
		});
		//clicar no botão de submeter
		fireEvent.click(button);
		//garantir que o input esteja com o foco ativo
		expect(input).toHaveFocus();
		//garantir que o input não tenha um valor
		expect(input).toHaveValue('');
	});

	test('nomes duplicados não podem ser adicionados à lista', () => {
		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>
		);

		const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
		const button = screen.getByRole('button');

		//disparar duas vezes o input com o mesmo valor
		fireEvent.change(input, {
			target: {
				value: 'Marília',
			},
		});
		fireEvent.click(button);

		fireEvent.change(input, {
			target: {
				value: 'Marília',
			},
		});
		fireEvent.click(button);

		//procurar por um alerta
		const mensagemDeErro = screen.getByRole('alert');
		//encontrar uma mensagem de erro com o texto definido
		expect(mensagemDeErro.textContent).toBe('Nomes duplicados não são permitidos');
	});

	test('a mensagem de erro deve sumir após os timers', () => {
		jest.useFakeTimers();

		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>
		);

		const input = screen.getByPlaceholderText('Insira os nomes dos participantes');
		const button = screen.getByRole('button');

		//disparar duas vezes o input com o mesmo valor
		fireEvent.change(input, {
			target: {
				value: 'Marília',
			},
		});
		fireEvent.click(button);

		fireEvent.change(input, {
			target: {
				value: 'Marília',
			},
		});
		fireEvent.click(button);

		//procurar por um alerta
		//query by role: quando vamos no screen e fazemos um método get, se ele não encontrar o teste vai falhar.
		//Se é ok não encontrar o elemento, usamos o queryByRole
		let mensagemDeErro = screen.queryByRole('alert');
		expect(mensagemDeErro).toBeInTheDocument();

		//esperar N segundos - fala para o jest usar os timers disponíveis

		act(() => {
			jest.runAllTimers();
		});

		//mensagem deve ser nula
		mensagemDeErro = screen.queryByRole('alert');
		expect(mensagemDeErro).toBeNull();
	});
});
