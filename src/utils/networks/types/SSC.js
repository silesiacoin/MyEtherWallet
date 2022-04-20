import tokens from '@/_generated/tokens/tokens-ssc.json';
import contracts from '@/_generated/contracts/contract-abi-ssc.json';
import eth from '@/assets/images/networks/eth.svg';
import { GOERLI } from '../tlds';

export default {
  name: 'SSC',
  name_long: 'Silesiacoin',
  homePage: 'https://silesiacoin.org',
  blockExplorerTX: 'http://explorer.silesiacoin.com/tx/[[txHash]]',
  blockExplorerAddr: 'http://explorer.silesiacoin.com/address/[[address]]',
  chainID: 4004180,
  tokens: tokens,
  contracts: contracts,
  isTestNetwork: false,
  ens: {
    registry: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
    registrarTLD: 'eth',
    registrarType: 'permanent',
    supportedTld: GOERLI,
    subgraphPath: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens'
  },
  icon: eth,
  currencyName: 'SSC',
  isEthVMSupported: {
    supported: false,
    url: 'http://api.ethvm.com/',
    blockExplorerTX: 'https://ethvm.com/tx/[[txHash]]',
    blockExplorerAddr: 'https://ethvm.com/address/[[address]]',
    websocket: null
  },
  gasPriceMultiplier: 1,
  canBuy: true,
  coingeckoID: 'silesiacoin'
};
