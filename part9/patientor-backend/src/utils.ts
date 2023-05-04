
import { NewPatientType, Gender, NonSensitivePatientEntry, Entry } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
}

const isEntries = (param: string): param is Entry[] => {
    if (Array.isArray(param)) {
        return param.every(it => it instanceof Entry)
    }
}

const parseId = (id: unknown): string => {
    if(!id || !isString(id)){
        throw new Error('Incorrect or missing id');
    }
    return id;
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

const parseEntries = (entries: unknown[]): Entry[] => {
    if(!entries || !isString(entries) || entries.every(it => it instanceof Entry)){
        throw new Error('Incorrect or missing gender');
    }
    return entries;
}

export const toNewPatientEntry = ( entry: unknown ) : NewPatientType => {
    if( !entry || typeof entry !== 'object' ){
        throw new Error('Incorrect or missing data');
    }

    if('name' in entry && 'dateOfBirth' in entry && 'gender' in entry && 'occupation' in entry && 'ssn' in entry && 'entries' in entry){

        const newPatient: NewPatientType = {
            name : parseName(entry.name),
            dateOfBirth : parseDateOfBirth(entry.dateOfBirth),
            gender : parseGender(entry.gender),
            occupation : parseOccupation(entry.occupation),
            ssn : parseSsn(entry.ssn),
            entries: parseEntries(entry.entries)
        }

        return newPatient;

    }

    throw new Error('Incorrect or missing data');

}

export const nonSensitivePatientEntry = ( entry: unknown ) : NonSensitivePatientEntry => {
    if( !entry || typeof entry !== 'object' ){
        throw new Error('Incorrect or missing data');
    }

    if('id' in entry && 'name' in entry && 'dateOfBirth' in entry && 'gender' in entry && 'occupation' in entry && 'ssn' in entry ){

        const newPatient: NonSensitivePatientEntry = {
            id : parseId(entry.id),
            name : parseName(entry.name),
            dateOfBirth : parseDateOfBirth(entry.dateOfBirth),
            gender : parseGender(entry.gender),
            occupation : parseOccupation(entry.occupation)
        }

        return newPatient;

    }

    throw new Error('Incorrect or missing data');

}

