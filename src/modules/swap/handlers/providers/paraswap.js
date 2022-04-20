import MEWPClass from './mew-provider-class';
import { ETH } from '@/utils/networks/types';
class ParaSwap {
  constructor(web3, chain) {
    return new MEWPClass(
      MEWPClass.supportedDexes.PARASWAP,
      web3,
      [ETH.name],
      chain
    );
  }
}
export default ParaSwap;
