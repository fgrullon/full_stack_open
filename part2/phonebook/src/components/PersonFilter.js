
const PersonFilter = ({handleFilter}) => {

    return (
        <div>
            <div>
                filter shown with: 
            <input onChange={handleFilter} />
            </div>
            <h2>add a new</h2>
        </div>
    );
}

export default PersonFilter;