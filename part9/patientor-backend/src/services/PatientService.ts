import Patients from '../data/patients';

import { PatientType, NonSensitivePatientEntry } from '../types';

const getPatients = (): NonSensitivePatientEntry[] => {
    return Patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
}


export default {
    getPatients
}