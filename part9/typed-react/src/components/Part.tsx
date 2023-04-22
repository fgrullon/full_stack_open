import { CoursePart } from '../types';
import { unhandleSwitchCase } from '../utils';

interface PartProps {
    part : CoursePart;
}

const Header = ({ text } : { text : string }): JSX.Element => {
    return <h3>{ text }</h3>
}

const Description = ({ text }: { text : string }): JSX.Element => {
    return <div>{ text }</div>
}

const ProjectCount = ({ text }: { text : number }): JSX.Element => {
    return <div>{ text }</div>
}



const Part = ( { part }: PartProps  ): JSX.Element => {

    switch (part.kind) {
        case 'basic':
            return (
                <>
                    <Header text={`${part.name} ${part.exerciseCount}`}/>
                    <Description text={part.description}/>
                </>
            );
        case 'group' :
            return(
                <>
                    <Header text={`${part.name} ${part.exerciseCount}`}/>
                    <ProjectCount text={part.groupProjectCount}/>
                </>
            );
            return <></>;
        case 'background':
            return(
                <>
                    <Header text={`${part.name} ${part.exerciseCount}`}/>
                    <Description text={part.backgroundMaterial}/>
                </>
            );        
        default:
            return unhandleSwitchCase(part);
    }

}

export default Part;