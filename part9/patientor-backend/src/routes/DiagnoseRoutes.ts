import express from 'express';
import diagnoseService from '../services/DiagnoseService';
const router = express.Router();

router.get('/', (req, res) => {
    res.send(diagnoseService.getDiagnoses());
});

export default router;