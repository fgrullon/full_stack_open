import {  TextField, InputLabel, Grid, Button, SelectChangeEvent, Radio, Select, MenuItem } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import patientService from '../../services/patientService'
import { Patient, EntryType, HealthCheckRating, Discharge } from '../../types';

interface EntryTypeOption{
    value: EntryType;
    label: string;
}


const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(v => ({
    value: v, label: v.toString()
}));
type Props = {
    patient : Patient,
    setPatient:  React.Dispatch<React.SetStateAction<Patient | undefined>>;
};
  
const EntryForm = ({patient, setPatient}: Props): JSX.Element => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [codes, setCodes] = useState<string>('');
    const [type, setType] = useState<EntryType>(EntryType.HealthCheck);

    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
    const [discharge, setDischarge] = useState<Discharge>();
    const [employerName, setEmployerName] = useState<string>();
    const [sickLeave, setSickLeave] = useState<string>();

  
    const onTypeChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if ( typeof event.target.value === "string") {
          const value = event.target.value;
          const selectedType = Object.values(EntryType).find(g => g.toString() === value);
          if (selectedType) {
            setType(selectedType);
          }
        }
    };

    const prepVars = () => {
        const diagnosisCodes:string[] = codes.split(',');

        switch (type) {
            case 'Hospital':
                return { description, date, specialist, diagnosisCodes, type, discharge };
            case 'OccupationalHealthcare':
                return { description, date, specialist, diagnosisCodes, type, healthCheckRating };
            case 'HealthCheck':
                return { description, date, specialist, diagnosisCodes, type, employerName, sickLeave };
            default:
                return null
        }

    }
    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

       const newEntry = prepVars()
       if(!newEntry){
        return null
       }

       patientService.addEntry(patient.id, newEntry);
  

    }

    return <div>
    <form onSubmit={handleSubmit}>
     
        
        <Grid>

            <TextField
                label="Date"
                type="date"
                fullWidth 
                value={date}
                onChange={({ target }) => setDate(target.value)}
            />
            <TextField
                label="Description"
                type="text"
                fullWidth 
                value={description}
                onChange={({ target }) => setDescription(target.value)}
            />
 
     
            <TextField
                label="Specialist"
                fullWidth 
                value={specialist}
                onChange={({ target }) => setSpecialist(target.value)}
            />
            <TextField
                label="Diagnosis Codes"
                fullWidth 
                value={codes}
                onChange={({ target }) => setCodes(target.value)}
            />
          

                <InputLabel id="entry-type">Type</InputLabel>
                <Select
                    labelId="entry-type"
                    value={type}
                    label="Type"
                    onChange={onTypeChange}
                >
                    {entryTypeOptions.map(option =>
                        <MenuItem value={option.value}>{option.label}</MenuItem>
                    )}
                </Select>
                
        </Grid>

          <Grid>
              <Grid item>
                  <Button
                  style={{
                      float: "right",
                      margin: "5px",
                      backgroundColor: "green"
                  }}
                  type="submit"
                  variant="contained"
                  >
                  Add
                  </Button>
              </Grid>
              <Grid item>
                  <Button
                  style={{
                      float: "left",
                      margin: "5px",
                      backgroundColor: "red"
                  }}
                  type="button"
                  variant="contained"
                  >
                  Cancel
                  </Button>
              </Grid>
          </Grid>
        </form>
    </div>
}

export default EntryForm;