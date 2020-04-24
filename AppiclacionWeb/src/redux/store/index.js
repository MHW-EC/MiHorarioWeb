import { createStore, applyMiddleware } from 'redux'
import todoApp from '../reducers/index'
import reduxSaga from 'redux-saga'
import rootSaga from '../sagas/index'

const sagaiddleware = reduxSaga();

export default () =>{
    return {
        ...createStore(todoApp, applyMiddleware(sagaiddleware)),
        runSaga: sagaiddleware.run(rootSaga)
    };
};
