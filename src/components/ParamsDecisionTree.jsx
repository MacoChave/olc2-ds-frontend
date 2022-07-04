import {
	Box,
	Card,
	CardContent,
	CardHeader,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
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
				</CardContent>
			</Card>
		</Box>
	);
};
