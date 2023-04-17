export interface DiagnoseType {
    code : string;
    name : string;
    latin? : string;
}

export interface PatientType {
    id : string;
    name : string;
    dateOfBirth : string;
    gender : string;
    occupation : string;
    ssn : string;
}

export type NonSensitivePatientEntry = Omit<PatientType, 'ssn'>;

export type NewPatientType = Omit<PatientType, 'id'>;

