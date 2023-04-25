import { NewEntry, Visibility } from "../types";
import { useState } from 'react';
import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

interface Props {
    onCancel: () => void;
    onSubmit: (values: PatientFormValues) => void;
}

const EntryForm = ():JSX.Element => {
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState('');
    const [visibility, setVisibility] = useState('');
    const [comment, setComment] = useState('');

    const onVisibilityChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if ( typeof event.target.value === "string") {
          const value = event.target.value;
          const visibility = Object.values(Visibility).find(g => g.toString() === value);
          if (visibility) {
            setVisibility(visibility);
          }
        }
    };
    const handleSubmit = () => {
        return 1
    }

    return (
        <div>
            <h2>Add new entry</h2>
            <form onSubmit={handleSubmit}>
                <TextField />
                <TextField
                    label="Date"
                    fullWidth 
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                />
                <TextField
                    label="Weather"
                    fullWidth 
                    value={weather}
                    onChange={({ target }) => setWeather(target.value)}
                />
                <TextField
                    label="Visibility"
                    fullWidth 
                    value={visibility}
                    onChange={({ target }) => setVisibility(target.value)}
                />
                <TextField
                    label="Comment"
                    fullWidth 
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                />
                    <InputLabel style={{ marginTop: 20 }}>Gender</InputLabel>
        <Select
          label="Visibility"
          fullWidth
          value={visibility}
          onChange={onVisibilityChange}
        >
        {visibilityOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
   <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
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
    )

 
}

export default EntryForm;