import {
  GET_BLOCKCHAIN,
  CONNECT_WALLET,
  CONNECT_MIGRATE
 
} from "./AuthConstant";

export const getcontract = (value) => {
  const type = GET_BLOCKCHAIN;
  return { type, value };
};

export const connectWalletAction = (value) => {
  const type = CONNECT_WALLET;
  return { type, value };
};

export const connectMigrateContract = () => {
  const type = CONNECT_MIGRATE;
  return { type };
};

