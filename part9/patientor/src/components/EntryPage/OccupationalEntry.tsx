import { OccupationalHealthcareEntry, Diagnosis } from '../../types';

interface Props {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnosis[];
}
  
const OccupationalEntry = ({ entry, diagnoses }: Props) => {

    return (
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

export default OccupationalEntry;