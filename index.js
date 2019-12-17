const redux = require('redux')
const reduxLogger = require('redux-logger')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
// middleware
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()


// Creating action
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICECREAM = 'BUY_ICECREAM'

// action creator is a function that returns the action
function buyCake(){
    return {
        // this is the action
        // type property is required. Other property depends on you
        type: BUY_CAKE,
        info: 'First redux action'
    }
} 

function buyIcecream(){
    return {
        type: BUY_ICECREAM,
        info: 'From ice cream'
    }
}

// Creating reducer
//(previousState, action) => newState

// const initState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20,
// }

// returns new state / single reducer approach
// const reducer = (state = initState, action) => {
//     switch(action.type){
//         case BUY_CAKE: return{
//             ...state,
//             numOfCakes: state.numOfCakes - 1
//         }

//         case BUY_ICECREAM: return {
//             ...state,
//             numOfIceCreams: state.numOfIceCreams - 1
//         }

//         default: return state
//     }
// }

//Multiple reducer approach
const initCakeState = {
    numOfCakes: 10
}

const cakeReducer = (state = initCakeState, action) => {
    switch(action.type){
        case BUY_CAKE: return{
            ...state,
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}


const initIceCreamState = {
    numOfIceCreams: 20
}

const iceCreamReducer = (state = initIceCreamState, action) => {
    switch(action.type){
        case BUY_ICECREAM: return {
            ...state,
            numOfIceCreams: state.numOfIceCreams - 1
        }
        default: return state
    }
}

// creating store
// const store = createStore(reducer) //single reducer

//combine multiple reducer
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

//second param is the middleware it extends the functionality of redux,
//use for thirdparty, async calls reporting and analysis during the cycle of action to store
//logger is a third party library print all action made by redux
const store = createStore(rootReducer, applyMiddleware(logger)) //multiple reducer

//subscribe event / unsubscribe
const unsubscribe = store.subscribe(() => {})
//dispatch action
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
//unsubscribe
unsubscribe()