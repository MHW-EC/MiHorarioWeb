import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import reduxSaga from 'redux-saga'
import rootSaga from '../sagas/index'
import * as actionCreatorsC from '../actions/carreras'
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = reduxSaga();

export default function configureStore(preloaderState){
    const composeEnhancers = composeWithDevTools({ actionCreatorsC, trace: true, traceLimit: 25 });
    const store = createStore(rootReducer, preloaderState, composeEnhancers(applyMiddleware(sagaMiddleware),
   
    ))
    return {...store, runSaga: sagaMiddleware.run(rootSaga)} ;
}



/* export default () => {
    return {
        ...createStore(
            rootReducer,
            composeWithDevTools(applyMiddleware(sagaMiddleware))
        ),
        runSaga: sagaMiddleware.run(rootSaga),
    };
}; */
