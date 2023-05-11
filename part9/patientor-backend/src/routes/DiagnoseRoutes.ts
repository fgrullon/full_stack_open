import express from 'express';
import diagnoseService from '../services/DiagnoseService';
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnoseService.getDiagnoses());
});

router.get('/:code', (req, res) => {
    res.send(diagnoseService.getDiagnose(req.params.code));
});

router.post('/', (req, res) => {
    try {
        res.json(diagnoseService.getDiagnosesByCode(req.body));
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
      }
})

export default router;

