import { HealthCheckEntry as HealthCheckType, Diagnosis } from '../../types';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    entry: HealthCheckType;
    diagnoses: Diagnosis[];
}
  
const HealthCheckEntry = ({ entry, diagnoses }: Props) => {

    let heartColor = '';
    switch (entry.healthCheckRating) {
        case 0:
            heartColor = 'green';
            break;
        case 1:
            heartColor = 'yellow';
            break;
        case 2:
            heartColor = 'orange';
            break;
        default:
            heartColor = 'red';
            break;
    }


    return (
        <div
        style={{ 
            border : '2px solid black',
            padding: '5px',
            marginBottom: '10px' 

        }}>
            <div>
                {entry.date} 
            </div>
            <div>{entry.description}</div>
            <div><FavoriteIcon style={{color : heartColor}}/> </div>
            <ul>
                { 
                    diagnoses.map(d => <li key={d.code}>{d.code} - {d.name}</li>) 
                }
            </ul>
            <div>diagnose by {entry.specialist}</div>
        </div>
    )
}

export default HealthCheckEntry;