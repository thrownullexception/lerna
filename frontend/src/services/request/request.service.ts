import axios from 'axios';
import { ENV } from '../../env';
import { JWT_TOKEN_STORAGE_KEY } from '../../app/auth/auth.types';
import { StorageService } from '../storage/storage.service';
import { NavigationService } from '../navigation/navigation.service';
import { AuthSignInPath } from '../../screens/Auth/Auth.types';

const UNAUTHORIZED_STATUS_CODE = 401;

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
  error => {
    if (error.response.status === UNAUTHORIZED_STATUS_CODE) {
      StorageService.removeString(JWT_TOKEN_STORAGE_KEY);
      NavigationService.goTo(AuthSignInPath);
      return Promise.resolve(null);
    }
    return Promise.reject(error);
  },
);

export { RequestService };
