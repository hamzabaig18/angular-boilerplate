import axios from 'axios';
import { config } from '../appConfig';
export const apiClient = axios.create({
  baseURL: config.baseApiUrl,
});
