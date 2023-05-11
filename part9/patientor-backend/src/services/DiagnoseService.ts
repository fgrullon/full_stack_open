import Diagnose from '../data/diagnoses';
import { DiagnoseCheck } from '../utils';
import { DiagnoseType } from '../types';

const getDiagnoses = (): DiagnoseType[] => {
    return Diagnose
}

const getDiagnose = (code: string): DiagnoseType => {
    const diagnose = Diagnose.filter(d => d.code === code);
    return DiagnoseCheck(diagnose[0]);
}

const getDiagnosesByCode = (codes: string[]): DiagnoseType[] => {
    const diagnoses = Diagnose.filter(d => codes.includes(d.code));
    if(diagnoses.every(d => DiagnoseCheck(d))){
        return diagnoses;
    }else{
        throw new Error('Incorrect or missing data');
    }
}

export default {
    getDiagnoses,
    getDiagnose,
    getDiagnosesByCode
}