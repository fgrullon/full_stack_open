import Part from './Part';

interface Part {
    name : string,
    exerciseCount : number
}

interface ContentProps {
    parts : Part[]
}

const Content = ( props: ContentProps ) => {

    return (
        <div>
        {
            props.parts.map(p => { 
                return <Part key={p.name} part={p} />
                // return  <p key={p.name}> { p.name } { p.exerciseCount } </p>
            })
        }

        </div>

    );
}


export default Content;