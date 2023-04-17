import Patients from '../data/patients';
import { PatientType, NonSensitivePatientEntry, NewPatientType } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatientEntry[] => {
    return Patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
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
    addPatient
}