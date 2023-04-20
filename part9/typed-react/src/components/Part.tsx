import { CoursePart } from '../types';

interface PartProps {
    part : CoursePart;
}

const Part = ( { part }: PartProps  ) => {
    console.log(part)
    return (<></>);
    // switch (props.kind) {
    //     case 'basic':
    //         return ({ props.name} )
    //     case 'group':
    //         return ({ props} )
    //     case 'background':
    //         return ({ props} )
    //     default:
    //         break;
}

export default Part;