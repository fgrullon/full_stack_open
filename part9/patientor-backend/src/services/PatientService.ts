
import Patients from '../data/patients';
import { PatientType, NonSensitivePatientEntry, NewPatientType } from '../types';
import { v1 as uuid } from 'uuid';
import { nonSensitivePatientEntry, PatientEntry } from '../utils';

const getPatients = (): NonSensitivePatientEntry[] => {
    return Patients.map(patient => nonSensitivePatientEntry(patient) );
}

const getPatient = (id: string): PatientType => {
    const patient = Patients.filter(patient => patient.id === id);
    return PatientEntry(patient[0]);
}

const addPatient = (
    newEntry: NewPatientType
    ) : PatientType => {

    const newPatient = {
        id : uuid(),
        ...newEntry
    };

    Patients.push(newPatient);

    return newPatient
}

export default {
    getPatients,
    addPatient,
    getPatient
}