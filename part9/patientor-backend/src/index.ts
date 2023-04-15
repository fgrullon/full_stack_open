import express from 'express';
import cors from 'cors';
import DiagnoseRoutes from '../src/routes/DiagnoseRoutes';

const app = express();
app.use(express.json());
app.use(cors());
app.get('/api/ping', (req, res) => {
    res.send('pong');
});

app.get('/api/diagnose', DiagnoseRoutes);



const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});