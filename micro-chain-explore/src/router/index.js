window.Vue.use(window.VueRouter)

export default new window.VueRouter({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: (resolve) => require(['@/page/HomePage'], resolve)
    },
    {
      path: '/block',
      name: 'Blocks',
      component: (resolve) => require(['@/page/Blocks'], resolve)
    },
    {
      path: '/blockDetail',
      name: 'BlockDetail',
      component: (resolve) => require(['@/page/BlockDetail'], resolve)
    },
    {
      path: '/trade',
      name: 'Transactions',
      component: (resolve) => require(['@/page/Transactions'], resolve)
    },
    {
      path: '/tradeDetail',
      name: 'TransactionDetail',
      component: (resolve) => require(['@/page/TransactionDetail'], resolve)
    },
    {
      path: '/walletDetail',
      name: 'WalletDetail',
      component: (resolve) => require(['@/page/WalletDetail'], resolve)
    },
    {
      path: '/ERC20',
      name: 'ERC20',
      component: (resolve) => require(['@/page/ERC20'], resolve)
    },
    {
      path: '/ERC20Detail',
      name: 'ERC20Detail',
      component: (resolve) => require(['@/page/ERC20Detail'], resolve)
    }
  ]
})
