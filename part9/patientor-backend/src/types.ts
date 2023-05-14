
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

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export enum EntryType {
    Hospital = "Hospital",
    HealthCheck = "HealthCheck",
    OccupationalHealthcare = 'OccupationalHealthcare'
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseType['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: Discharge;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcare;
    employerName : string;
    sickLeave?: SickLeave;
}

export type Entry = 
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

 
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

