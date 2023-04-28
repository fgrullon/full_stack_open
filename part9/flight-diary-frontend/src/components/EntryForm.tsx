import { NewEntry, Visibility, Weather } from "../types";
import { useState } from 'react';
import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

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
    const [weather, setWeather] = useState('');
    const [visibility, setVisibility] = useState('');
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
    const handleSubmit = () => {
        return 1
    }

    return (
        <div style={{ width: 300 }}>
            <h2>Add new entry</h2>
            <form onSubmit={handleSubmit}>
        <TextField
            label="Date"
            fullWidth 
            value={date}
            onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Weather</InputLabel>
        <Select
          label="Weather"
          fullWidth
          value={weather}
          onChange={onWeatherChange}
        >
        {weatherOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>

        <InputLabel style={{ marginTop: 20 }}>Visibility</InputLabel>
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