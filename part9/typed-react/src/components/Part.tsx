import { CoursePart } from '../types';
import { unhandleSwitchCase } from '../utils';

interface PartProps {
    part : CoursePart;
}

const Header = ({ text } : { text : string }) => {
    return <h3>{ text }</h3>
}

const Description = ({ text }: { text : string}) => {
    return <div>{ text }</div>
}

const Part = ( { part }: PartProps  ) => {

    switch (part.kind) {
        case 'basic':
            return (
                <>
                    <Header text={`${part.name} ${part.exerciseCount}`}/>
                    <Description text={part.description}/>
                </>
            );
            
            break;
        case 'group' :
            return (1);
        case 'background':
            return(2);
        default:
            break;
    }

}

export default Part;