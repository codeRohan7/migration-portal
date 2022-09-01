import * as types from "../../Action/Auth/AuthConstant";


export function getcontractReducer(state = [], action) {
    let response = action.response;
    switch (action.type) {
        case types.GET_BLOCKCHAIN:
            return { loading: true, action };
        case types.GET_BLOCKCHAIN_SUCCESS:
            return { loading: true, response };
        case types.GET_BLOCKCHAIN_ERROR:
            return { loading: false, response };
        default:
            return state;
    }
}
export function connectWalletReducer(state = [], action) {
    let response = action?.value;
    switch (action.type) {
        case types.CONNECT_WALLET:
            return { loading: true, response };
        
        default:
            return state;
    }
}


export function connectMigrateReducer(state = [], action) {
    let response = action?.response;
    switch (action.type) {
        case types.CONNECT_MIGRATE:
            return { loading: true, action };
        case types.CONNECT_MIGRATE_SUCCESS:
            return { loading: true, response };
        case types.CONNECT_MIGRATE_ERROR:
            return { loading: false, response };
        default:
            return state;
    }
}


