import {  TextField, InputLabel, Grid, Button, SelectChangeEvent, Radio } from '@mui/material';
import { useState, SyntheticEvent } from 'react';

const EntryForm = (): JSX.Element => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosisCodes, setDiagnosisCodes] = useState('');


    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
    }

    return <div    style={{ 
        border : '2px solid black',
        padding: '5px',
        marginBottom: '10px' 

    }}>
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
              value={diagnosisCodes}
              onChange={({ target }) => setDiagnosisCodes(target.value)}
          />
                </Grid>

          <Grid>
              <Grid item>
                  <Button
                  style={{
                      float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  >
                  Add
                  </Button>
              </Grid>
          </Grid>
        </form>
    </div>
}

export default EntryForm;