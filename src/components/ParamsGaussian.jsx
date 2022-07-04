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
	ListItemButton,
	MenuItem,
	Select,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import { useId, useState } from 'react';
import { PARAMS_TYPES } from '../actions/paramsAction';

export const ParamsGaussian = ({ data, dispatch, headers }) => {
	const id = useId();
	const [filter, setFilter] = useState('');

	const handleTargetValueChange = (e) => {
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
		console.log(filter);
	};

	const handleFilterSubmit = (e) => {
		e.stopPropagation();
		e.preventDefault();
		let value = filter.split(',');
		console.log({ filter, value });
		dispatch({ type: PARAMS_TYPES.SET_TIME, time: value });
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
			<Card>
				<CardHeader title='Columnas del archivo' />
				<CardContent>
					<Box sx={{ gap: 4 }}>
						{headers.map((header, index) => (
							<>
								<Typography
									variant='body1'
									key={`head-${index}`}>
									{header}
								</Typography>
								<Divider
									key={`divide-${index}`}
									sx={{ marginY: 1 }}
								/>
							</>
						))}
					</Box>
				</CardContent>
			</Card>
			<Card>
				<CardHeader title='Configurar valores' />
				<CardContent>
					<FormControl fullWidth sx={{ mb: 2 }}>
						<InputLabel id={`gaussLabelX-${id}`}>
							(y) Target values
						</InputLabel>
						<Select
							labelId={`gaussLabelX-${id}`}
							id={`gaussSelectX-${id}`}
							value={data.dependiente}
							label='Target values'
							onChange={handleTargetValueChange}>
							{headers.map((header, index) => (
								<MenuItem key={`item-${index}`} value={header}>
									{header}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}>
						<Alert variant='outlined' severity='info'>{`Agregar ${
							headers.length - 1
						} valores separados ','`}</Alert>
						<form
							style={{
								flex: 'flex',
								placeContent: 'center',
								placeItems: 'center',
							}}
							onSubmit={handleFilterSubmit}>
							<TextField
								id={`gausFilter-${id}`}
								label='Predicción'
								variant='standard'
								onChange={handleFilterChange}
							/>
							<Button type='submit' variant='outlined'>
								Guardar
							</Button>
						</form>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};
