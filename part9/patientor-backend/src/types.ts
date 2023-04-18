
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


export interface PatientType {
    id : string;
    name : string;
    dateOfBirth : string;
    gender : Gender;
    occupation : string;
    ssn : string;
}


export type NonSensitivePatientEntry = Omit<PatientType, 'ssn'>;

export type NewPatientType = Omit<PatientType, 'id'>;

