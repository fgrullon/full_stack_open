
interface bmiValues {
    height : number;
    weight : number;
}

const partArguments = ( args : string[] ) : bmiValues => {
    if(args.length < 4) throw new Error('Not enough arguments')
    if(args.length > 4) throw new Error('Too many arguments')

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            height : Number(args[2]),
            weight : Number(args[3])
        }
    }else{
        throw new Error('Provided values were not numbers!')
    }
}   

const calculateBmi = (weight : number, height : number ) : string => {
    const result = weight / (height * 0.01) ** 2;
    console.log(`weight(${weight}) / (height(${height})) = ${result}`)
    if(result > 40){
        return 'Obese (Class III)';
    }else if(result >= 35.0  && result <= 39.9){
        return 'Obese (Class II)';
    }else if(result >= 30.0  && result <= 34.9){
        return 'Obese (Class I)';
    }else if(result >= 25.0 && result <= 29.9){
        return'Overweight (Pre-obese)';
    }else if(result >= 18.5 && result <= 24.9){
        return 'Normal range';
    }else if(result >= 17.0 && result <= 18.4){
        return 'Underweight (Mild thinness)';
    }else if(result >= 16.0 && result <= 16.9){
        return 'Underweight (Moderate thinness)';
    }else {
        return 'Underweight (Severe thinness)';
    }
}


try {
    const {height, weight} = partArguments(process.argv);
    console.log(calculateBmi(weight, height));
} catch (error : unknown) {
    let errorMessage = 'Something wrong happened';
    if(error instanceof Error){
        errorMessage += 'Error ' + error.message
    }
    console.log(errorMessage)
}