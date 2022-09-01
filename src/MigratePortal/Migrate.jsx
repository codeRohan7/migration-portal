import React,{useEffect,useState} from "react";
import Wallet from "./wallets";
import {getcontract,connectMigrateContract} from '../Redux/Action/Auth/index'
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
const Migrate = (props) => {
const dispatch = useDispatch()
const [contract,setcontract]=useState('')
const [account,setAccount]=useState('')
const [walletbalance,setwalletbalance]=useState('')
const [migrateContract,setMigrate]=useState('')
const [MigrateBalance,setMigrateBalance]=useState('')





useEffect(() => {
  dispatch(getcontract('kishimotoV1'))
  dispatch(connectMigrateContract())

}, [])

const getcontractReducerData = useSelector(state=>state.getcontractReducer)
const connectWalletReducerData = useSelector(state=>state.connectWalletReducer)
const connectMigrateReducerData = useSelector(state=>state.connectMigrateReducer)



useEffect(() => {

    setcontract(getcontractReducerData?.response)
     setAccount(connectWalletReducerData?.response)
     setMigrate(connectMigrateReducerData?.response)

}, [connectWalletReducerData,getcontractReducerData,])

useEffect(() => {

  if(account){
    contract.methods?.balanceOf(account?.accounts[0]).call().then((res)=>{
      const etherValue = Web3.utils.fromWei(res, 'ether');
      setwalletbalance(etherValue)
    })
  }
}, [contract])

const handleSwitchToken = (e)=>{

   dispatch(getcontract(e))
 
}


useEffect(() => {
if(walletbalance &&account){
  migrateContract.methods.getClaimableToken(account?.accounts[0],contract._address).call().then((res)=>{
    const etherValue = Web3.utils.fromWei(res, 'ether');
    setMigrateBalance(etherValue)
  })
}

}, [walletbalance])

  return (
    <>
      <div className="wrapper ">
        {/* Header start */}
      
        {/* Header end */}
        {/* content start */}
        <div className="main-content">
          <div className="container">
            <div
              className="outer-section"
              style={{
                backgroundImage: 'url("/assets/images/Group_88.png")',
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className="inner-section"
                style={{
                  backgroundImage: 'url("/assets/images/IMG_2934_2.png")',
                  backgroundRepeat: "no-repeat",
                  margin: "0 auto",
                }}
              >
                <div className="main-heading">
                  <h1 className="content-heading">
                    KISHIMOTO <span>MIGRATION</span>
                  </h1>
                  <p>
                    Migrate your ETH Kishimoto and Katsumi tokens to Kishimoto
                    v2 Or migrate your BSC Kishimoto to Kishimoto v2
                  </p>
                </div>
                <div className="clipPath-section">
                  <div className="main-clipPath">
                    <h3>MIGRATE</h3>
                    <div className="form-section">
                      <div className="btn-group">
                        <select onChange={(e)=>handleSwitchToken(e.target.value)}
                          className="btn btn-white dropdown-toggle"
                          style={{ background: "white" }}
                        >
                            <option disabled selected="true" value={''}>Select Token</option>
                          <option value={'kishimotoV1'}>Kishimoto v1</option>
                          <option value="Katsumi">Katsumi</option>
                        </select>
                      </div>
                      <div className="form-start">
                        <form>
                          <div className="form-group">
                            <label htmlFor="walletTokenBalance">
                              Wallet Token Balance
                            </label>
                            <div className="form-input-section">
                              <input
                                type="email"
                                className="form-control"
                                id="walletTokenBalance"
                                aria-describedby="emailHelp"
                              />
                              <small
                                id="emailHelp"
                                className="form-text text-muted"
                              >
                             {walletbalance?walletbalance:'0.00'}
                              </small>
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="V2KishimototoReceive">
                              V2 Kishimoto to Receive
                            </label>
                            <div className="form-input-section">
                              <input
                                type="email"
                                className="form-control"
                                id="V2KishimototoReceive"
                                aria-describedby="emailHelp"
                              />
                              <small
                                id="emailHelp"
                                className="form-text text-muted"
                              >
                               {MigrateBalance?MigrateBalance:'0.00'}
                              </small>
                            </div>
                          </div>
                
                          <button
                            type="submit"
                            className="btn btn-outline-success submit-btn"
                          >
                            {" "}
                            MIGRATE{" "}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Migrate;
