import { NewEntry, Visibility, Weather } from "../types";
import React, { useState, SyntheticEvent } from 'react';
import {  TextField, InputLabel, Grid, Button, SelectChangeEvent, Radio } from '@mui/material';

interface Props {
    onSubmit: (values: NewEntry) => void;
}

interface VisibilityOption{
    value: Visibility;
    label: string;
}

interface WeatherOption{
    value: Weather;
    label: string;
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({
    value: v, label: v.toString()
}));

const weatherOptions: WeatherOption[] = Object.values(Weather).map(v => ({
    value: v, label: v.toString()
}));

const EntryForm = ({ onSubmit }: Props):JSX.Element => {
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState<Weather>(weatherOptions[0].value);
    const [visibility, setVisibility] = useState<Visibility>(visibilityOptions[0].value);
    const [comment, setComment] = useState('');

    const onWeatherChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if ( typeof event.target.value === "string") {
          const value = event.target.value;
          const weather = Object.values(Weather).find(g => g.toString() === value);
          if (weather) {
            setWeather(weather);
          }
        }
    };

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

    const handleSubmit = (event: SyntheticEvent) => {
      event.preventDefault();
      onSubmit({ date, weather, visibility, comment });
    }


    return (
        <div style={{ width: 500 }}>
            <h2>Add new entry</h2>
            <form onSubmit={handleSubmit}>
     


        
   <Grid>
        <Grid item>
        <h4>Weather</h4>
        {weatherOptions.map(option =>
          <div key={option.label} style={{ 'float': 'left','width': 80 }}>
            <InputLabel >{option.label}</InputLabel>
            <Radio
              checked={weather === option.value}
              onChange={onWeatherChange}
              
              value={option.value}
              name="radio-buttons"
              inputProps={{ 'aria-label': 'A' }}
            />
            </div>
          )}
        </Grid>
        <TextField
            label="Date"
            type="date"
            fullWidth 
            value={date}
            onChange={({ target }) => setDate(target.value)}
        />
   
        <Grid item>
          <h4>Visibility</h4>
          {visibilityOptions.map(option =>
            <div key={option.label} style={{  'float': 'left', 'width': 80 }}>
              <InputLabel >{option.label}</InputLabel>
              <Radio
                checked={visibility === option.value}
                onChange={onVisibilityChange}
                
                value={option.value}
                name="radio-buttons"
                inputProps={{ 'aria-label': 'A' }}
              />
              </div>
           )}
        </Grid>
    </Grid>
   
        <TextField
            label="Comment"
            fullWidth 
            value={comment}
            onChange={({ target }) => setComment(target.value)}
        />
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
    )

 
}

export default EntryForm;