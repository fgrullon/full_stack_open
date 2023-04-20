import Part from './Part';
import { CoursePart } from '../types';

interface ContentProps {
    parts : Array<CoursePart>;
}

const Content = ( { parts }: ContentProps ) => {

    return (
        <div>
        {
            parts.map(p =>  <Part key={p.name} part={p} />)
        }

        </div>

    );
}


export default Content;