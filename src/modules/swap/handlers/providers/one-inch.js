import MEWPClass from './mew-provider-class';
import { ETH } from '@/utils/networks/types';
class OneInch {
  constructor(web3, chain) {
    return new MEWPClass(
      MEWPClass.supportedDexes.ONE_INCH,
      web3,
      [ETH.name],
      chain
    );
  }
}
export default OneInch;
