/**
 * Production environment settings
 * (sails.config.*)
 *
 * What you see below is a quick outline of the built-in settings you need
 * to configure your Sails app for production.  The configuration in this file
 * is only used in your production environment, i.e. when you lift your app using:
 *
 * ```
 * NODE_ENV=production node app
 * ```
 *
 * > If you're using git as a version control solution for your Sails app,
 * > this file WILL BE COMMITTED to your repository by default, unless you add
 * > it to your .gitignore file.  If your repository will be publicly viewable,
 * > don't add private/sensitive data (like API secrets / db passwords) to this file!
 *
 * For more best practices and tips, see:
 * https://sailsjs.com/docs/concepts/deployment
 */

module.exports = {


  /**************************************************************************
  *                                                                         *
  * Tell Sails what database(s) it should use in production.                *
  *                                                                         *
  * (https://sailsjs.com/config/datastores)                                 *
  *                                                                         *
  **************************************************************************/
  datastores: {

    /***************************************************************************
    *                                                                          *
    * Configure your default production database.                              *
    *                                                                          *
    * 1. Choose an adapter:                                                    *
    *    https://sailsjs.com/plugins/databases                                 *
    *                                                                          *
    * 2. Install it as a dependency of your Sails app.                         *
    *    (For example:  npm install sails-mysql --save)                        *
    *                                                                          *
    * 3. Then set it here (`adapter`), along with a connection URL (`url`)     *
    *    and any other, adapter-specific customizations.                       *
    *    (See https://sailsjs.com/config/datastores for help.)                 *
    *                                                                          *
    ***************************************************************************/
    default: {
      // adapter: 'sails-mysql',
      // url: 'mysql://user:password@host:port/database',
      //--------------------------------------------------------------------------
      //  /\   To avoid checking it in to version control, you might opt to set
      //  ||   sensitive credentials like `url` using an environment variable.
      //
      //  For example:
      //  ```
      //  sails_datastores__default__url=mysql://admin:myc00lpAssw2D@db.example.com:3306/my_prod_db
      //  ```
      //--------------------------------------------------------------------------

      /****************************************************************************
      *                                                                           *
      * More adapter-specific options                                             *
      *                                                                           *
      * > For example, for some hosted PostgreSQL providers (like Heroku), the    *
      * > extra `ssl: true` option is mandatory and must be provided.             *
      *                                                                           *
      * More info:                                                                *
      * https://sailsjs.com/config/datastores                                     *
      *                                                                           *
      ****************************************************************************/
      // ssl: true,

    },

  },



  models: {

    /***************************************************************************
    *                                                                          *
    * To help avoid accidents, Sails automatically sets the automigration      *
    * strategy to "safe" when your app lifts in production mode.               *
    * (This is just here as a reminder.)                                       *
    *                                                                          *
    * More info:                                                               *
    * https://sailsjs.com/docs/concepts/models-and-orm/model-settings#?migrate *
    *                                                                          *
    ***************************************************************************/
    migrate: 'safe',

    /***************************************************************************
    *                                                                          *
    * If, in production, this app has access to physical-layer CASCADE         *
    * constraints (e.g. PostgreSQL or MySQL), then set those up in the         *
    * database and uncomment this to disable Waterline's `cascadeOnDestroy`    *
    * polyfill.  (Otherwise, if you are using a databse like Mongo, you might  *
    * choose to keep this enabled.)                                            *
    *                                                                          *
    ***************************************************************************/
    // cascadeOnDestroy: false,

  },



  /**************************************************************************
  *                                                                         *
  * Always disable "shortcut" blueprint routes.                             *
  *                                                                         *
  * > You'll also want to disable any other blueprint routes if you are not *
  * > actually using them (e.g. "actions" and "rest") -- but you can do     *
  * > that in `config/blueprints.js`, since you'll want to disable them in  *
  * > all environments (not just in production.)                            *
  *                                                                         *
  ***************************************************************************/
  blueprints: {
    shortcuts: false,
  },



  /***************************************************************************
  *                                                                          *
  * Configure your security settings for production.                         *
  *                                                                          *
  * IMPORTANT:                                                               *
  * If web browsers will be communicating with your app, be sure that        *
  * you have CSRF protection enabled.  To do that, set `csrf: true` over     *
  * in the `config/security.js` file (not here), so that CSRF app can be     *
  * tested with CSRF protection turned on in development mode too.           *
  *                                                                          *
  ***************************************************************************/
  security: {

    /***************************************************************************
    *                                                                          *
    * If this app has CORS enabled (see `config/security.js`) with the         *
    * `allowCredentials` setting enabled, then you should uncomment the        *
    * `allowOrigins` whitelist below.  This sets which "origins" are allowed   *
    * to send cross-domain (CORS) requests to your Sails app.                  *
    *                                                                          *
    * > Replace "https://example.com" with the URL of your production server.  *
    * > Be sure to use the right protocol!  ("http://" vs. "https://")         *
    *                                                                          *
    ***************************************************************************/
    cors: {
      // allowOrigins: [
      //   'https://example.com',
      // ]
    },

  },



  /***************************************************************************
  *                                                                          *
  * Configure how your app handles sessions in production.                   *
  *                                                                          *
  * (https://sailsjs.com/config/session)                                     *
  *                                                                          *
  * > If you have disabled the "session" hook, then you can safely remove    *
  * > this section from your `config/env/production.js` file.                *
  *                                                                          *
  ***************************************************************************/
  session: {

    /***************************************************************************
    *                                                                          *
    * Production session store configuration.                                  *
    *                                                                          *
    * Uncomment the following lines to finish setting up a package called      *
    * "@sailshq/connect-redis" that will use Redis to handle session data.     *
    * This makes your app more scalable by allowing you to share sessions      *
    * across a cluster of multiple Sails/Node.js servers and/or processes.     *
    * (See http://bit.ly/redis-session-config for more info.)                  *
    *                                                                          *
    * > While @sailshq/connect-redis is a popular choice for Sails apps, many  *
    * > other compatible packages (like "connect-mongo") are available on NPM. *
    * > (For a full list, see https://sailsjs.com/plugins/sessions)            *
    *                                                                          *
    ***************************************************************************/
    // adapter: '@sailshq/connect-redis',
    // url: 'redis://user:password@localhost:6379/databasenumber',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking it in to version control, you might opt to
    // ||   set sensitive credentials like this using an environment variable.
    //
    // For example:
    // ```
    // sails_session__url=redis://admin:myc00lpAssw2D@bigsquid.redistogo.com:9562/0
    // ```
    //
    //--------------------------------------------------------------------------



    /***************************************************************************
    *                                                                          *
    * Production configuration for the session ID cookie.                      *
    *                                                                          *
    * Tell browsers (or other user agents) to ensure that session ID cookies   *
    * are always transmitted via HTTPS, and that they expire 24 hours after    *
    * they are set.                                                            *
    *                                                                          *
    * Note that with `secure: true` set, session cookies will _not_ be         *
    * transmitted over unsecured (HTTP) connections. Also, for apps behind     *
    * proxies (like Heroku), the `trustProxy` setting under `http` must be     *
    * configured in order for `secure: true` to work.                          *
    *                                                                          *
    * > While you might want to increase or decrease the `maxAge` or provide   *
    * > other options, you should always set `secure: true` in production      *
    * > if the app is being served over HTTPS.                                 *
    *                                                                          *
    * Read more:                                                               *
    * https://sailsjs.com/config/session#?the-session-id-cookie                *
    *                                                                          *
    ***************************************************************************/
    cookie: {
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },

  },



  /**************************************************************************
  *                                                                          *
  * Set up Socket.io for your production environment.                        *
  *                                                                          *
  * (https://sailsjs.com/config/sockets)                                     *
  *                                                                          *
  * > If you have disabled the "sockets" hook, then you can safely remove    *
  * > this section from your `config/env/production.js` file.                *
  *                                                                          *
  ***************************************************************************/
  sockets: {

    /***************************************************************************
    *                                                                          *
    * Uncomment the `onlyAllowOrigins` whitelist below to configure which      *
    * "origins" are allowed to open socket connections to your Sails app.      *
    *                                                                          *
    * > Replace "https://example.com" etc. with the URL(s) of your app.        *
    * > Be sure to use the right protocol!  ("http://" vs. "https://")         *
    *                                                                          *
    ***************************************************************************/
    onlyAllowOrigins: [
      'http://localhost:8080',
    ],


    /***************************************************************************
    *                                                                          *
    * If you are deploying a cluster of multiple servers and/or processes,     *
    * then uncomment the following lines.  This tells Socket.io about a Redis  *
    * server it can use to help it deliver broadcasted socket messages.        *
    *                                                                          *
    * > Be sure a compatible version of @sailshq/socket.io-redis is installed! *
    * > (See https://sailsjs.com/config/sockets for the latest version info)   *
    *                                                                          *
    * (https://sailsjs.com/docs/concepts/deployment/scaling)                   *
    *                                                                          *
    ***************************************************************************/
    // adapter: '@sailshq/socket.io-redis',
    // url: 'redis://user:password@bigsquid.redistogo.com:9562/databasenumber',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking it in to version control, you might opt to
    // ||   set sensitive credentials like this using an environment variable.
    //
    // For example:
    // ```
    // sails_sockets__url=redis://admin:myc00lpAssw2D@bigsquid.redistogo.com:9562/0
    // ```
    //--------------------------------------------------------------------------

  },



  /**************************************************************************
  *                                                                         *
  * Set the production log level.                                           *
  *                                                                         *
  * (https://sailsjs.com/config/log)                                        *
  *                                                                         *
  ***************************************************************************/
  log: {
    level: 'debug'
  },



  http: {

    /***************************************************************************
    *                                                                          *
    * The number of milliseconds to cache static assets in production.         *
    * (the "max-age" to include in the "Cache-Control" response header)        *
    *                                                                          *
    ***************************************************************************/
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year

    /***************************************************************************
    *                                                                          *
    * Proxy settings                                                           *
    *                                                                          *
    * If your app will be deployed behind a proxy/load balancer - for example, *
    * on a PaaS like Heroku - then uncomment the `trustProxy` setting below.   *
    * This tells Sails/Express how to interpret X-Forwarded headers.           *
    *                                                                          *
    * This setting is especially important if you are using secure cookies     *
    * (see the `cookies: secure` setting under `session` above) or if your app *
    * relies on knowing the original IP address that a request came from.      *
    *                                                                          *
    * (https://sailsjs.com/config/http)                                        *
    *                                                                          *
    ***************************************************************************/
    // trustProxy: true,

  },



  /**************************************************************************
  *                                                                         *
  * Lift the server on port 80.                                             *
  * (if deploying behind a proxy, or to a PaaS like Heroku or Deis, you     *
  * probably don't need to set a port here, because it is oftentimes        *
  * handled for you automatically.  If you are not sure if you need to set  *
  * this, just try deploying without setting it and see if it works.)       *
  *                                                                         *
  ***************************************************************************/
  port: 1337,



  /**************************************************************************
  *                                                                         *
  * Configure an SSL certificate                                            *
  *                                                                         *
  * For the safety of your users' data, you should use SSL in production.   *
  * ...But in many cases, you may not actually want to set it up _here_.    *
  *                                                                         *
  * Normally, this setting is only relevant when running a single-process   *
  * deployment, with no proxy/load balancer in the mix.  But if, on the     *
  * other hand, you are using a PaaS like Heroku, you'll want to set up     *
  * SSL in your load balancer settings (usually somewhere in your hosting   *
  * provider's dashboard-- not here.)                                       *
  *                                                                         *
  * > For more information about configuring SSL in Sails, see:             *
  * > https://sailsjs.com/config/*#?sailsconfigssl                          *
  *                                                                         *
  **************************************************************************/
  // ssl: undefined,



  /**************************************************************************
  *                                                                         *
  * Production overrides for any custom settings specific to your app.      *
  * (for example, production credentials for 3rd party APIs like Stripe)    *
  *                                                                         *
  * > See config/custom.js for more info on how to configure these options. *
  *                                                                         *
  ***************************************************************************/
  custom: {
    microChain: '0x36aa307a4157653eafa47f327b11963ccf174ed4',
    dappBase: '0x68b21c47a1c2ea6cb8c6d641c17603f929456240',
    vnodeUri: 'http://39.99.178.42:8545',
    scsUri: 'http://39.99.178.42:8547',
    ERC20ABI: '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"},{"name":"_supply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":false,"name":"_spender","type":"address"},{"indexed":false,"name":"_vaule","type":"uint256"}],"name":"Approval","type":"event"}]',
    DAPP_BASE_ABI: '[{ "constant": true, "inputs": [{ "name": "addrs", "type": "address[]" }, { "name": "addr", "type": "address" }], "name": "have", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "pos", "type": "uint256" }, { "name": "tosend", "type": "address[]" }, { "name": "amount", "type": "uint256[]" }, { "name": "times", "type": "uint256[]" }], "name": "postFlush", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "dappAddr", "type": "address" }], "name": "getDappABI", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "dappAddr", "type": "address" }, { "name": "dappOwner", "type": "address" }, { "name": "dappABI", "type": "string" }, { "name": "state", "type": "uint256" }], "name": "updateDapp", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "newlist", "type": "address[]" }], "name": "updateNodeList", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "userAddr", "type": "address" }, { "name": "pos", "type": "uint256" }], "name": "getRedeemMapping", "outputs": [{ "name": "redeemingAddr", "type": "address[]" }, { "name": "redeemingAmt", "type": "uint256[]" }, { "name": "redeemingtime", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCurNodeList", "outputs": [{ "name": "nodeList", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "curNodeList", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "userAddr", "type": "address" }], "name": "getEnterRecords", "outputs": [{ "name": "enterAmt", "type": "uint256[]" }, { "name": "entertime", "type": "uint256[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "dappAddr", "type": "address" }], "name": "removeDapp", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getDappList", "outputs": [{ "components": [{ "name": "dappAddr", "type": "address" }, { "name": "owner", "type": "address" }, { "name": "dappABI", "type": "string" }, { "name": "state", "type": "uint256" }], "name": "", "type": "tuple[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "dappRecord", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "dappAddr", "type": "address" }], "name": "getDappState", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "dappList", "outputs": [{ "name": "dappAddr", "type": "address" }, { "name": "owner", "type": "address" }, { "name": "dappABI", "type": "string" }, { "name": "state", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "redeemFromMicroChain", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "coinName", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "allDeploySwitch", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "dappAddr", "type": "address" }, { "name": "dappOwner", "type": "address" }, { "name": "dappABI", "type": "string" }], "name": "registerDapp", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "enterPos", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [{ "name": "_name", "type": "string" }, { "name": "_switch", "type": "bool" }], "payable": true, "stateMutability": "payable", "type": "constructor" }]',
    ASM_MICRO_CHAIN_ABI: '[{"constant":true,"inputs":[],"name":"maxMember","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maxFlushInRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"blockReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"per_upload_redeemdata_num","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"removeSyncNode","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"indexInlist","type":"uint256"},{"name":"hashlist","type":"bytes32[]"},{"name":"blocknum","type":"uint256[]"},{"name":"distAmount","type":"uint256[]"},{"name":"badactors","type":"uint256[]"},{"name":"viaNodeAddress","type":"address"},{"name":"preRedeemNum","type":"uint256"}],"name":"createProposal","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"BALANCE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nodeList","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMonitorInfo","outputs":[{"name":"","type":"address[]"},{"name":"","type":"string[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nodeToReleaseCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"scsBeneficiary","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"minMember","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"funcCode","outputs":[{"name":"","type":"bytes"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"senderType","type":"uint256"},{"name":"index","type":"uint256"}],"name":"requestReleaseImmediate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"senderType","type":"uint256"},{"name":"index","type":"uint256"}],"name":"requestRelease","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"consensusFlag","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"BackupUpToDate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"proposals","outputs":[{"name":"proposedBy","type":"address"},{"name":"lastApproved","type":"bytes32"},{"name":"hash","type":"bytes32"},{"name":"start","type":"uint256"},{"name":"end","type":"uint256"},{"name":"flag","type":"uint256"},{"name":"startingBlock","type":"uint256"},{"name":"votecount","type":"uint256"},{"name":"viaNodeAddress","type":"address"},{"name":"preRedeemNum","type":"uint256"},{"name":"distributeFlag","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"num","type":"uint256"}],"name":"updatePerUploadRedeemNum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nodesToDispel","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getVnodeInfo","outputs":[{"components":[{"name":"protocol","type":"address"},{"name":"members","type":"uint256[]"},{"name":"rewards","type":"uint256[]"},{"name":"proposalExpiration","type":"uint256"},{"name":"VnodeProtocolBaseAddr","type":"address"},{"name":"penaltyBond","type":"uint256"},{"name":"subchainstatus","type":"uint256"},{"name":"owner","type":"address"},{"name":"BALANCE","type":"uint256"},{"name":"redeems","type":"uint256[]"},{"name":"nodeList","type":"address[]"},{"name":"nodesToJoin","type":"address[]"}],"name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"close","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"monitors","outputs":[{"name":"from","type":"address"},{"name":"bond","type":"uint256"},{"name":"link","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"txReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERCRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"monitor","type":"address"},{"name":"link","type":"string"}],"name":"registerAsMonitor","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"ERCDecimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"scs","type":"address"}],"name":"getSCSRole","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"indexInlist","type":"uint256"},{"name":"hash","type":"bytes32"},{"name":"redeem","type":"bool"}],"name":"voteOnProposal","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"nodesWatching","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"registerOpen","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"max_redeemdata_num","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"rebuildFromLastFlushPoint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"num","type":"uint256"}],"name":"updatePerRedeemNum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"registerClose","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"currentRefundGas","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"num","type":"uint256"}],"name":"updateRechargeCycle","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"nodeCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"address"},{"name":"link","type":"string"}],"name":"addSyncNode","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"per_recharge_num","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"AUTO_RETIRE","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"penaltyBond","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getholdingPool","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"protocol","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MONITOR_JOIN_FEE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"registerAsSCS","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"beneficiary","type":"address"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"registerAsBackup","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalBond","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"recharge_cycle","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"addFund","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"per_redeemdata_num","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractNeedFund","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nodesToJoin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"nodePerformance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"num","type":"uint256"}],"name":"updatePerRechargeNum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getFlushStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"viaReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddr","type":"address"},{"name":"holdingPoolPos","type":"uint256"}],"name":"getEnteringAmount","outputs":[{"name":"enteringAddr","type":"address[]"},{"name":"enteringAmt","type":"uint256[]"},{"name":"enteringtime","type":"uint256[]"},{"name":"rechargeParam","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"userAddr","type":"address"}],"name":"getRedeemRecords","outputs":[{"components":[{"name":"redeemAmount","type":"uint256[]"},{"name":"redeemtime","type":"uint256[]"}],"name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"},{"name":"index1","type":"uint8"},{"name":"index2","type":"uint8"}],"name":"matchSelTarget","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"nodeToAdd","type":"uint256"}],"name":"registerAdd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"buyMintToken","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_DELETE_NUM","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"syncNodes","outputs":[{"name":"nodeId","type":"address"},{"name":"link","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getFlushInfo","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"getEstFlushBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"syncReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"hash","type":"bytes32"}],"name":"checkProposalStatus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"types","type":"uint256"}],"name":"getProposal","outputs":[{"components":[{"name":"proposedBy","type":"address"},{"name":"lastApproved","type":"bytes32"},{"name":"hash","type":"bytes32"},{"name":"start","type":"uint256"},{"name":"end","type":"uint256"},{"name":"distributionAmount","type":"uint256[]"},{"name":"flag","type":"uint256"},{"name":"startingBlock","type":"uint256"},{"name":"voters","type":"uint256[]"},{"name":"votecount","type":"uint256"},{"name":"badActors","type":"uint256[]"},{"name":"viaNodeAddress","type":"address"},{"name":"preRedeemNum","type":"uint256"},{"name":"redeemAddr","type":"address[]"},{"name":"redeemAmt","type":"uint256[]"},{"name":"minerAddr","type":"address[]"},{"name":"distributeFlag","type":"uint256"},{"name":"redeemAgreeList","type":"address[]"}],"name":"","type":"tuple"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"proposalHashInProgress","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"hash","type":"bytes32"}],"name":"requestEnterAndRedeemAction","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nodesToRelease","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"randIndex","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"indexInlist","type":"uint256"},{"name":"hash","type":"bytes32"}],"name":"requestProposalAction","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"isMemberValid","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"joinCntNow","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"AUTO_RETIRE_COUNT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"initialFlushInRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"selTarget","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"reset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"proposalHashApprovedLast","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"NODE_INIT_PERFORMANCE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"VnodeProtocolBaseAddr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"redeemAddr","type":"address[]"},{"name":"redeemAmt","type":"uint256[]"}],"name":"UploadRedeemData","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"monitor","type":"address"}],"name":"removeMonitorInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_GAS_PRICE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"joinCntMax","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"dappRedeemPos","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ERCAddr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"proposalExpiration","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"DEFLATOR_VALUE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MONITOR_MIN_FEE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"recv","type":"address"},{"name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"txNumInFlush","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalOperation","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"flushInRound","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"proto","type":"address"},{"name":"vnodeProtocolBaseAddr","type":"address"},{"name":"ercAddr","type":"address"},{"name":"ercRate","type":"uint256"},{"name":"min","type":"uint256"},{"name":"max","type":"uint256"},{"name":"thousandth","type":"uint256"},{"name":"flushRound","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"message","type":"string"}],"name":"ReportStatus","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"TransferAmount","type":"event"}]',
    TRANSFER_SHA: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'

    // mailgunDomain: 'mg.example.com',
    // mailgunSecret: 'key-prod_fake_bd32301385130a0bafe030c',
    // stripeSecret: 'sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm',
    //--------------------------------------------------------------------------
    // /\   OR, to avoid checking them in to version control, you might opt to
    // ||   set sensitive credentials like these using environment variables.
    //
    // For example:
    // ```
    // sails_custom__mailgunDomain=mg.example.com
    // sails_custom__mailgunSecret=key-prod_fake_bd32301385130a0bafe030c
    // sails_custom__stripeSecret=sk_prod__fake_Nfgh82401348jaDa3lkZ0d9Hm
    // ```
    //--------------------------------------------------------------------------

  },



};
