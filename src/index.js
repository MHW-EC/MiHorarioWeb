import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import storeFn from './redux/store/index';
const store = storeFn();
//import OpcionesMaterias from './components/paso3/opciones-materias';

ReactDOM.render(
	<Provider store={store}>
		<SnackbarProvider>
			<App />
		</SnackbarProvider>
	</Provider>,
	document.getElementById('root')
);
