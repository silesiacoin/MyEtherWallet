import TheDefaultView from '@/views/TheDefaultView';
import TheAccessWalletOfflineLayout from '@/views/layouts-default/TheAccessWalletOfflineLayout';
import { ROUTES_HOME } from '../configs/configRoutes';
import { accessWalletProps, accessRouteGuard } from './helpers';

export default {
  path: '',
  component: TheDefaultView,
  props: true,
  children: [
    {
      path: ROUTES_HOME.ACCESS_WALLET.PATH,
      name: ROUTES_HOME.ACCESS_WALLET.NAME,
      component: TheAccessWalletOfflineLayout,
      props: accessWalletProps,
      meta: {
        noAuth: true
      },
      beforeEnter: accessRouteGuard
    }
  ]
};
