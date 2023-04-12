import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { checkPostParams } from './utils';

const app = express();
app.use(express.json());

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


app.post('/exercises', (req, res) => {


    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {daily_exercises, target} = req.body;

        if(!daily_exercises || !target){
            res.json({  error: "parameters missing" });
        }else{
            const { weekHours, targetHours } = checkPostParams(daily_exercises as number[], target as number);
            res.json(calculateExercises(weekHours, targetHours));   
        }
   
    } catch (error : unknown) {
        res.json({ error: "malformatted parameters" });
    }

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});