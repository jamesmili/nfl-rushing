import { createStore, combineReducers } from 'redux'
import reducer from '../reducers/reducer'

const reduxStore = () => {
    const store = createStore(
        combineReducers(
            { data: reducer },
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )
    return store
}

export default reduxStore