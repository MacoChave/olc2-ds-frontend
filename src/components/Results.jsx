import { Card, CardContent, CardHeader, Typography } from '@mui/material';

export const Results = ({ func, pred, imageB64 }) => {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardHeader title='Resultados' />
			<CardContent>
				<div>
					<Typography>Función de tendencia: </Typography>
					<pre>{func}</pre>
				</div>
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
									}}
									Labels
									graph>
									-----
								</span>{' '}
								Plot
							</p>
							<p>
								<span
									style={{
										background: '#AD5203',
										color: '#AD5203',
									}}
									Labels
									graph>
									-----
								</span>{' '}
								Tendencia
							</p>
						</div>
					)}
					<img
						style={{ maxWidth: '60vw' }}
						src={
							imageB64 === ''
								? 'https://i.pinimg.com/474x/5a/61/30/5a613089c64fa51c2c17877c030d4eed.jpg'
								: `data:image/jpeg;base64,${imageB64.slice(
										2,
										-1
								  )}`
						}
						alt='Graph Result'
					/>
				</div>
			</CardContent>
		</Card>
	);
};
