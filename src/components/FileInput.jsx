import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useId, useState } from 'react';
import { FILE_TYPES } from '../actions/fileAction';
import './style.css';
import { getHeadersFile, uploadFile } from '../services/FilesService';

const chunkSize = 10 * 1024;

export const FileInput = (props) => {
	const id = useId();
	const [chunkIndex, setChunkIndex] = useState(null);
	const [dataFile, setDataFile] = useState(null);
	const { data, dispatch } = props;

	const readAndUploadChunk = () => {
		const reader = new FileReader();
		if (!dataFile) return;
		const from = chunkIndex * chunkSize;
		const to = from + chunkSize;
		console.log({ from, to });
		const blob = dataFile.slice(from, to);
		reader.onload = (e) => uploadChunk(e);
		reader.readAsDataURL(blob);
	};

	function uploadChunk(readerEvent) {
		const body = readerEvent.target.result;
		const params = new URLSearchParams();
		params.set('name', dataFile.name);
		params.set('size', dataFile.size);
		params.set('chunkIndex', chunkIndex);
		params.set('totalChunks', Math.ceil(dataFile.size / chunkSize));

		const headers = {
			'Content-Type': 'application/octet-stream',
		};

		uploadFile(params, headers, body)
			.then((response) => response.json())
			.then((data) => {
				const fileSize = dataFile.size;
				const chunks = Math.ceil(fileSize / chunkSize) - 1;
				const isLastChunk = chunkIndex === chunks;
				if (isLastChunk) {
					console.log('File uploaded!');
					getHeaders();
					setChunkIndex(null);
				} else {
					console.log('Next chunk!');
					setChunkIndex(chunkIndex + 1);
				}
			})
			.catch((error) => console.error(error));
	}

	const getHeaders = () => {
		const params = new URLSearchParams();
		params.set('ext', data.file.name.split('.').pop());
		getHeadersFile(params)
			.then((response) => response.json())
			.then((data) => {
				const headerArr = data.header;
				dispatch({
					type: FILE_TYPES.SET_HEADERS,
					headers: headerArr,
				});
			})
			.catch((error) => console.error(error));
	};

	useEffect(() => {
		if (chunkIndex !== null) {
			readAndUploadChunk();
		}
	}, [chunkIndex]);

	/**
	 * Handle for changes on input file
	 * @param {ChangeEvent} e Change event on input
	 */
	const handleChange = (e) => {
		e.preventDefault();

		let file = e.target.files[0];
		if (file) {
			setDataFile(file);
			setChunkIndex(0);
			dispatch({ type: FILE_TYPES.ADD_FILE, file });
			dispatch({ type: FILE_TYPES.DROP_DEPTH, dropDepth: 0 });
			dispatch({
				type: FILE_TYPES.IN_DROP_ZONE,
				inDropZone: false,
			});
		}
	};

	/**
	 *
	 * @param {DragEvent} e
	 */
	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch({
			type: FILE_TYPES.DROP_DEPTH,
			dropDepth: data.dropDepth + 1,
		});
	};

	/**
	 *
	 * @param {DragEvent} e
	 */
	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch({
			type: FILE_TYPES.DROP_DEPTH,
			dropDepth: data.dropDepth - 1,
		});
		if (data.dropDepth > 0) return;
		dispatch({ type: FILE_TYPES.IN_DROP_ZONE, inDropZone: false });
	};

	/**
	 *
	 * @param {DragEvent} e
	 */
	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		e.dataTransfer.dropEffect = 'copy';
		dispatch({ type: FILE_TYPES.IN_DROP_ZONE, inDropZone: true });
	};

	/**
	 *
	 * @param {DragEvent} e
	 */
	const handleDrop = (e) => {
		e.preventDefault();

		let file = e.dataTransfer.files[0];
		if (file) {
			setDataFile(file);
			setChunkIndex(0);
			dispatch({ type: FILE_TYPES.ADD_FILE, file });
			dispatch({ type: FILE_TYPES.DROP_DEPTH, dropDepth: 0 });
			dispatch({
				type: FILE_TYPES.IN_DROP_ZONE,
				inDropZone: false,
			});
		}
	};

	/**
	 *
	 * @param {Event} e
	 */
	const handleClearInput = (e) => {
		e.preventDefault();
		dispatch({ type: FILE_TYPES.CLEAR_FILE });
		dispatch({ type: FILE_TYPES.DROP_DEPTH, dropDepth: 0 });
		dispatch({ type: FILE_TYPES.IN_DROP_ZONE, inDropZone: false });
	};

	return (
		<div className='drop__container'>
			<div
				className={`drop ${
					data.inDropZone
						? 'drop--active'
						: data.file
						? 'drop--hide'
						: ''
				}`}
				onDragEnter={handleDragEnter}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}>
				<span className='drop__text'>
					{!data.inDropZone
						? 'Arrastra un archivo aquí'
						: 'Release your mouse to drop'}
				</span>
				<div className='or-con'>
					<span className='line'></span>
					<span className='or'>O</span>
					<span className='line'></span>
				</div>
				<label className='drop__label' htmlFor={`file-upload-${id}`}>
					Buscar un archivo
				</label>
				<input
					type='file'
					id={`file-upload-${id}`}
					className='drop__input'
					accept='.json, .csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
					onChange={handleChange}
				/>
			</div>
			<div className={`progress ${data.file ? 'progress--show' : ''}`}>
				<IconButton
					sx={{ position: 'absolute', top: -10, right: -30 }}
					aria-label='Clear'
					color='secondary'
					onClick={handleClearInput}>
					<DeleteIcon />
				</IconButton>
			</div>
		</div>
	);
};
