import {
	Box,
	Card,
	CardContent,
	CardHeader,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { useId } from 'react';
import { PARAMS_TYPES } from '../actions/paramsAction';

export const ParamsRegression = ({ data, dispatch, headers }) => {
	const id = useId();

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

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
			<Card>
				<CardHeader title='Configurar parámetros para regresión lineal o polinomial' />
				<CardContent sx={{ gap: 4 }}>
					<FormControl fullWidth sx={{ mb: 4 }}>
						<InputLabel id={`paramsLabelY-${id}`}>
							Variable dependiente (y)
						</InputLabel>
						<Select
							labelId={`paramsLabelY-${id}`}
							id={`paramsSelectY-${id}`}
							value={data.dependiente}
							label='Training values'
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
							Variable independiente (x)
						</InputLabel>
						<Select
							labelId={`paramsLabelX-${id}`}
							id={`paramsSelectX-${id}`}
							value={data.independiente}
							label='Target values'
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
						label='Valor a predecir'
						variant='standard'
						onChange={handleFilter}
					/>
				</CardContent>
			</Card>
		</Box>
	);
};
