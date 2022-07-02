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
} from '@mui/material';
import { Box } from '@mui/system';
import { useId, useState } from 'react';
import { PARAMS_TYPES } from '../actions/paramsAction';
import { options } from '../consts/analysisOptions';

export const ConfigParams = (props) => {
	const id = useId();
	const { headers, algorithm, option, file, data, dispatch } = props;

	const fieldList = options[algorithm].fields;
	const filterList = options[algorithm].filter;

	const handleDependiente = (e) => {
		e.stopPropagation();
		dispatch({
			type: PARAMS_TYPES.SET_DEPENDIENTE,
			dependiente: e.target.value,
		});
	};

	const handleIndependiente = (e) => {
		e.stopPropagation();
		dispatch({
			type: PARAMS_TYPES.SET_INDEPENDIENTE,
			independiente: e.target.value,
		});
	};

	const handleFilter = (e) => {
		e.stopPropagation();
		dispatch({ type: PARAMS_TYPES.SET_TIME, time: e.target.value });
	};

	return file ? (
		<Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
			<Card>
				<CardHeader title='Configurar parámetros' />
				<CardContent>
					<FormControl fullWidth>
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
						label='¿Cuánto tiempo?'
						variant='standard'
						onChange={handleFilter}
					/>
				</CardContent>
			</Card>
		</Box>
	) : (
		<Alert severity='warning'>No se encontró archivo de datos</Alert>
	);
};
