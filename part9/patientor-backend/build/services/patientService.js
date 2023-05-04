"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const getPatients = () => {
    return patients_1.default.map(patient => (0, utils_1.nonSensitivePatientEntry)(patient));
};
const getPatient = (id) => {
    const patient = patients_1.default.filter(patient => patient.id === id);
    return (0, utils_1.nonSensitivePatientEntry)(patient);
};
const addPatient = (newEntry) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, newEntry);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getPatients,
    addPatient,
    getPatient
};
