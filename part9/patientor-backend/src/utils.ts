
import { NewPatientType, Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
}

const parseName = (name: unknown): string => {
    if(!name || !isString(name)){
        throw new Error('Incorrect or missing name');
    }
    return name;
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if(!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
        throw new Error('Incorrect or missing date: '+ dateOfBirth);
    }
    return dateOfBirth;
}

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender');
    }
    return gender;
}

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)){
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
}

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)){
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
}


const toNewPatientEntry = ( entry: unknown ) : NewPatientType => {
    if( !entry || typeof entry !== 'object' ){
        throw new Error('Incorrect or missing data');
    }

    if('name' in entry && 'dateOfBirth' in entry && 'gender' in entry && 'occupation' in entry && 'ssn' in entry ){

        const newPatient: NewPatientType = {
            name : parseName(entry.name),
            dateOfBirth : parseDateOfBirth(entry.dateOfBirth),
            gender : parseGender(entry.gender),
            occupation : parseOccupation(entry.occupation),
            ssn : parseSsn(entry.ssn),
        }

        return newPatient;

    }

    throw new Error('Incorrect or missing data');

}

export default toNewPatientEntry;