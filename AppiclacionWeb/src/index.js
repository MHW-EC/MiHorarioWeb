import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import storeFn from './redux/store/index'
const store = storeFn();
//import OpcionesMaterias from './components/paso3/opciones-materias';

ReactDOM.render(
    <Provider store={store}>
        <App /> </Provider>, document.getElementById('root'));
