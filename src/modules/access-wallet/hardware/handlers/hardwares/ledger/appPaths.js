import { ETH } from '@/utils/networks/types';
import {
  ledgerEthereum,
  ledgerLiveEthereum
} from '@/modules/access-wallet/hardware/handlers/configs/configPaths';
const appList = [
  {
    network: ETH,
    paths: [ledgerEthereum, ledgerLiveEthereum]
  }
];
export default appList;
