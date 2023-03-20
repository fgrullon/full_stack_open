import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
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

export default Filter