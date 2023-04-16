import express from 'express';
import cors from 'cors';
import DiagnoseRoutes from '../src/routes/DiagnoseRoutes';
import PatientsRoutes from '../src/routes/PatientsRoutes';

const app = express();
app.use(express.json());
app.use(cors());
app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', DiagnoseRoutes);

app.use('/api/patients', PatientsRoutes);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});