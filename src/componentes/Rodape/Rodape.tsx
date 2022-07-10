import { useNavigate } from 'react-router-dom';
import { useListaParticipantes } from '../../state/hooks/useListaParticipantes';

const Rodape = () => {
	const participantes = useListaParticipantes();
	//const navegarPara = useNavigate

	return (
		<footer>
			<button disabled={participantes.length < 3}>Iniciar brincadeira</button>
		</footer>
	);
};

export default Rodape;
