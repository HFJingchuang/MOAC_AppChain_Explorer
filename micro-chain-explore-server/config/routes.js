/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'GET /api/v1/blocks/get-blocks-list': { action: 'blocks/get-blocks-list' },
  'GET /api/v1/get-hash-type': { action: 'get-hash-type' },
  'GET /api/v1/blocks/get-blocks-detail-by-hash': { action: 'blocks/get-blocks-detail-by-hash' },
  'GET /api/v1/blocks/get-blocks-detail-by-block-num': { action: 'blocks/get-blocks-detail-by-block-num' },
  'GET /api/v1/blocks/get-blocks-trades-count': { action: 'blocks/get-blocks-trades-count' },
  'GET /api/v1/transactions/get-transactions-list': { action: 'transactions/get-transactions-list' },
  'GET /api/v1/transactions/get-transaction-detail-by-hash': { action: 'transactions/get-transaction-detail-by-hash' },
  'GET /api/v1/transactions/get-transactions-count': { action: 'transactions/get-transactions-count' },
  'GET /api/v1/get-trade-list-by-address': { action: 'get-trade-list-by-address' },
  'GET /api/v1/get-asset-list-by-address': { action: 'get-asset-list-by-address' },
  'GET /api/v1/get-micro-chain-info': { action: 'get-micro-chain-info' },
  'POST /api/v1/get-is-erc20': { action: 'get-is-erc20' },
  'Get /api/v1/get-erc20-info': { action: 'get-erc20-info' },
  'GET /api/v1/erc20/get-erc20-list': { action: 'erc20/get-erc20-list' },
  'GET /api/v1/erc20/get-erc20-detail': { action: 'erc20/get-erc20-detail' },
  'GET /api/v1/erc20/get-erc20-holder-list': { action: 'erc20/get-erc20-holder-list' },
  'GET /api/v1/erc20/get-erc20-trade-list': { action: 'erc20/get-erc20-trade-list' },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
};
