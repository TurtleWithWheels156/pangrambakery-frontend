const API = 'https://6y8pqt1ly8.execute-api.us-east-1.amazonaws.com/dev';
//const API = 'http://localhost:3333';
const axios = require('axios');
// Helper function to fetch data from API.
export async function fetchFromAPI(endpointURL, opts) {
    const { method, data } = { method: 'post', data: null, ...opts };
  
    const res = await axios({
      method,
      url: `${API}/${endpointURL}`,
      //includes argument for data if passed
      ...(data && { data: JSON.stringify(data) }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    return res;
  }
