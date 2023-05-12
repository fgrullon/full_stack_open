
import { Entry } from '../../types';
import { Diagnosis } from "../../types";
import diagnoseService from '../../services/diagnoseService'
import { useState, useEffect } from 'react';
import HospitalEntry from '../EntryPage/HospitalEntry';
import OccupationalEntry from '../EntryPage/OccupationalEntry';
import HealthCheckEntry from '../EntryPage/HealthCheckEntry';

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

    console.log(entry.type)
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntry entry={entry} diagnoses={diagnoses} />
        case 'OccupationalHealthcare':
            return <OccupationalEntry entry={entry} diagnoses={diagnoses}  />
        case 'HealthCheck':
            return <HealthCheckEntry entry={entry} diagnoses={diagnoses}  />
        default:
            return null
    }

    return(
        <div
        style={{ 
            border : '2px solid black',
            padding: '5px',
            marginBottom: '10px' 

        }}>
            <div>
                {entry.date} 
            </div>
            <div>{entry.description}</div>
            <ul>
                { 
                    diagnoses.map(d => <li key={d.code}>{d.code} - {d.name}</li>) 
                }
            </ul>
            <div>diagnose by {entry.specialist}</div>
        </div>

    )
}

export default EntryPage;