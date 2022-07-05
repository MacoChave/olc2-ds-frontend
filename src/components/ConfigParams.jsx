import { Alert } from '@mui/material';
import { ParamNeuralNetwork } from './ParamNeuralNetwork';
import { ParamDecisionTree } from './ParamsDecisionTree';
import { ParamsGaussian } from './ParamsGaussian';
import { ParamsRegression } from './ParamsRegression';

export const ConfigParams = (props) => {
	const { headers, algorithm, file, data, dispatch } = props;

	return file ? (
		<>
			{(algorithm === 0 || algorithm === 1) && (
				<ParamsRegression
					data={data}
					dispatch={dispatch}
					headers={headers}
				/>
			)}
			{algorithm === 2 && (
				<ParamsGaussian
					data={data}
					dispatch={dispatch}
					headers={headers}
				/>
			)}
			{algorithm === 3 && (
				<ParamDecisionTree
					data={data}
					dispatch={dispatch}
					headers={headers}
				/>
			)}
			{algorithm === 4 && (
				<ParamNeuralNetwork
					data={data}
					dispatch={dispatch}
					headers={headers}
				/>
			)}
		</>
	) : (
		<Alert variant='outlined' severity='warning'>
			No se encontró archivo de datos 🙃, regrese para cargar datos 🙂
		</Alert>
	);
};
