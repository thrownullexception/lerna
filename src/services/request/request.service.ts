import axios from 'axios';
import { ENV } from '../../env';
import { JWT_TOKEN_STORAGE_KEY } from '../../app/auth/auth.types';
import { StorageService } from '../storage/storage.service';

const RequestService = axios.create();

RequestService.defaults.baseURL = ENV.APP_URL;

RequestService.interceptors.request.use(
  config => {
    const authToken = StorageService.getString(JWT_TOKEN_STORAGE_KEY);
    config.headers.common.Authorization = `Bearer ${authToken}`;
    return config;
  },
  error => Promise.reject(error),
);

RequestService.interceptors.response.use(
  response => response,
  error => Promise.reject(error),
);

export { RequestService };
