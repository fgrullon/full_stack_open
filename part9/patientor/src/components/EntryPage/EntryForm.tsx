import {  TextField, InputLabel, Grid, Button, SelectChangeEvent, Select, MenuItem } from '@mui/material';
import { useState, SyntheticEvent } from 'react';
import patientService from '../../services/patientService'
import { Patient, EntryType, HealthCheckRating, Discharge, SickLeave } from '../../types';

interface EntryTypeOption{
    value: EntryType;
    label: string;
}

const entryTypeOptions: EntryTypeOption[] = Object.values(EntryType).map(v => ({
    value: v, label: v.toString()
}));

interface HealthCheckRatingOption{
    value: HealthCheckRating;
    label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(HealthCheckRating).filter((v) => isNaN(Number(v))).map((v,k) => ({ 
    value : k, label : v.toString()
}))


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
    const [discharge, setDischarge] = useState<Discharge>({date : '', criteria : ''});
    const [employerName, setEmployerName] = useState<string>();
    const [sickLeave, setSickLeave] = useState<SickLeave>({startDate : '', endDate : ''});

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

    const onHeltCheckRatingChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();

        if ( typeof event.target.value !== "string") {
          const value = event.target.value;
          const selectedRating = Object.values(HealthCheckRating).find(g => g === value);
          if (selectedRating && !isNaN(Number(selectedRating))) {
            setHealthCheckRating(Number(selectedRating));
          }
        }

    };

    const prepVars = () => {
        const diagnosisCodes:string[] = codes.split(',');

        switch (type) {
            case 'Hospital':
                return { description, date, specialist, diagnosisCodes, type, discharge };
            case 'HealthCheck':
                return { description, date, specialist, diagnosisCodes, type, healthCheckRating };
            case 'OccupationalHealthcare':
                return { description, date, specialist, diagnosisCodes, type, employerName, sickLeave };
            default:
                return null
        }

    }
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

       const newEntry = prepVars()
       if(!newEntry){
        return null
       }

       const newEntries = await patientService.addEntry(patient.id, newEntry)
        const updatedPatient = {...patient, entries : patient.entries.concat(newEntries)};
        setPatient(updatedPatient)

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
                    fullWidth 
                >
                    {entryTypeOptions.map(option =>
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    )}
                </Select>

            {type === 'Hospital' &&
                <>
                    <TextField
                        label="Date"
                        type="date"
                        fullWidth 
                        value={discharge.date}
                        onChange={({ target }) => setDischarge({...discharge, date : target.value})}

                    />
                    <TextField
                        label="Criteria"
                        type="text"
                        fullWidth 
                        value={discharge.criteria}
                        onChange={({ target }) => setDischarge({...discharge, criteria : target.value})}
                    />
                </>  
            }
      
            {type === 'HealthCheck' &&
                <>
                    <InputLabel id="entry-rating">Healt Check Rating</InputLabel>
                    <Select
                        labelId="entry-rating"
                        value={healthCheckRating.toString()}
                        label="Rating"
                        onChange={onHeltCheckRatingChange}
                        fullWidth 
                    >
                        {healthCheckRatingOptions.map(option =>
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        )}
                    </Select>
                </>
            }

            {type === 'OccupationalHealthcare' &&       
                <>
                    <TextField
                        label="Employer Name"
                        type="text"
                        fullWidth 
                        value={employerName}
                        onChange={({ target }) => setEmployerName(target.value)}
                    />
                    <TextField
                        label="Start Date"
                        type="date"
                        fullWidth 
                        value={sickLeave.startDate}
                        onChange={({ target }) => setSickLeave({...sickLeave, startDate : target.value})}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        fullWidth 
                        value={sickLeave.endDate}
                        onChange={({ target }) => setSickLeave({...sickLeave, endDate : target.value})}
                    />
                </>
            }
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