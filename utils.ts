import AsyncStorage from '@react-native-community/async-storage';
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

export const callApi = async (payload: { method: 'get' | 'post' | 'put' | 'delete'; api: string; body?: object }) => {
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

export const RSAKey = require('react-native-rsa');

export const rsa = new RSAKey();

export const getKey = () => {
  const publicKey = rsa.getPublicString();
  const privateKey = rsa.getPrivateString();
  return { publicKey, privateKey };
};

export const includes = (arr: any[], item: any) => {
  return arr.findIndex((i: any) => i.id === item.id) !== -1;
};

export const stringToBlocks = (str: string) => {
  if (!str) return { blocks: [], noText: true };
  const strs = str.trim().split(' ');
  let type = 0;
  let noText = true;
  let blocks: { type: 0 | 1; value: string }[] = [];
  strs.map((item: any) => {
    if (iconCodes.includes(item)) {
      type = 0;
      blocks.push({ type: 0, value: item });
    } else {
      noText = false;
      if (type === 0) {
        blocks.push({ type: 1, value: item });
      } else {
        blocks[blocks.length - 1].value += ' ' + item;
      }
      type = 1;
    }
  });
  return { blocks, noText };
};

/**
 * Generate rsa public, private key and create a test message
 */
export const generateKey = () => {
  const bits = 1024;
  // 65537 is commonly used as a public exponent in the RSA cryptosystem.
  // Because it is the Fermat number Fn = 2^(2^n) + 1 with n = 4
  const exponent = '10001'; // 0x10001 => 65537
  rsa.generate(bits, exponent);
  const { publicKey, privateKey } = getKey();
  const testMessage = rsa.encrypt('SC');
  return { publicKey, privateKey, testMessage };
};

/**
 * Save security level to local storage
 */
export const saveSecurityLevel = async (username: string, level: number) => {
  await AsyncStorage.setItem(
    `${username}-security-level`,
    JSON.stringify({ level, lastTime: new Date().getTime() / 1000 })
  );
};

export const PI_DOUBLE = 6.283185;
const mapSin = Array.from({ length: 314 }).map((_, index) => Math.sin(index / 50));

/**
 * Get sin value from array
 * @param x input number want to get sin
 */
export const getSin = (x: number) => {
  let y = Math.trunc(x / PI_DOUBLE);
  if (x < 0.0) y -= 1;
  x -= y * PI_DOUBLE;
  return mapSin[Math.trunc(x * 50)];
};
