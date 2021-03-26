import axios from 'axios';
import { app } from './config';
import { iconCodes } from './constants';

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

const getApi = (api: string) => axios.get(api, { timeout: app.timeout });
const postApi = (api: string, data?: object) => axios.post(api, data, { timeout: app.timeout });
const putApi = (api: string, data?: object) => axios.put(api, data, { timeout: app.timeout });
const deleteApi = (api: string) => axios.delete(api, { timeout: app.timeout });

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
  loading?: boolean;
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

const RSAKey = require('react-native-rsa');

export const rsa = new RSAKey();

const bits = 1024;
const exponent = '10001';
rsa.generate(bits, exponent);

export const getKey = () => {
  const publicKey = rsa.getPublicString();
  const privateKey = rsa.getPrivateString();
  return { publicKey, privateKey };
};

export const includes = (arr: any[], item: any) => {
  return arr.findIndex((i: any) => i.id === item.id) !== -1;
  // return arr.filter((i: any) => i.id === item.id).length > 0;
};

export const stringToBlocks = (str: string) => {
  const strs = str.split(' ');
  let type = 0;
  let noText = true;
  let arr: { type: 0 | 1; value: string }[] = [];
  strs.map((item: any) => {
    if (iconCodes.includes(item)) {
      type = 0;
      arr.push({ type: 0, value: item });
    } else {
      noText = false;
      if (type === 0) {
        arr.push({ type: 1, value: item });
      } else {
        arr[arr.length - 1].value += ' ' + item;
      }
      type = 1;
    }
  });
  return { arr, noText };
};
