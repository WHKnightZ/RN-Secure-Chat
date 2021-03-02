import axios from 'axios';

const MINUTE = 60;
const HOUR = 3600;
const DAY = 86400;
const WEEK = 604800;
const MONTH = 2592000;
const YEAR = 31536000;

export const timestampToDate = (timestamp: number) => {
  const now = new Date().getTime();
  const date = new Date(timestamp * 1000).getTime();
  const different = (now - date) / 1000;
  if (different < MINUTE) return 'Vài giây trước';
  if (different < HOUR) return Math.floor(different / MINUTE) + ' phút trước';
  if (different < DAY) return Math.floor(different / HOUR) + ' giờ trước';
  if (different < WEEK) return Math.floor(different / DAY) + ' ngày trước';
  if (different < MONTH) return Math.floor(different / WEEK) + ' tuần trước';
  if (different < YEAR) return Math.floor(different / MONTH) + ' tháng trước';
  return Math.floor(different / YEAR) + ' năm trước';
};

const getApi = (api: string) => axios.get(api);
const postApi = (api: string, data?: object) => axios.post(api, data);
const putApi = (api: string, data?: object) => axios.put(api, data);
const deleteApi = (api: string) => axios.delete(api);

const mapApi = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: deleteApi,
};

export const callApi = async (payload: {
  method: 'get' | 'post' | 'put' | 'delete';
  api: string;
  body?: object;
  enableLoading?: boolean;
  msg?: 'string';
}) => {
  let result = {
    code: 500,
    status: false,
    data: null,
  };
  const { method, api, body } = payload;
  try {
    const response = await mapApi[method](api, body);
    const data = response.data;
    result = {
      code: data.code,
      status: data.status,
      data: data.data,
    };
  } catch (error) {}
  return result;
};
