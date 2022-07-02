import { Button, Card, CardContent, CardHeader } from '@mui/material';

export const Analize = ({ config, params }) => {
	const handleAnalizar = (e) => {
		e.preventDefault();
	};

	return (
		<Card sx={{ minWidth: 275 }}>
			<CardHeader title='Analizar entrada' />
			<CardContent>
				<img
					style={{ height: '30vh' }}
					src='https://i.pinimg.com/originals/43/fe/f2/43fef2ff434d0e56cc8cace0c8f69077.png'
					alt='Analizando...'
				/>
			</CardContent>
		</Card>
	);
};
