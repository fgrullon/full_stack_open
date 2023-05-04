"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonSensitivePatientEntry = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(param);
};
const parseId = (id) => {
    if (!id || !isString(id)) {
        throw new Error('Incorrect or missing id');
    }
    return id;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const toNewPatientEntry = (entry) => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in entry && 'dateOfBirth' in entry && 'gender' in entry && 'occupation' in entry && 'ssn' in entry) {
        const newPatient = {
            name: parseName(entry.name),
            dateOfBirth: parseDateOfBirth(entry.dateOfBirth),
            gender: parseGender(entry.gender),
            occupation: parseOccupation(entry.occupation),
            ssn: parseSsn(entry.ssn),
        };
        return newPatient;
    }
    throw new Error('Incorrect or missing data');
};
exports.toNewPatientEntry = toNewPatientEntry;
const nonSensitivePatientEntry = (entry) => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('id' in entry && 'name' in entry && 'dateOfBirth' in entry && 'gender' in entry && 'occupation' in entry && 'ssn' in entry) {
        const newPatient = {
            id: parseId(entry.id),
            name: parseName(entry.name),
            dateOfBirth: parseDateOfBirth(entry.dateOfBirth),
            gender: parseGender(entry.gender),
            occupation: parseOccupation(entry.occupation)
        };
        return newPatient;
    }
    throw new Error('Incorrect or missing data');
};
exports.nonSensitivePatientEntry = nonSensitivePatientEntry;
