
import { Entry } from '../../types';
import { Diagnosis } from "../../types";
import diagnoseService from '../../services/diagnoseService'
import { useState, useEffect } from 'react';

interface Props {
    entry: Entry;
}
  
const EntryPage = ({ entry }: Props) => {

    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);



    useEffect(() => {

        const updateDiagnoses = (codes: string[]) => {
            const diag = diagnoseService.getByCodes(codes).then(d => setDiagnoses(d));
            console.log(diag)
        }
  
        if (Array.isArray(entry.diagnosisCodes) && entry.diagnosisCodes.length > 0) {
            void updateDiagnoses(entry.diagnosisCodes)
        }
    }, []);
  
    if(!entry){
        return null;
    }

    return(
        <>
            <div>
                {entry.date} {entry.description}
            </div>
            <ul>
                { 
                    diagnoses.map(d => <li key={d.code}>{d.code} - {d.name}</li>) 
                }
            </ul>
        </>

    )
}

export default EntryPage;