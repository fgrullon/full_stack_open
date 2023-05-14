
import { 
    DiagnoseType, 
    NewPatientType, 
    Gender, 
    NonSensitivePatientEntry, 
    PatientType, 
    Entry, 
    EntryWithoutId,
    EntryType,
    SickLeave,
    HealthCheckRating,
    Discharge
} from './types';


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isNumber = (number: unknown): number is number => {
    return typeof number === 'number' || number instanceof Number;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
}

const isEntries = (param: unknown): param is Entry[] => {
    if (Array.isArray(param)) {
        return param.every(it => {
            return (it as Entry).id && (it as Entry).description && (it as Entry).date && (it as Entry).id && (it as Entry).specialist && (it as Entry).type
        });
    }
    return false;
 
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

const parseEmployerName = (employerName : unknown): string => {
    if(!employerName || !isString(employerName)){
        throw new Error('Incorrect or missing employer name');
    }
    return employerName;
}

const parseCode = (code: unknown): string => {
    if(!code || !isString(code)){
        throw new Error('Incorrect or missing code');
    }
    return code;
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

const parseEntries = (entries: any[]): Entry[] => {
    if(!entries || !isEntries(entries) || !Array.isArray(entries)){
        throw new Error('Incorrect or missing entries');
    }
    return entries;
}

// const isEntryType = (param: string): param is EntryType => {
//     return Object.values(EntryType).map(v => v.toString()).includes(param);
// }

// const parseEntryType = (type: any): EntryType => {
//     if(!type || !isEntryType(type) || !Array.isArray(type)){
//         throw new Error('Incorrect or missing entry type');
//     }
//     return type;
// }

const parseDescription = (description: unknown): string => {
    if(!description || !isString(description)){
        throw new Error('Incorrect or missing description');
    }
    return description;
}

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error('Incorrect or missing date: '+ date);
    }
    return date;
}

const parseCriteria = (criteria: unknown): string => {
    if(!criteria || !isString(criteria)){
        throw new Error('Incorrect or missing criteria');
    }
    return criteria;
}

const parseDischarge = (discharge: unknown): Discharge => {
    if( !discharge || typeof discharge !== 'object' ){
        throw new Error('Incorrect or missing data');
    }
    if('date' in discharge && 'criteria' in discharge){
        const newDischarge: Discharge = {
            date : parseDate(discharge.date),
            criteria : parseCriteria(discharge.criteria)
        }

        return newDischarge;
    }

    throw new Error('Incorrect or missing data');


}

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if( !rating || !isNumber(rating)){
        throw new Error('Incorrect or missing data');
    }
    
    return rating;
}

const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if( !sickLeave || typeof sickLeave !== 'object' ){
        throw new Error('Incorrect or missing data');
    }
    if('startDate' in sickLeave && 'endDate' in sickLeave){
        const newSickLeave: SickLeave = {
            startDate : parseDate(sickLeave.startDate),
            endDate : parseDate(sickLeave.endDate)
        }

        return newSickLeave;
    }

    throw new Error('Incorrect or missing data');

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
            entries: parseEntries(entry.entries as unknown[])
        }

        return newPatient;

    }
    throw new Error('Incorrect or missing data');

}

export const PatientEntry = ( entry: unknown ) : PatientType => {
    if( !entry || typeof entry !== 'object' ){
        throw new Error('Incorrect or missing data');
    }

    if('id' in entry && 'name' in entry && 'dateOfBirth' in entry && 'gender' in entry && 'occupation' in entry && 'ssn' in entry && 'entries' in entry){

        const Patient: PatientType = {
            id : parseId(entry.id),
            name : parseName(entry.name),
            dateOfBirth : parseDateOfBirth(entry.dateOfBirth),
            gender : parseGender(entry.gender),
            occupation : parseOccupation(entry.occupation),
            ssn : parseSsn(entry.ssn),
            entries: parseEntries(entry.entries as unknown[])
        }

        return Patient;

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
            occupation : parseOccupation(entry.occupation),
        }

        return newPatient;

    }

    throw new Error('Incorrect or missing data');

}

export const DiagnoseCheck = ( diagnose: unknown ) : DiagnoseType => {
    if( !diagnose || typeof diagnose !== 'object' ){
        throw new Error('Incorrect or missing data');
    }

    if('code' in diagnose && 'name' in diagnose ){

        const Diagnose: DiagnoseType = {
            name : parseName(diagnose.name),
            code : parseCode(diagnose.code),
        }

        return Diagnose;

    }

    throw new Error('Incorrect or missing data');

}

export const parseDiagnosisCodes = (object: unknown): Array<DiagnoseType['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<DiagnoseType['code']>;
    }
  
    return object.diagnosisCodes as Array<DiagnoseType['code']>;
};

export const newEntry = ( entry: unknown ) : EntryWithoutId => {
    if( !entry || typeof entry !== 'object' ){
        throw new Error('Incorrect or missing data');
    }

    if('date' in entry && 'type' in entry && 'description' in entry && 'specialist' in entry ){

        switch (entry.type) {
            case 'Hospital':
                return parseHospitalEntry(entry)
            case 'HealthCheck':
                return parseHealthCheckEntry(entry)
            case 'OccupationalHealthcare':
                return parseOccupationalHealthcareEntry(entry)
        }

    }

    throw new Error('Incorrect or missing data');

}


const parseHospitalEntry = (entry: unknown):EntryWithoutId => {
    if( !entry || typeof entry !== 'object' ){
        throw new Error('Incorrect or missing data');
    }

    if('date' in entry && 'type' in entry && 'description' in entry && 'specialist' in entry && 'discharge' in entry ){

        const newEntry: EntryWithoutId = {
            date : parseName(entry.date),
            type : EntryType.Hospital,
            description : parseDescription(entry.description),
            specialist : parseName(entry.specialist),
            discharge: parseDischarge(entry.discharge)
        }

        return newEntry;

    }

    throw new Error('Incorrect or missing data');

};

const parseHealthCheckEntry = (entry: unknown):EntryWithoutId => {
    if( !entry || typeof entry !== 'object' ){
        throw new Error('Incorrect or missing data');
    }

    if('date' in entry && 'type' in entry && 'description' in entry && 'specialist' in entry && 'healthCheckRating' in entry ){

        const newEntry: EntryWithoutId = {
            date : parseName(entry.date),
            type : EntryType.HealthCheck,
            description : parseDescription(entry.description),
            specialist : parseName(entry.specialist),
            healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
        }

        return newEntry;

    }

    throw new Error('Incorrect or missing data');

};

const parseOccupationalHealthcareEntry = (entry: unknown):EntryWithoutId => {
    if( !entry || typeof entry !== 'object' ){
        throw new Error('Incorrect or missing data');
    }

    if('date' in entry && 'type' in entry && 'description' in entry && 'specialist' in entry && 'employerName' in entry && 'sickLeave' in entry ){

        const newEntry: EntryWithoutId = {
            date : parseName(entry.date),
            type : EntryType.OccupationalHealthcare,
            description : parseDescription(entry.description),
            specialist : parseName(entry.specialist),
            employerName: parseEmployerName(entry.employerName),
            sickLeave : parseSickLeave(entry.sickLeave)
        }
        return newEntry;

    }

    throw new Error('Incorrect or missing data');

};
