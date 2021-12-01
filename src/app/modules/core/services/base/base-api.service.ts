import { Injectable } from '@angular/core';
import { apiClient } from '../../../common/config/utils/apiClient';
import { InerceptorService } from '../../interceptors/interceptor';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor(public interceptorService: InerceptorService) {}
  async getRequestMethod(endpoint: string) {
    return await apiClient
      .get(endpoint)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.log('Error occur ' + e.message);
      });
  }
  async postRequestMethod(endpoint: string, data: object) {
    return await apiClient
      .post(endpoint, data)
      .then((response) => {
        debugger;
        return response;
      })
      .catch((e) => {
        debugger;
        return console.log('Error occur ' + e);
      });
  }

  async putRequestMethod(endpoint: string, data: object) {
    return await apiClient
      .put(endpoint, data)
      .then((response) => {
        debugger;
        return response;
      })
      .catch((e) => {
        debugger;
        return console.log('Error occur ' + e.message);
      });
  }

  async deleteRequestMethod(endpoint: string) {
    return await apiClient
      .delete(endpoint)
      .then((response) => {
        debugger;
        return response;
      })
      .catch((e) => {
        debugger;
        return console.log('Error occur ' + e.message);
      });
  }
}
