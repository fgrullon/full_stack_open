import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if(!isNaN(Number(height)) && !isNaN(Number(weight))){
        const bmi = calculateBmi(Number(weight), Number(height));
        res.send({ weight, height, bmi });
    }else{
        res.send({ error: 'malformatted parameters' });
    }

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});