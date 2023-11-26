// api.js
const callApi = async (endpoint, method = 'GET', data = null, customHeaders  = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...customHeaders
  };
  console.log('Headers: ', headers);
  console.log('Custom headers: ', customHeaders);

  const config = {
    method,
    headers: headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }
  const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, config);

  if (!response.ok) {
    // console.log('response: ', response);
    let errorData;
    try {
      errorData = await response.json();
    } catch (jsonError) {
      // If the response is not in JSON format
      throw new Error(response.statusText || 'Error in API call');
    }
    throw new Error(errorData.message || 'Error in API call');
  }

  return response.json();
};

export default callApi;
