import express from 'express';
import patientService from '../services/PatientService';
import { toNewPatientEntry, newEntryParse } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/', (req, res) => {
    try {
        const newEntry = toNewPatientEntry(req.body);
        const newPatient = patientService.addPatient(newEntry)
        res.json(newPatient);
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
      }
})

router.post('/:id/entries', (req, res) => {
  const newEntry = newEntryParse(req.body);
  const addedEntry = patientService.addEntry(req.params.id, newEntry)
  res.json(addedEntry);

});

export default router;

