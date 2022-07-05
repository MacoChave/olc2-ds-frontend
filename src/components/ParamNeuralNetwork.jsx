import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Tooltip,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useId, useState } from 'react';
import { PARAMS_TYPES } from '../actions/paramsAction';

export const ParamNeuralNetwork = ({ data, dispatch, headers }) => {
	const id = useId();
	const [layers, setLayers] = useState('');
	const [prediction, setPrediction] = useState('');
	const handleTargetValuesChange = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch({
			type: PARAMS_TYPES.SET_DEPENDIENTE,
			dependiente: e.target.value,
		});
	};
	const handleLayersSubmit = (e) => {
		e.preventDefault();
		e.stopPropagation();
		let value = layers.split(',');
		dispatch({ type: PARAMS_TYPES.SET_LAYERS, layers: value });
	};
	const handleLayersChange = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setLayers(e.target.value);
	};
	const handleIteracionChange = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch({
			type: PARAMS_TYPES.SET_ITERACION,
			iteracion: e.target.value,
		});
	};
	const handlePredictionSubmit = (e) => {
		e.preventDefault();
		e.stopPropagation();
		let value = prediction.split(',');
		dispatch({ type: PARAMS_TYPES.SET_TIME, time: value });
	};
	const handlePredictionChange = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setPrediction(e.target.value);
	};

	return (
		<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
			<Card sx={{ flex: '300px' }}>
				<CardHeader title='Configurar valores' />
				<CardContent>
					<Box
						sx={{
							display: 'flex',
							gap: 1,
							placeContent: 'center',
							placeItems: 'center',
						}}>
						<FormControl fullWidth sx={{ mb: 2 }}>
							<InputLabel id={`gaussLabelX-${id}`}>
								(y) Target values
							</InputLabel>
							<Select
								labelId={`gaussLabelX-${id}`}
								id={`gaussSelectX-${id}`}
								value={data.dependiente}
								label='Target values'
								onChange={handleTargetValuesChange}>
								{headers.map((header, index) => (
									<MenuItem
										key={`item-${index}`}
										value={header}>
										{header}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Tooltip title='Es la variable que el algoritmo utilizará para predecir un resultado 👌'>
							<InfoIcon color='action' />
						</Tooltip>
					</Box>
				</CardContent>
			</Card>
			<Card sx={{ flex: '300px' }}>
				<CardHeader title='Tamaño de capas' />
				<CardContent>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}>
						<Alert
							variant='outlined'
							severity='info'>{`Agregar los valores separados por ',' para las capas de análisis`}</Alert>
						<form onSubmit={handleLayersSubmit}>
							<Box
								sx={{
									display: 'flex',
									gap: 1,
									mb: 2,
									placeContent: 'center',
									placeItems: 'center',
								}}>
								<TextField
									id={`gausFilter-${id}`}
									label='Tamaño de capas'
									fullWidth
									variant='standard'
									onChange={handleLayersChange}
								/>
								<Tooltip title='Número y cantidad de capas para realizar el análisis. Debe ingresar una lista de números separados por coma (,) 👌'>
									<InfoIcon color='action' />
								</Tooltip>
							</Box>
							<Button type='submit' fullWidth variant='outlined'>
								Guardar
							</Button>
						</form>
					</Box>
				</CardContent>
			</Card>
			<Card sx={{ flex: '300px' }}>
				<CardHeader title='Iteraciones' />
				<CardContent>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}>
						<Box
							sx={{
								display: 'flex',
								gap: 1,
								mb: 2,
								placeContent: 'center',
								placeItems: 'center',
							}}>
							<TextField
								id={`gausFilter-${id}`}
								label='Número de iteraciones'
								fullWidth
								variant='standard'
								onChange={handleIteracionChange}
							/>
							<Tooltip title='Número de iteraciones que el modelo realizará para predecir 👌'>
								<InfoIcon color='action' />
							</Tooltip>
						</Box>
					</Box>
				</CardContent>
			</Card>
			<Card sx={{ flex: '300px' }}>
				<CardHeader title='Configurar valores de predicción' />
				<CardContent>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}>
						<Alert variant='outlined' severity='info'>{`Agregar ${
							headers.length - 1
						} valores separados ','`}</Alert>
						<form onSubmit={handlePredictionSubmit}>
							<Box
								sx={{
									display: 'flex',
									gap: 1,
									mb: 2,
									placeContent: 'center',
									placeItems: 'center',
								}}>
								<TextField
									id={`gausFilter-${id}`}
									label='Tamaño de capas'
									fullWidth
									variant='standard'
									onChange={handlePredictionChange}
								/>
								<Tooltip title='Valores a predecir. Debe ingresar una lista de números separados por coma (,) 👌'>
									<InfoIcon color='action' />
								</Tooltip>
							</Box>
							<Button type='submit' fullWidth variant='outlined'>
								Guardar
							</Button>
						</form>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};
