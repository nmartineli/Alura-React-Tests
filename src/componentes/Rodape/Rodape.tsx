import { useNavigate } from 'react-router-dom';
import { useListaParticipantes } from '../../state/hooks/useListaParticipantes';

import './Rodape.css';

const Rodape = () => {
	const participantes = useListaParticipantes();

	const navegarPara = useNavigate();

	const iniciar = () => {
		navegarPara('/sorteio');
	};

	return (
		<footer className="rodape-configuracoes">
			<button className="botao" disabled={participantes.length < 3} onClick={iniciar}>
				Iniciar brincadeira
			</button>
			<img src="/imagens/sacolas.png" alt="Sacolas de compras" />
		</footer>
	);
};

export default Rodape;
