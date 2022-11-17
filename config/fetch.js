const axios = require("axios");

/**
 * Calls the endpoint with authorization bearer token.
 * @param {string} endpoint
 * @param {string} accessToken
 */
async function callApi(endpoint, body, accessToken) {
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  console.log("request made to web API at: " + new Date().toString());

  try {
    const response = await axios.post(endpoint, body, options);

    // console.log("🐱 ~ file: fetch.js ~ line 19 ~ callApi ~ response", response);
    if (response?.data || response.status === 201) {
      return response.data;
    } else {
      console.log("🐱 ~ file: fetch.js ~ line 19 ~ callApi ~ response");

      throw new Error("Something went wrong");
    }
  } catch (error) {
    throw error;
    // return error;
  }
}

module.exports = {
  callApi: callApi,
};
