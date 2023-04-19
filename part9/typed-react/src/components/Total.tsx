
interface Part {
    name : string,
    exerciseCount : number
}

interface TotalProps {
    parts : Part[]
}

const Total = ( props: TotalProps ) => {

    return (
        <>
        Number of exercises{' '}
        { props.parts.reduce((carry, part) => carry + part.exerciseCount, 0) }
        </>
    );

}

export default Total;


