import {
	Box,
	Button,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import { useReducer, useState } from 'react';
import { CONFIG_TYPES } from '../actions/configAction';
import { FILE_TYPES } from '../actions/fileAction';
import { configInitialState, configReducer } from '../reducers/configReducer';
import { fileInitialState, fileReducer } from '../reducers/fileReducer';
import { ConfigAlgorithm } from '../components/ConfigAlgorithm';
import { ConfigParams } from '../components/ConfigParams';
import { FileInput } from '../components/FileInput';
import { paramsInitialState, paramsReducer } from '../reducers/paramsReducer';
import { Analize } from '../components/Analize';
import { PARAMS_TYPES } from '../actions/paramsAction';
import { sendAnalize } from '../services/AnalizarService';

const steps = ['Datos', 'Procedimiento', 'Parametrizar', 'Analizar'];

export const Home = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [fileData, fileDispatch] = useReducer(fileReducer, fileInitialState);
	const [configData, configDispatch] = useReducer(
		configReducer,
		configInitialState
	);
	const [paramsData, paramsDispatch] = useReducer(
		paramsReducer,
		paramsInitialState
	);

	const stepContent = [
		<FileInput data={fileData} dispatch={fileDispatch} />,
		<ConfigAlgorithm data={configData} dispatch={configDispatch} />,
		<ConfigParams
			headers={fileData.headers}
			algorithm={configData.idxAlgorithm}
			option={configData.idxOption}
			file={fileData.file}
			data={paramsData}
			dispatch={paramsDispatch}
		/>,
		<Analize config={configReducer} params={paramsReducer} />,
	];

	const handleNext = () => {
		if (activeStep === 3) {
			const headers = {
				'Content-Type': 'application/json',
			};
			const fileStr = fileData.file.name;
			const data = {
				ext: fileStr.split('.').pop(),
				config: configData,
				params: paramsData,
			};
			sendAnalize(headers, data)
				.then((response) => response.json())
				.then((data) => console.log(data))
				.catch((error) => console.error(error));
		}
		setActiveStep((curStep) => curStep + 1);
	};

	const handleBack = () => setActiveStep((curStep) => curStep - 1);

	const handleReset = () => {
		fileDispatch({ type: FILE_TYPES.CLEAR_FILE });
		configDispatch({ type: CONFIG_TYPES.CLEAR_CONFIG });
		paramsDispatch({ type: PARAMS_TYPES.CLEAR_PARAMS });
		setActiveStep(0);
	};

	return (
		<Box sx={{ width: '70%', marginX: 'auto', marginY: 15 }}>
			<Stepper activeStep={activeStep}>
				{steps.map((step, index) => {
					const stepProps = {
						data: fileData,
						dispatch: fileDispatch,
					};
					const labelProps = {};
					return (
						<Step key={index} {...stepProps}>
							<StepLabel {...labelProps}>{step.label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<Box
				sx={{
					minHeight: 100,
					p: 5,
					display: 'flex',
					placeContent: 'center',
					placeItems: 'center',
				}}>
				{stepContent[activeStep]}
			</Box>
			{activeStep === steps.length ? (
				<>
					<Typography sx={{ mt: 2, mb: 1 }}>
						Pasos completados
					</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Box sx={{ flex: '1 1 auto' }} />
						<Button onClick={handleReset}>Reiniciar</Button>
					</Box>
				</>
			) : (
				<>
					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Button
							color='inherit'
							disabled={activeStep === 0}
							onClick={handleBack}
							sx={{ mr: 1 }}>
							Atras
						</Button>
						<Box sx={{ flex: '1 1 auto' }} />
						<Button onClick={handleNext}>
							{activeStep === steps.length - 1
								? 'Analizar'
								: 'Siguiente'}
						</Button>
					</Box>
				</>
			)}
		</Box>
	);
};
