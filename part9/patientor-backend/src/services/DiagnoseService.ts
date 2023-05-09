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

export default {
    getDiagnoses,
    getDiagnose
}