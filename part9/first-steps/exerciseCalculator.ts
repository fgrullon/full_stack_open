import { getCMDWeekHoursArgs } from "./utils";

interface exerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}


export const calculateExercises = (exerciseHours : number[], target : number): exerciseResult => {

    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(d => d > 0).length;
    const average = exerciseHours.reduce((a,b) => a + b) / periodLength;
    const success = average >= target;
    let rating;
    let ratingDescription;
    if(average < target){
        rating = 1;
        ratingDescription = 'not too bad but could be better';
    }else if(average === target){
        rating = 2;
        ratingDescription = 'Well done';
    }else{
        rating = 3;
        ratingDescription = 'Good job! you did exercise more than you planned';
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
 
};


try {
    const { weekHours, targetHours } = getCMDWeekHoursArgs(process.argv);
    console.log(calculateExercises(weekHours, targetHours));
} catch (error : unknown) {
    let errorMessage = 'Something wrong happened';
    if(error instanceof Error){
        errorMessage += 'Error ' + error.message;
    }
    console.log(errorMessage);
}