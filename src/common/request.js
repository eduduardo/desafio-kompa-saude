import axios from 'axios';

// hardcoded here, because it's a simple project, the correct is adding an .env
export const API_URL = 'https://assina-prontuario.herokuapp.com';

const JSON_HEADER = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

export function makeRequestParams({ method, headers }) {
  return {
    method,
    headers: {
      ...JSON_HEADER,
      ...headers,
    },
  };
}

async function request({ url, method = 'GET', headers, data }) {
  const requestParams = makeRequestParams({ method, headers });

  return axiosInstance({
    url,
    ...requestParams,
    data,
  }).then(response => response.data);
}

export default request;
