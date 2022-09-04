import React, { useEffect, useState } from "react";
import Wallet from "./wallets";
import {
  getcontract,
  connectMigrateContract,
} from "../Redux/Action/Auth/index";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
const Migrate = (props) => {
  const dispatch = useDispatch();
  const [contract, setcontract] = useState("");
  const [account, setAccount] = useState("");
  const [walletbalance, setwalletbalance] = useState("");
  const [migrateContract, setMigrate] = useState("");
  const [MigrateBalance, setMigrateBalance] = useState("");
  const [allowance, setAllowance] = useState("");

  useEffect(() => {
    dispatch(getcontract("kishimotoV1", "3"));
    dispatch(connectMigrateContract());
  }, []);

  const getcontractReducerData = useSelector(
    (state) => state.getcontractReducer
  );
  const connectWalletReducerData = useSelector(
    (state) => state.connectWalletReducer
  );
  const connectMigrateReducerData = useSelector(
    (state) => state.connectMigrateReducer
  );

  useEffect(() => {
    setcontract(getcontractReducerData?.response);
    setAccount(connectWalletReducerData?.response);
    setMigrate(connectMigrateReducerData?.response);
    setwalletbalance("");
    setMigrateBalance("");
  }, [connectWalletReducerData, getcontractReducerData]);

  useEffect(() => {
    if (account) {
      console.log(contract);
      contract.methods
        .allowance(contract._address, account?.account)
        .call()
        .then((res) => {
          console.log(res);
          setAllowance(res);
        });
      contract.methods
        ?.balanceOf(account?.account)
        .call()
        .then((res) => {
          console.log(res);
          const etherValue = Web3.utils.fromWei(res, "ether");
          setwalletbalance(etherValue);
        });
    }
  }, [contract]);
  const handleSwitchToken = (e) => {
    if (account) {
      const value = { network: e, id: account?.id };
      dispatch(getcontract(value));
    }
  };

  useEffect(() => {
    if (walletbalance && account) {
      migrateContract.methods
        .getClaimableToken(account?.account, contract._address)
        .call()
        .then((res) => {
          console.log(res);
          const etherValue = Web3.utils.fromWei(res, "ether");
          setMigrateBalance(etherValue);
        });
    }
  }, [walletbalance]);

  const handleMigrate = () => {
    if (walletbalance && account) {
  console.log(contract._address);
      migrateContract.methods
        .migrate(contract._address)
        .send(
          {
            from: account?.account,
          },
          function (error, transactionHash) {
            console.log(error, transactionHash);
          }
        )
        .on("error", function (error) {})
        .on("transactionHash", function (transactionHash) {})
        .on("receipt", function (receipt) {
          console.log(receipt); // contains the new contract address
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          console.log(confirmationNumber, receipt);
        })
        .then(function (newContractInstance) {
          console.log(newContractInstance); // instance with the new contract address
        });
    }
  };

  return (
    <>
      <div className="wrapper ">
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
                    <form className="form-section">
                      <div className="btn-group">
                        <select
                          onChange={(e) => handleSwitchToken(e.target.value)}
                          className="btn btn-white dropdown-toggle"
                          style={{ background: "white" }}
                        >
                          <option disabled selected="true" value={""}>
                            Select Token
                          </option>
                          <option value={"kishimotoV1"}>Kishimoto v1</option>
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
                                {walletbalance ? walletbalance : "0.00"}
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
                                {MigrateBalance ? MigrateBalance : "0.00"}
                              </small>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="btn btn-outline-success submit-btn"
                            onClick={handleMigrate}
                          >
                            {" "}
                            {allowance > walletbalance ? "APPROVE" : "MIGRATE"}
                          </button>
                        </form>
                      </div>
                    </form>
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
