
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

interface HealthCheckEntry extends BaseEntry {
    type: EntryType.HealthCheck;
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: EntryType.Hospital;
    discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType.OccupationalHealthcare;
    employerName : string;
    sickLeave?: SickLeave;
}

export type Entry = 
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

 
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

