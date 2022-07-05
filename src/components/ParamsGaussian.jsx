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
	Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useId, useState } from 'react';
import { PARAMS_TYPES } from '../actions/paramsAction';

export const ParamsGaussian = ({ data, dispatch, headers }) => {
	const id = useId();
	const [filter, setFilter] = useState('');

	const handleDependienteChange = (e) => {
		e.stopPropagation();
		dispatch({
			type: PARAMS_TYPES.SET_DEPENDIENTE,
			dependiente: e.target.value,
		});
	};

	const handleFilterChange = (e) => {
		e.stopPropagation();
		e.preventDefault();
		setFilter(e.target.value);
	};

	const handleFilterSubmit = (e) => {
		e.stopPropagation();
		e.preventDefault();
		let value = filter.split(',');
		dispatch({ type: PARAMS_TYPES.SET_TIME, time: value });
	};

	return (
		<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
			<Card sx={{ flex: '200px' }}>
				<CardHeader title='Columnas del archivo' />
				<CardContent>
					<Box sx={{ maxHeight: '50vh', overflowY: 'scroll' }}>
						{headers.map((header, index) => (
							<Box id={`item-${index}`}>
								<Typography
									variant='body1'
									key={`head-${index}`}>
									{header}
								</Typography>
								<Divider
									key={`divide-${index}`}
									sx={{ marginY: 1 }}
								/>
							</Box>
						))}
					</Box>
				</CardContent>
			</Card>
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
								onChange={handleDependienteChange}>
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
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}>
						<Alert variant='outlined' severity='info'>{`Agregar ${
							headers.length - 1
						} valores separados por ','`}</Alert>
						<form onSubmit={handleFilterSubmit}>
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
									label='Predicción'
									fullWidth
									variant='standard'
									onChange={handleFilterChange}
								/>
								<Tooltip title='Valor a predecir en términos del valor objetivo. Agregarlo en forma de lista de números separada por coma (,) 👌'>
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
