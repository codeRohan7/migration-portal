import { put, call } from "redux-saga/effects";

import * as types from "../Action/Auth/AuthConstant";
import * as api from "../../utils/api";
import Web3 from 'web3'
import {abis} from '../../Abis/abis'
import WalletConnectProvider from "@walletconnect/web3-provider";
const contractkishimotoV1 = '0x9023941af3D137c918f61e8ab804b79A325b8cE8';
const contractkishimotoV2 = '0x95189C1B40a01695e3FfA198cA6722C811be342d';
const contractkishimotoV1BNB = '0x6aA66ef69BaA89707fBcfE44CA16f01239CD4BF2';
const contractkishimotoV2BNB = '0x62909F16C600B018521d30f657c3bfAc3428ac88';
const contractkatsumi = '0xAe0B8101347c708EfD8bb4133BC2E77958F7BF13'
const contractMigrate = '0x561fabeC1967f07a859004Db7686d8422c6Cafeb'
const contractMigratebnb = '0x8BDBDC0Cc6eF90f4C4d83b1c7Bd4aEa05F5548bF'



// localStorage.getItem("p")

let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

export function* getContractSagas(val) {
    
	
    if (val?.value) {
        let response = "";
        const { value } = val
        console.log(value);
        if(value.id=='3'){
            console.log("data");
            switch (value.network) {

                case "kishimotoV1":
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
        }else{
         
            try {
                response = new web3.eth.Contract(

                    abis.onkisimotov1BSC,
                    contractkishimotoV1BNB
                )
                yield put({ type: types.GET_BLOCKCHAIN_SUCCESS, response });
            }
            catch (error) {
                yield put({
                    type: types.GET_BLOCKCHAIN_ERROR, response: error
                });
                return false;
            } 
                 
            
            }
        }
   
    
}

export function* getmigrateContractSagas(val) {
console.log(val);
const { value } = val
console.log(value);
        let response = "";

        switch (value) {

            case 3:
                try {
                    response = new web3.eth.Contract(
        
                        abis.onmigrateContract,
                        contractMigrate
                    )
                    yield put({ type: types.CONNECT_MIGRATE_SUCCESS, response });
                    console.log(response);
                }
                catch (error) {
                    yield put({
                        type: types.CONNECT_MIGRATE_ERROR, response: error
                    });
                    return false;
                }
                break;
        
                case 97:
                    try {
                        response = new web3.eth.Contract(
            
                            abis.onmigratebnb,
                            contractMigratebnb
                        )
                        yield put({ type: types.CONNECT_MIGRATE_SUCCESS, response });
                    }
                    catch (error) {
                        yield put({
                            type: types.CONNECT_MIGRATE_ERROR, response: error
                        });
                        return false;
                    }
                    break;
        
            default:
                break;
        }



      
     
        
}

