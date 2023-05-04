"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PatientService_1 = __importDefault(require("../services/PatientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(PatientService_1.default.getPatients());
});
router.post('/', (req, res) => {
    try {
        const newEntry = (0, utils_1.toNewPatientEntry)(req.body);
        const newPatient = PatientService_1.default.addPatient(newEntry);
        res.json(newPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
