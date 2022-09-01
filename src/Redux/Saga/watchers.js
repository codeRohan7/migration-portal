import { takeLatest } from "redux-saga/effects";

import {
    getContractSagas,
    getmigrateContractSagas
   
} from '../Saga/blockchain'

import * as  blockSagas from '../Action/Auth/AuthConstant'


export default function* watchUserAuthentication() {
    yield takeLatest(blockSagas.GET_BLOCKCHAIN, getContractSagas);
    yield takeLatest(blockSagas.CONNECT_MIGRATE, getmigrateContractSagas);

}


//