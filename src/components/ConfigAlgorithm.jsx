import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Chip,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	Tooltip,
	useTheme,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useId, useState } from 'react';
import { CONFIG_TYPES } from '../actions/configAction';
import { options } from '../consts/analysisOptions';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export const ConfigAlgorithm = (props) => {
	const id = useId();
	const [arrOptions, setArrOptions] = useState(options[0].operations);
	const { data, dispatch } = props;
	const theme = useTheme();

	const handleAlgorithmChange = (e) => {
		let index = e.target.value;
		let value = options[index].algorithm;
		console.log(`[${index}] -> ${value}`);
		setArrOptions(options[index].operations);
		dispatch({
			type: CONFIG_TYPES.SET_ALGORITHM,
			idxAlgorithm: index,
			algorithm: value,
		});
	};

	const handleOperationChange = (e) => {
		let value = e.target.value;
		value = typeof value === 'string' ? value.split(',') : value;
		dispatch({
			type: CONFIG_TYPES.ADD_OPTION,
			option: value,
		});
	};

	return (
		<Card sx={{ minWidth: 275 }}>
			<CardHeader title='¿Qué hay que hacer?' />
			<CardContent>
				{/* SELECCIONAR ALGORITMO */}
				<Box
					sx={{
						display: 'flex',
						gap: 1,
						placeContent: 'center',
						placeItems: 'center',
					}}>
					<FormControl fullWidth sx={{ mb: 4 }}>
						<InputLabel id={`labelAlgoritm-${id}`}>
							Escoger algorimo
						</InputLabel>
						<Select
							labelId={`labelAlgoritm-${id}`}
							id={`selectAlgoritm-${id}`}
							value={data.idxAlgorithm}
							onChange={handleAlgorithmChange}>
							{options.map((option, index) => (
								<MenuItem key={index} value={index}>
									{option.algorithm}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Tooltip title='Seleccionar el algoritmo que desea que implemente la aplicación 😊'>
						<InfoIcon color='action' />
					</Tooltip>
				</Box>
				{/* SELECCIONAR OPERACION */}
				<Box
					sx={{
						display: 'flex',
						gap: 1,
						placeContent: 'center',
						placeItems: 'center',
					}}>
					<FormControl fullWidth sx={{ mb: 4 }}>
						<InputLabel id={`labelOperation-${id}`}>
							Escoger operaciones
						</InputLabel>
						<Select
							labelId={`labelOperation-${id}`}
							id={`selectOperation-${id}`}
							multiple
							value={data.option}
							onChange={handleOperationChange}
							input={
								<OutlinedInput
									id={`inputOperation-${id}`}
									label='Operacion'
								/>
							}
							renderValue={(selected) => (
								<Box
									sx={{
										display: 'flex',
										flexWrap: 'wrap',
										maxWidth: '300px',
										gap: 0.5,
									}}>
									{selected.map((value, index) => (
										<Chip key={index} label={value} />
									))}
								</Box>
							)}
							MenuProps={MenuProps}>
							{arrOptions.map((option, index) => (
								<MenuItem
									key={index}
									value={option}
									style={getStyles(
										option,
										data.option,
										theme
									)}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Tooltip title='Seleccione lo que desee que se verá en los resultados del análisis 😊'>
						<InfoIcon color='action' />
					</Tooltip>
				</Box>
			</CardContent>
		</Card>
	);
};
