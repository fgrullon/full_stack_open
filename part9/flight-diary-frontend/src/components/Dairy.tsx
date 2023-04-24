import { Entry } from "../types";
import DairyEntry  from "./Entry";

interface DairyProps {
    entries: Array<Entry>
}

const Dairy = ({ entries }: DairyProps ):JSX.Element => {
    return (
        <div>
            <h1>Dairy entries</h1>
            { entries.map(e => <DairyEntry key={e.id} entry={e} />) }
        </div>
    )
    
}

export default Dairy;