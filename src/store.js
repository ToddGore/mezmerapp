import { createStore, applyMiddleware } from 'redux'
import reducer from './ducks/user'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension';


export default createStore(reducer, composeWithDevTools(applyMiddleware(promiseMiddleware())));