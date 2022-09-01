import { put, call } from "redux-saga/effects";

import * as types from "../Action/Auth/AuthConstant";
import * as api from "../../utils/api";
import Web3 from 'web3'
import {abis} from '../../Abis/abis'

const contractkishimotoV1 = '0x9023941af3D137c918f61e8ab804b79A325b8cE8';
const contractkishimotoV1BSC = '0x6aA66ef69BaA89707fBcfE44CA16f01239CD4BF2';

const contractkatsumi = '0xAe0B8101347c708EfD8bb4133BC2E77958F7BF13'
const contractMigrate = '0x561fabeC1967f07a859004Db7686d8422c6Cafeb'





const web3 =new Web3(new Web3.providers.HttpProvider("https://rpc.ankr.com/eth_ropsten"));
export function* getContractSagas(val) {
	
    if (val?.value) {
        let response = "";
        const { value } = val
    switch (value) {
        case 'kishimotoV1':
            try {
                response = new web3.eth.Contract(

                    abis.onkishimotoV1,
                    contractkishimotoV1
                )
                yield put({ type: types.GET_BLOCKCHAIN_SUCCESS, response });
            }
            catch (error) {
                yield put({
                    type: types.GET_BLOCKCHAIN_ERROR, response: error
                });
                return false;
            }
            break;
    


            case 'Katsumi':
                try {
                    response = new web3.eth.Contract(
                        abis.onkatsumi,
                        contractkatsumi
                    )
                    yield put({ type: types.GET_BLOCKCHAIN_SUCCESS, response });
                }
                catch (error) {
                    yield put({
                        type: types.GET_BLOCKCHAIN_ERROR, response: error
                    });
                    return false;
                }
                break;
    
         
            
        default:
            break;
    }
     
        
    }
}

export function* getmigrateContractSagas() {
	
        let response = "";
        try {
            response = new web3.eth.Contract(

                abis.onmigrateContract,
                contractMigrate
            )
            yield put({ type: types.CONNECT_MIGRATE_SUCCESS, response });
        }
        catch (error) {
            yield put({
                type: types.CONNECT_MIGRATE_ERROR, response: error
            });
            return false;
        }
     
        
}

