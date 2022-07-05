import { Card, CardContent, CardHeader, Typography } from '@mui/material';

export const Results = ({ func, pred, imageB64, error }) => {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardHeader title='Resultados' />
			<CardContent>
				{func && (
					<div>
						<Typography>Función de tendencia: </Typography>
						<pre>{func}</pre>
					</div>
				)}
				{pred && (
					<div
						style={{
							display: 'flex',
							placeContent: 'flex-start',
							placeItems: 'center',
							gap: 8,
						}}>
						<Typography>Predicción: </Typography>
						<pre>{pred}</pre>
					</div>
				)}
				<div>
					{imageB64 && (
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
							}}>
							<p>
								<span
									style={{
										background: '#1594AD',
										color: '#1594AD',
									}}>
									-----
								</span>{' '}
								Plot
							</p>
							<p>
								<span
									style={{
										background: '#AD5203',
										color: '#AD5203',
									}}>
									-----
								</span>{' '}
								Tendencia
							</p>
						</div>
					)}
					<img
						style={{ maxWidth: '60vw' }}
						src={
							imageB64 !== ''
								? `data:image/jpeg;base64,${imageB64.slice(
										2,
										-1
								  )}`
								: error !== ''
								? 'https://definicion.de/wp-content/uploads/2009/02/error.png'
								: 'https://i.pinimg.com/474x/5a/61/30/5a613089c64fa51c2c17877c030d4eed.jpg'
						}
						alt='Graph Result'
					/>
				</div>
			</CardContent>
		</Card>
	);
};
