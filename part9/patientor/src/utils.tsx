import diagnoseService from './services/diagnoseService'
import { Diagnosis } from "./types";

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}


export const getDiagnoseDescription =  (diagnoses: unknown): string[] => {
    if (Array.isArray(diagnoses) && diagnoses.length > 0) {
        diagnoses.map(code => {
            const diagnose = diagnoseService.getByCode(code);
            return formatDiagnose(diagnose);
        });
    }

    return []
}

const formatDiagnose = (diagnose: Diagnosis): string => {
    return `${diagnose.code} - ${diagnose.name}`;
}