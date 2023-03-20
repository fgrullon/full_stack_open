import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const FilterComponent = () => {
    const dispatch = useDispatch()

    return (
        <div>
            filter
            <input 
                type="text" 
                onChange={({ target }) =>dispatch(filterChange(target.value))}
            />
        </div>
    )
}

export default FilterComponent