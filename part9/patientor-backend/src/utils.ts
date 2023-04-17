import { NewPatientType } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const toNewPatientEntry = ( entry ) : NewPatientType => {

    const newPatient: NewPatientType = {
        name : isString(entry.name) ? entry.name : null,
        dateOfBirth : isString(entry.dateOfBirth) ? entry.dateOfBirth : null,
        gender : isString(entry.gender) ? entry.gender : null,
        occupation : isString(entry.occupation) ? entry.occupation : null,
        ssn : isString(entry.ssn) ? entry.ssn : null,
    }

    return newPatient;
}

export default toNewPatientEntry;