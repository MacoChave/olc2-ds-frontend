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
import { Results } from '../components/Results';

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
	const [func, setFunc] = useState('');
	const [pred, setPred] = useState('');
	const [imageB64, setImageB64] = useState('');

	const stepContent = [
		<FileInput data={fileData} dispatch={fileDispatch} />,
		<ConfigAlgorithm data={configData} dispatch={configDispatch} />,
		<ConfigParams
			headers={fileData.headers}
			algorithm={configData.idxAlgorithm}
			file={fileData.file}
			data={paramsData}
			dispatch={paramsDispatch}
		/>,
		<Analize config={configReducer} params={paramsReducer} />,
		<Results func={func} pred={pred} imageB64={imageB64} />,
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
				.then((data) => {
					console.log(data);
					setFunc(data.func);
					setPred(data.pred);
					setImageB64(data.imageB64);
				})
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
					const stepProps = {};
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
						Análisis finalizado
					</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
						<Box sx={{ flex: '1 1 auto' }} />
						<Button onClick={handleReset}>Nuevo análisis</Button>
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
