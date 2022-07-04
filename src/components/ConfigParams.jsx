import {
	Alert,
	Card,
	CardContent,
	CardHeader,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useId, useState } from 'react';
import { PARAMS_TYPES } from '../actions/paramsAction';
import { options } from '../consts/analysisOptions';
import { ParamsGaussian } from './ParamsGaussian';
import { ParamsRegression } from './ParamsRegression';

export const ConfigParams = (props) => {
	const id = useId();
	const { headers, algorithm, file, data, dispatch } = props;

	// const handleDependiente = (e) => {
	// 	e.stopPropagation();
	// 	dispatch({
	// 		type: PARAMS_TYPES.SET_DEPENDIENTE,
	// 		dependiente: e.target.value,
	// 	});
	// };

	// const handleIndependiente = (e) => {
	// 	e.stopPropagation();
	// 	dispatch({
	// 		type: PARAMS_TYPES.SET_INDEPENDIENTE,
	// 		independiente: e.target.value,
	// 	});
	// };

	// const handleFilter = (e) => {
	// 	e.stopPropagation();
	// 	dispatch({ type: PARAMS_TYPES.SET_TIME, time: e.target.value });
	// };

	const handleAddColumn = (e) => {};

	const handleAddParams = (e) => {};

	const CardGaussian = () => {
		return (
			<>
				<Card>
					<CardHeader title={'Clasificador gausiano'} />
					<CardContent>
						{headers.map((value, index) => {
							<div key={index}>{value}</div>;
						})}
					</CardContent>
				</Card>
			</>
		);
	};

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
			{/* <Card>
				<CardHeader title='Configurar parámetros' />
				<CardContent sx={{ gap: 4 }}>
					<FormControl fullWidth sx={{ mb: 4 }}>
						<InputLabel id={`paramsLabelY-${id}`}>
							(y) Target values
						</InputLabel>
						<Select
							labelId={`paramsLabelY-${id}`}
							id={`paramsSelectY-${id}`}
							value={data.dependiente}
							label='(y) Target values'
							onChange={handleDependiente}>
							{headers.map((header, index) => (
								<MenuItem key={index} value={header}>
									{header}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel id={`paramsLabelX-${id}`}>
							(x) Training data
						</InputLabel>
						<Select
							labelId={`paramsLabelX-${id}`}
							id={`paramsSelectX-${id}`}
							value={data.independiente}
							label='(x) Training data'
							onChange={handleIndependiente}>
							{headers.map((header, index) => (
								<MenuItem key={index} value={header}>
									{header}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</CardContent>
			</Card>
			<Card>
				<CardHeader title='Configurar filtros' />
				<CardContent>
					<TextField
						id={`paramsTextFilter-${id}`}
						label='Prediccion (Respecto a x)'
						variant='standard'
						onChange={handleFilter}
					/>
				</CardContent>
			</Card> */}
		</>
	) : (
		<Alert variant='outlined' severity='warning'>
			No se encontró archivo de datos
		</Alert>
	);
};
