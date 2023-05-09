
import { Entry } from '../../types';
import { Diagnosis } from "../../types";
import diagnoseService from '../../services/diagnoseService'
import { useState, useEffect } from 'react';
import { isString } from '../../utils';

interface Props {
    entry: Entry;
}
  
const EntryPage = ({ entry }: Props) => {

    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);


    if(patient && patient.entries.length > 0){
        patient.entries.map(e => updateDiagnoses(e.diagnosisCodes));
      }

    const updateDiagnoses = (codes: unknown) => {
        if (Array.isArray(codes) && codes.length > 0) {
          codes.map(code => {
            diagnoseService.getByCode(code).then(r => setDiagnoses([...diagnoses, r]));
            
          });
      }
        console.log('frank', diagnoses)
    }


    useEffect(() => {
  
        const fetchDiagnoses = async () => {
          if(isString(id)){
            const p = await diagnoseService.getByCode(id);
            if(p){
                setDiagnoses(p);
  
            }
            
          }else{
            navigate('/')
          }
        };
  
        void fetchDiagnoses();
  
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
                    entry.diagnosisCodes && 
                    entry.diagnosisCodes.map(d => <li key={d}>{d}</li>) 
                }
            </ul>
        </>

    )
}

export default EntryPage;