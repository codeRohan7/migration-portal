import axios from 'axios';
import { API_PREFIX } from './config';
axios.defaults.baseURL = API_PREFIX;
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.common['Pragma'] = 'no-cache';
axios.defaults.headers.common['Expires'] = -1;
// axios.defaults.headers.common['X-Auth-Token'] = sessionStorage.getItem("userToken");
axios.defaults.headers.common['Access-Control-Allow-Origin']="*";
axios.defaults.headers.common['Access-Control-Allow-Methods']="GET,PUT,POST,DELETE,PATCH,OPTIONS";

export const setAuthToken = token => {
  axios.defaults.headers.common['X-Auth-Token'] = token;
};
// export const setAuthHeader = token => {
//   axios.defaults.headers.common['Authorization'] = {"Bearer": token};
// };

export const setAuthHeader = token => {
  return axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
};

// export const setAuthHeader = (token) => {
//   if (token) {
//     return { Authorization: 'Bearer ' + token };
//   } else {
//     return {};
//   }
// }


// axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token");

export const get = async (url, config) => {
  return (await axios.get(url, config)).data;
};
export const post = async (url, data) => {
  return (await axios.post(url, data)).data;
};

export const put = async (url, data) => {
  return (await axios.put(url, data)).data;
};

export const deleteRec = async url => {
  return (await axios.delete(url)).data;
};

export const deleteRecWithData = async (url, data) => {
  return (await axios({ method: 'delete', url: url, data: data })).data;
};










export const getBlob = async (url, config = {}) => {
  config.responseType = 'blob';
  return await axios.get(url, config);
};

export const getImageBase64 = async url => {
  return await axios
    .get(url, { responseType: 'arraybuffer' })
    .then(
      response =>
        `data:${response.headers['content-type']};base64,${btoa(
          String.fromCharCode(...new Uint8Array(response.data))
        )}`
    )
    .catch(error => {
      return null;
    });
};
export const generateApiParameters = (pagination, filters, sorter) => {
  let params = {
    limit: pagination.pageSize,
    offset: (pagination.current - 1) * pagination.pageSize,
    sort:
      sorter.field && `${sorter.order === 'descend' ? '-' : '+'}${sorter.field}`
  };
  Object.keys(filters).forEach(item => {
    if (filters[item]) {
      params[item] = filters[item][0];
    }
  });
  return params;
};

// Interceptor Functions

export const passThroughResponse = response => response;



export const handleRequestError = error => {
  return Promise.reject(error);
};


