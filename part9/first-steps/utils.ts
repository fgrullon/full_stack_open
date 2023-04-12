interface exerciseArgs {
    weekHours : number [];
    targetHours : number;
}

const checkArrayOnlyNumber = (arr : number[]) => {
    return arr.every(element => {
        return Number.isFinite(element);
    });
};

export const getCMDWeekHoursArgs = ( args : string[] ): exerciseArgs => {

    const hoursArray = args.filter((_a, idx) => idx > 2 && idx < 10).map(a => parseFloat(a));

    if(checkArrayOnlyNumber(hoursArray)){
        return {
            weekHours : hoursArray,
            targetHours : parseInt(args[2])
        };
    }else{
        throw new Error('Week hours expected to be number other type found');
    }


};

export const checkPostParams = ( hours : number[], target : number ): exerciseArgs => {

    const hoursArray = hours.filter((_a, idx) => idx > 2 && idx < 10).map(a => a);

    if(checkArrayOnlyNumber(hours)){
        return {
            weekHours : hoursArray,
            targetHours : target
        };
    }else{
        throw new Error('Week hours expected to be number other type found');
    }


};

interface bmiValues {
    height : number;
    weight : number;
}

export const parsrBMIArguments = ( args : string[] ) : bmiValues => {
    if(args.length < 4) throw new Error('Not enough arguments');
    if(args.length > 4) throw new Error('Too many arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            height : Number(args[2]),
            weight : Number(args[3])
        };
    }else{
        throw new Error('Provided values were not numbers!');
    }
};