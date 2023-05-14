
import Patients from '../data/patients';
import { PatientType, NonSensitivePatientEntry, NewPatientType, EntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';
import { nonSensitivePatientEntry, PatientEntry, parseDiagnosisCodes } from '../utils';

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

const addEntry = (
    patient_id: string,
    newEntry: EntryWithoutId
    ) : Entry => {

    if('diagnosisCodes' in newEntry){
        newEntry.diagnosisCodes = parseDiagnosisCodes(newEntry.diagnosisCodes);
    }

    const Entry = {
        id : uuid(),
        ...newEntry
    };

    Patients.map(p => {
        return p.id === patient_id ? p.entries.concat(Entry) : p;
    });

    return Entry
}

export default {
    getPatients,
    addPatient,
    getPatient,
    addEntry
}