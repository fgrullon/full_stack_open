import { Patient } from "../../types";
import { useState, useEffect } from 'react';
import patientService from '../../services/patientService'

import { useMatch, useNavigate } from 'react-router-dom'
import { isString, getDiagnoseDescription } from '../../utils';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryPage from '../EntryPage';

const PatientInfoPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const navigate = useNavigate();
    const match = useMatch('/patients/:id');
    let id = match ? match.params.id : null;



    useEffect(() => {
  
      const fetchPatient = async () => {
        if(isString(id)){
          const p = await patientService.getById(id);
          if(p){
            setPatient(p);

          }
          
        }else{
          navigate('/')
        }
      };

      void fetchPatient();

    }, []);


    
    if(!patient){
      return null;
    }
  
    return (
        <div>
          <h1>{patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon /> }</h1>

          <p>ssn:{patient.ssn}</p>
          <p>ssn:{patient.occupation}</p>
          {patient.entries && patient.entries.map( e  => <EntryPage key={e.id} entry={e} />)}
        </div>
    )

}

export default PatientInfoPage;