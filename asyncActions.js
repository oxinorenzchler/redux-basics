const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
//For async actions use redux-thunk
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

//Step 1: initialize state
const initState = {
    loading: false,
    users: [],
    error: ''
}

//Step 2: create actions
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'


const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

// Step 3: define reducer
const reducer = (state = initState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST: return {
            ...state,
            loading: true
        }
        case FETCH_USERS_SUCCESS: return {
            loading: false,
            users: action.payload,
            error: ''
        }
        case FETCH_USERS_FAILURE: return {
            loading: false,
            users: [],
            error: action.payload
        }
    }
}

//Step 6: Define aync functions / redux-thunk in action
const fetchUsers = () => {
     //action creator returns an action object but redux-thunk returns functions
     /*
        {
            type: Foo //this is an action object
        }

        function (){
            //this is function
        }
     */
     
    //received dispatch as param by default / notice that actions dipatched is SYNC
    return function (dispatch){
        //retrieve users
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                //fetch users
                let users = response.data.map( user => user.name)
                dispatch(fetchUsersSuccess(users))
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message))
            })
    }
}


//Step 4: Create store
//Step 5: Use middleware and import redux-thunk middleware for async actions. 
const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger))

//Step 7: Subsribe to store
store.subscribe(() => {
    //do whatever you wanna do here.
})

//Step 8: Dispatch aysnc action
store.dispatch(fetchUsers())
