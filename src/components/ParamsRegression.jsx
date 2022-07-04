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
	Tooltip,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
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
		<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
			<Card sx={{ flex: '300px' }}>
				<CardHeader title='Configurar parámetros para regresión lineal o polinomial' />
				<CardContent sx={{ gap: 4 }}>
					<Box
						sx={{
							display: 'flex',
							gap: 1,
							placeContent: 'center',
							placeItems: 'center',
						}}>
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
						<Tooltip title='Es la variable que contendrá los datos de entrenamiento 👌'>
							<InfoIcon color='action' />
						</Tooltip>
					</Box>
					<Box
						sx={{
							display: 'flex',
							gap: 1,
							placeContent: 'center',
							placeItems: 'center',
						}}>
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
						<Tooltip title='Es el valor que el algoritmo utilizará para predecir un resultado 👌'>
							<InfoIcon color='action' />
						</Tooltip>
					</Box>
				</CardContent>
			</Card>
			<Card sx={{ flex: '300px' }}>
				<CardHeader title='Configurar filtros' />
				<CardContent>
					<Box
						sx={{
							display: 'flex',
							gap: 1,
							placeContent: 'center',
							placeItems: 'center',
						}}>
						<TextField
							id={`paramsTextFilter-${id}`}
							label='Valor a predecir'
							variant='standard'
							onChange={handleFilter}
						/>
						<Tooltip title='Valor a predecir en términos de la variable independiente 👌'>
							<InfoIcon color='action' />
						</Tooltip>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};
