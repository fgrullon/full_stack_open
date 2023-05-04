
import Patients from '../data/patients';
import { PatientType, NonSensitivePatientEntry, NewPatientType } from '../types';
import { v1 as uuid } from 'uuid';
import { nonSensitivePatientEntry } from '../utils';

const getPatients = (): NonSensitivePatientEntry[] => {
    return Patients.map(patient => nonSensitivePatientEntry(patient) );
}

const getPatient = (id: string): NonSensitivePatientEntry => {
    const patient = Patients.filter(patient => patient.id === id );
    return nonSensitivePatientEntry(patient);
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