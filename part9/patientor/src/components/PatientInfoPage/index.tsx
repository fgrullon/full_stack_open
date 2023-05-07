import { Patient } from "../../types";
import { useState, useEffect } from 'react';
import patientService from '../../services/patients'
import { useMatch, useNavigate } from 'react-router-dom'
import { isString } from '../../utils';

const PatientInfoPage = () => {
    const [patient, setPatient] = useState<Patient>();
    const navigate = useNavigate();
    const match = useMatch('/patients/:id');
    let id = match ? match.params.id : null;

    useEffect(() => {
  
      const fetchPatient = async () => {
        if(isString(id)){
          const p = await patientService.getById(id);
          if(p) setPatient(p);
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
          <h1>{patient.name}</h1>

          <p>ssn:{patient.ssn}</p>
          <p>ssn:{patient.occupation}</p>
        </div>
    )

}

export default PatientInfoPage;