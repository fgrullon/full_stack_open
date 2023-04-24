import { Entry } from "../types";

interface EntryProps {
    entry: Entry
}

const DairyEntry = ({ entry }: EntryProps ):JSX.Element => {

    return (
        <div>
            <h3>{ entry.date }</h3>
            <div>visibility: { entry.visibility }</div>
            <div>weather: { entry.weather }</div>
        </div>
    );
}

export default DairyEntry;