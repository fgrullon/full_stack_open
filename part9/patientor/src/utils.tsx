import diagnoseService from './services/diagnoseService'

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}


export const getDiagnoseDescription =  (diagnoses: unknown): string[] => {
    let results: string[] = [];
    if (Array.isArray(diagnoses) && diagnoses.length > 0) {
        diagnoses.map(code => {
             diagnoseService.getByCode(code).then(r => results.push(`${r.code} - ${r.name}`));
        });
    }

    return results;
}


