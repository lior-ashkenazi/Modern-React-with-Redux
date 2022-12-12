import produce from 'immer';
// NOT all projects going to use immer
// remember how to use useReducer without itf
import {useReducer} from 'react';
import Button from '../components/Button';
import Panel from '../components/Panel';

const INCREMENT_COUNT = 'increment';
const DECREMENT_COUNT = 'decrement';
const SET_VALUE_TO_ADD = 'change-value-to-add';
const ADD_VALUE_TO_COUNT = 'add-value-to-count';

const reducer = (state, action) => {
    switch (action.type) {
        case INCREMENT_COUNT:
            state.count = state.count + 1;
            return;
        case DECREMENT_COUNT:
            state.count = state.count - 1;
            return;
        case SET_VALUE_TO_ADD:
            state.valueToAdd = state.valueToAdd + action.payload;
            return;
        case ADD_VALUE_TO_COUNT:
            // Previously, we wrote *here* in the reducer the logic for the
            // updated value because we'd concentrated in one place
            // in our code the logic of execution - as it
            // saving replicability, as well as bounds the reducer
            // functionality to a set of specific actions as desired
            state.count = state.count + state.valueToAdd;
            state.valueToAdd = 0;
            return;
        default:
            throw new Error('unexpected action type: ' + action.type);
    }
};

function CounterPage({initialCount}) {
    // const [count, setCount] = useState(initialCount);
    // const [valueToAdd, setValueToAdd] = useState(0);
    const [state, dispatch] = useReducer(produce(reducer), {
        count: initialCount,
        valueToAdd: 0
    });

    const increment = () => {
        dispatch({
            type: INCREMENT_COUNT
        });
    };

    const decrement = () => {
        dispatch({
            type: DECREMENT_COUNT
        });
    };

    const handleChange = (event) => {
        // the input could be NaN (for example, user deletes
        // the value there) so with added || 0 as "safety" value
        // (note that NaN is falsy value and || will return the
        // last falsy value which is 0
        const value = parseInt(event.target.value) || 0;

        dispatch({
            type: SET_VALUE_TO_ADD,
            payload: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch({
            type: ADD_VALUE_TO_COUNT
        });
    };

    return (
        <Panel className="m-3">
            <h1 className="text-lg">Count is {state.count}</h1>
            <div className="flex flex-row">
                <Button onClick={increment}>
                    Increment
                </Button>
                <Button onClick={decrement}>
                    Decrement
                </Button>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Add a lot!</label>
                <input value={state.valueToAdd || ''}
                       onChange={handleChange}
                       type="number"
                       className="p-1 m-3 bg-gray-50 border border-gray-300"/>
                <Button>Add it!</Button>
            </form>
        </Panel>
    );
}

export default CounterPage;