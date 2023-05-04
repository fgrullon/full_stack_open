
export interface DiagnoseType {
    code : string;
    name : string;
    latin? : string;
}


export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface PatientType {
    id : string;
    name : string;
    dateOfBirth : string;
    gender : Gender;
    occupation : string;
    ssn : string;
    entries: Entry[];
}


export type NonSensitivePatientEntry = Omit<PatientType, 'ssn' | 'entries'>;

export type NewPatientType = Omit<PatientType, 'id'>;

