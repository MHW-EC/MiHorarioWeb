import {put, takeLatest} from 'redux-saga/effects';
import {GET_CARRERAS, SUCCESS_GET_CARRERAS, GET_FETCH_CARRERAS} from "../actions/carreras"
import axios from 'axios'

function* getCarreras({payload}) {
    try{
       const response =  yield axios.get('/carrera');
       console.log(response.data)
       yield put({type: SUCCESS_GET_CARRERAS, payload:response.data })
    }catch(err){
    }
}
function* getFetchCarreras({payload}) {
    try{
       //yield put({type: GET_FETCH_CARRERAS})
       yield console.log("Solicitando carreras fetches")
    }catch(err){
    }
}
//Watcher
export default function* carreras(){
    yield takeLatest(GET_CARRERAS, getCarreras);
    //yield takeLatest(GET_FETCH_CARRERAS, getFetchCarreras);
}