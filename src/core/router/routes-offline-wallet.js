import TheWalletOfflineView from '@/views/TheWalletOfflineView';
import Dashboard from '@/views/layouts-wallet/TheDashboardLayout';
import Send from '@/views/layouts-wallet/TheSendTransactionLayout';
import SendOffline from '@/views/layouts-wallet/TheSendTransactionOfflineLayout';
import Settings from '@/modules/settings/ModuleSettings';
// import Notifications from '@/modules/notifications/ModuleNotifications';
import Network from '@/modules/network/ModuleNetwork';
import { ROUTES_WALLET } from '../configs/configRoutes';
export default {
  path: '/wallet',
  component: TheWalletOfflineView,
  props: true,
  children: [
    {
      path: ROUTES_WALLET.WALLETS.PATH,
      name: ROUTES_WALLET.WALLETS.NAME,
      component: Dashboard,
      meta: {
        noAuth: false
      }
    },
    {
      path: ROUTES_WALLET.DASHBOARD.PATH,
      name: ROUTES_WALLET.DASHBOARD.NAME,
      component: Dashboard,
      meta: {
        noAuth: false
      }
    },
    {
      path: ROUTES_WALLET.SETTINGS.PATH,
      name: ROUTES_WALLET.SETTINGS.NAME,
      component: Settings,
      meta: {
        noAuth: false
      }
    },
    {
      path: ROUTES_WALLET.SEND_TX.PATH,
      name: ROUTES_WALLET.SEND_TX.NAME,
      component: Send,
      props: true,
      meta: {
        noAuth: false
      }
    },
    {
      path: ROUTES_WALLET.SEND_TX_OFFLINE.PATH,
      name: ROUTES_WALLET.SEND_TX_OFFLINE.NAME,
      component: SendOffline,
      props: true,
      meta: {
        noAuth: false
      }
    },
    // {
    //   path: ROUTES_WALLET.NOTIFICATIONS.PATH,
    //   name: ROUTES_WALLET.NOTIFICATIONS.NAME,
    //   component: Notifications,
    //   meta: {
    //     noAuth: false
    //   }
    // },
    {
      path: ROUTES_WALLET.NETWORK.PATH,
      name: ROUTES_WALLET.NETWORK.NAME,
      component: Network,
      meta: {
        noAuth: false
      }
    }
  ]
};
