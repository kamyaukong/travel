// api.js
const callApi = async (endpoint, method = 'GET', data = null, customHeaders  = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...customHeaders
  };
  // console.log('Headers: ', headers);
  // console.log('Custom headers: ', customHeaders);
  try {
    const config = {
      method,
      headers: headers,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }
    const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, config);

    if (!response.ok) {
      let errorMessage = response.statusText;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        // If response is not JSON, read it as text
        errorMessage = await response.text();
      }

      throw { 
        status: response.status, 
        message: errorMessage 
      };
    }
    return response.json();
  } catch (error) {
    console.error("Error during callApi: ", error);
    throw error;
  }
};

export default callApi;
