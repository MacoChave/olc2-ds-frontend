import { Card, CardContent, CardHeader, Typography } from '@mui/material';

/**
 * Retorna la imagen a mostrar en el resultado o una imagen por defecto
 * @param {String} imageB64 Base 64 de la imagen
 * @returns Base 64 o URL de la imagen a mostrar
 */
const getImage = (imageB64) => {
	imageB64 === ''
		? 'https://i.pinimg.com/474x/5a/61/30/5a613089c64fa51c2c17877c030d4eed.jpg'
		: (imageB64 = imageB64.slice(2, -1));
};

export const Results = ({ func, pred, imageB64 }) => {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardHeader title='Resultados' />
			<CardContent>
				<pre>{func}</pre>
				<Typography>{pred}</Typography>
				<img
					src={
						imageB64 === ''
							? 'https://i.pinimg.com/474x/5a/61/30/5a613089c64fa51c2c17877c030d4eed.jpg'
							: imageB64.slice(2, -1)
					}
					alt='Graph Result'
				/>
			</CardContent>
		</Card>
	);
};
