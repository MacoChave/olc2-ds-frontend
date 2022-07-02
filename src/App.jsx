import './App.css';
import { Home } from './pages/Home';

function App() {
	// const [data, dispatch] = useReducer(fileReducer, fileInitialState);

	/**
	 * Upload data file to server for analyze
	 * @param {SubmitEvent} e Event to upload file on server
	 */
	const handleUploadFile = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (!data.file) {
			console.log('No se ha seleccionado un archivo');
		} else {
			console.log(data.file);
		}
	};

	return (
		<>
			<Home />
			{/* <FileInput data={data} dispatch={dispatch} />
			<button
				className='btn btn__primary'
				onClick={handleUploadFile}
				type='submit'>
				Upload file
			</button> */}
		</>
	);
}

export default App;
