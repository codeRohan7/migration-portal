import React, { useEffect, useState } from "react";
import Wallet from "./wallets";
import {
  getcontract,
  connectMigrateContract,
} from "../Redux/Action/Auth/index";
import { useDispatch, useSelector } from "react-redux";
import {
  BsGlobe,
  BsTwitter,
  BsTelegram,
  BsInstagram,
  BsLinkedin,
  BsDiscord,
} from "react-icons/bs";
import Swal from "sweetalert2";
import { AiFillMediumCircle } from "react-icons/ai";
import Web3 from "web3";
const Migrate = (props) => {
  const dispatch = useDispatch();
  const [contract, setcontract] = useState("");
  const [account, setAccount] = useState("");
  const [walletbalance, setwalletbalance] = useState("");
  const [migrateContract, setMigrate] = useState("");
  const [MigrateBalance, setMigrateBalance] = useState("");
  const [allowance, setAllowance] = useState("");
  const [selectedToken, setSelectedToken] = useState("");
  const [Approved, setApproved] = useState(false);
  const [Toastsuccess, setToastsuccess] = useState(false);

  const Toast = Swal.mixin({
    position: "bottom-right",
    iconColor: "success",
    customClass: {
      popup: "colored-toast",
    },
    showConfirmButton: false,

    timerProgressBar: true,
  });
  // useEffect(() => {
  //   dispatch(getcontract("kishimotoV1", "3"));
  //   dispatch(connectMigrateContract());
  // }, []);

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
console.log(connectMigrateReducerData);
    setwalletbalance("");
    setMigrateBalance("");
  }, [connectWalletReducerData, getcontractReducerData]);

  useEffect(() => {
    setSelectedToken("");
  }, [connectMigrateReducerData]);

  console.log(migrateContract);
  useEffect(() => {
    if (account) {
      contract.methods
        .allowance(account?.account, migrateContract?._address)
        .call()
        .then((allowance_balance) => {
          console.log(allowance_balance);
          setAllowance(allowance_balance);
        });
      contract.methods
        ?.balanceOf(account?.account)
        .call()
        .then((wallet_balance) => {
          console.log(wallet_balance);
          // const etherValue = Web3.utils.fromWei(wallet_balance, "ether");
          setwalletbalance(wallet_balance);
        });
    }
  }, [contract]);
  const handleSwitchToken = (e) => {
    setSelectedToken(e);
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
        .then((migrate_balance) => {
          // const etherValue = Web3.utils.fromWei(res, "ether");
          setMigrateBalance(migrate_balance);
        });
    }
  }, [walletbalance]);

  const handleMigrate = () => {
    console.log(selectedToken);
    if (walletbalance || account || selectedToken) {
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
        .on("error", function (error) {
          if (error) {
            Toast.fire({
              text: error?.message,
              icon: "error",
              customClass: {
                container: "position-absolute",
              },
              toast: true,
              timer: 5000,

              position: "bottom-right",
            });
          }
        })
        .on("transactionHash", function (transactionHash) {
          console.log(transactionHash); // contains the new contract address

          Toast.fire({
            text: "confirming migration...",
            icon: "success",
            timer: 10000,

            customClass: {
              container: "position-absolute",
            },
            toast: true,
            position: "bottom-right",
          });
        })
        .on("receipt", function (receipt) {
          console.log(receipt); // contains the new contract address
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          if (account.id == "97" || confirmationNumber == 0) {
            Toast.fire({
              html: `<div>transaction successfull <a style={{color:'blue'}} target='_blank' href='https://testnet.bscscan.com/tx/${receipt.transactionHash}' >View on Explorer</a></div>`,
              icon: "success",
              customClass: {
                container: "position-absolute",
              },
              timer: 8000,

              toast: true,
              position: "bottom-right",
            }).then(() => {
              setSelectedToken("");
              setwalletbalance("");
              setMigrateBalance("");
            });
          } else if (confirmationNumber == 0) {
            Toast.fire({
              html: `<div>transaction successfull <a style={{color:'blue'}} target='_blank' href='https://ropsten.etherscan.io/tx/${receipt.transactionHash}' >View on Explorer</a></div>`,
              icon: "success",
              customClass: {
                container: "position-absolute",
              },
              timer: 8000,

              toast: true,
              position: "bottom-right",
            }).then(() => {
              setSelectedToken("");
              setwalletbalance("");
              setMigrateBalance("");
            });
          }
        })
        .then(function (newContractInstance) {
          console.log(newContractInstance); // instance with the new contract address
        });
    }
  };

  const handleApprove = () => {
    if (walletbalance && account) {
      contract.methods
        .approve(migrateContract._address, walletbalance)
        .send(
          {
            from: account?.account,
          },
          function (error, transactionHash) {
            console.log(error, transactionHash);
          }
        )
        .on("error", function (error) {
          if (error) {
            Toast.fire({
              text: error?.message,
              icon: "error",
              customClass: {
                container: "position-absolute",
              },
              toast: true,
              timer: 5000,

              position: "bottom-right",
            });
          }
        })
        .on("transactionHash", function (transactionHash) {
          Toast.fire({
            text: "Approving transaction...",
            icon: "success",
            customClass: {
              container: "position-absolute",
            },
            toast: true,
            timer: 25000,

            position: "bottom-right",
          });
        })
        .on("receipt", function (receipt) {})
        .on("confirmation", function (confirmationNumber, receipt) {
          if (account.id == "97" || confirmationNumber == 0) {
            Toast.fire({
              html: `<div>transaction successfull <a style={{color:'blue'}} target='_blank' href='https://testnet.bscscan.com/tx/${receipt.transactionHash}' >View on Explorer</a></div>`,
              icon: "success",
              customClass: {
                container: "position-absolute",
              },
              timer: 8000,

              toast: true,
              position: "bottom-right",
            }).then(() => {
              setSelectedToken("");
              setwalletbalance("");
              setMigrateBalance("");
            });
          } else if (confirmationNumber == 0) {
            Toast.fire({
              html: `<div>transaction successfull <a style={{color:'blue'}} target='_blank' href='https://ropsten.etherscan.io/tx/${receipt.transactionHash}' >View on Explorer</a></div>`,
              icon: "success",
              customClass: {
                container: "position-absolute",
              },
              timer: 8000,

              toast: true,
              position: "bottom-right",
            }).then(() => {
              setSelectedToken("");
              setwalletbalance("");
              setMigrateBalance("");
            });
          }
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
                          value={selectedToken}
                          onChange={(e) => handleSwitchToken(e.target.value)}
                          className="btn btn-white dropdown-toggle selectToken"
                          style={{ background: "white" }}
                        >
                          <option disabled selected="true" value={""}>
                            Select Token
                          </option>
                          {account?.id == 97 ? (
                            <option value={"kishimotoV1"}>Kishimoto v1</option>
                          ) : (
                            <>
                              <option value={"kishimotoV1"}>
                                Kishimoto v1
                              </option>
                              <option value="Katsumi">Katsumi</option>
                            </>
                          )}
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
                                disabled
                                type="email"
                                className="form-control"
                                id="walletTokenBalance"
                                aria-describedby="emailHelp"
                              />
                              <small
                                id="emailHelp"
                                className="form-text text-muted"
                              >
                                {walletbalance
                                  ? Web3.utils.fromWei(walletbalance, "ether")
                                  : "0.00"}
                              </small>
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="V2KishimototoReceive">
                              V2 Kishimoto to Receive
                            </label>
                            <div className="form-input-section">
                              <input
                                disabled
                                type="email"
                                className="form-control"
                                id="V2KishimototoReceive"
                                aria-describedby="emailHelp"
                              />
                              <small
                                id="emailHelp"
                                className="form-text text-muted"
                              >
                                {MigrateBalance
                                  ? Web3.utils.fromWei(MigrateBalance, "ether")
                                  : "0.00"}
                              </small>
                            </div>
                          </div>
                          {walletbalance > allowance ? (
                            !Approved ? (
                              <button
                                disabled={!walletbalance > 0}
                                type="button"
                                className="btn btn-outline-success submit-btn"
                                onClick={handleApprove}
                              >
                                {"APPROVE"}
                              </button>
                            ) : (
                              <button
                                disabled={!walletbalance > 0}
                                type="button"
                                className="btn btn-outline-success submit-btn"
                                onClick={handleMigrate}
                              >
                                {"MIGRATE"}
                              </button>
                            )
                          ) : (
                            <button
                              disabled={!walletbalance > 0}
                              type="button"
                              className="btn btn-outline-success submit-btn"
                              onClick={handleMigrate}
                            >
                              {"MIGRATE"}
                            </button>
                          )}
                        </form>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">
            <h2>KISHIMOTO Website</h2>
            <div className="footer-icon">
              <div className="footer_socials">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <BsGlobe size={25} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <BsDiscord size={25} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <BsTwitter size={25} />
                </a>

                <a href="#" target="_blank" rel="noopener noreferrer">
                  <BsTelegram size={25} />
                </a>
                <a
                  href="https://medium.com/@kishimotoinu/kishimoto-inu-852ee953b83f"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillMediumCircle size={25} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Migrate;
