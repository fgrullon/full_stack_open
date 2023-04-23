
interface Part {
    name : string,
    exerciseCount : number
}

interface TotalProps {
    parts : Part[]
}

const Total = ( props: TotalProps ): JSX.Element => {

    return (
        <div>
        Number of exercises{' '}
        { props.parts.reduce((carry, part) => carry + part.exerciseCount, 0) }
        </div>
    );

}

export default Total;


