import {
	Box,
	Card,
	CardContent,
	CardHeader,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Tooltip,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useId } from 'react';
import { PARAMS_TYPES } from '../actions/paramsAction';

export const ParamDecisionTree = ({ data, dispatch, headers }) => {
	const id = useId();

	const handleDependiente = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch({
			type: PARAMS_TYPES.SET_DEPENDIENTE,
			dependiente: e.target.value,
		});
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
			<Card>
				<CardHeader title='Configurar parámetros para clasificador de árbol de decisión' />
				<CardContent>
					<Box
						sx={{
							display: 'flex',
							gap: 1,
							mb: 2,
							placeContent: 'center',
							placeItems: 'center',
						}}>
						<FormControl fullWidth sx={{ mb: 4 }}>
							<InputLabel id={`paramLabel-${id}`}>
								(y) Target values
							</InputLabel>
							<Select
								labelId={`paramLabel-${id}`}
								id={`paramSelect-${id}`}
								value={data.dependiente}
								label='Target values'
								onChange={handleDependiente}>
								{headers.map((header, index) => (
									<MenuItem key={index} value={header}>
										{header}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Tooltip title='Es la variable con la que el algoritmo se basará para realizar la clasificación del árbol de decisión 👌'>
							<InfoIcon color='action' />
						</Tooltip>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};
