const msal = require("@azure/msal-node");

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL Node configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/configuration.md
 */
// const fs = require("fs/promises");

// // // Call back APIs which automatically write and read into a .json file - example implementation
// const beforeCacheAccess = async (cacheContext) => {
//   cacheContext.tokenCache.deserialize(
//     await fs.readFile("./cache.json", "utf-8")
//   );
// };

// const afterCacheAccess = async (cacheContext) => {
//   if (cacheContext.cacheHasChanged) {
//     await fs.writeFile("./cache.json", cacheContext.tokenCache.serialize());
//   }
// };

// // Cache Plugin
// const cachePlugin = {
//   beforeCacheAccess,
//   afterCacheAccess,
// };

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.AAD_ENDPOINT + "/" + process.env.TENANT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
  // cache: {
  //   cachePlugin,
  // },
};

/**
 * Initialize a confidential client application. For more info, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/initialize-confidential-client-application.md
 */
const cca = new msal.ConfidentialClientApplication(msalConfig);

const apiConfig = {
  uri: process.env.GRAPH_ENDPOINT + "/v1.0/users",
};

/**
 * With client credentials flows permissions need to be granted in the portal by a tenant administrator.
 * The scope is always in the format '<resource>/.default'. For more, visit:
 * https://learn.microsoft.com/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow
 */
const tokenRequest = {
  scopes: [process.env.GRAPH_ENDPOINT + "/.default"],
  // skipCache: true,
};
/**
 * Acquires token with client credentials.
 * @param {object} tokenRequest
 */
async function getToken(tokenRequest) {
  try {
    return await cca.acquireTokenByClientCredential(tokenRequest);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  apiConfig: apiConfig,
  tokenRequest: tokenRequest,
  getToken: getToken,
  // cacheAC: cacheAC,
};
