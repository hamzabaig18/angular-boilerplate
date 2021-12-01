import { Injectable } from '@angular/core';
import { apiClient } from './../../common/config/utils/apiClient';
import { IsLoadingService } from '../../core/services/loading/is-loading.service';
@Injectable({
  providedIn: 'root',
})
export class InerceptorService {
  constructor(public isLoadingService: IsLoadingService) {
    apiClient.interceptors.request.use(
      function (config) {
        //store.state.isLoading = true;
        isLoadingService.isLoading.next(true);
        return config;
      },
      function (error) {
        // Do something with request error

        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    apiClient.interceptors.response.use(
      function (response) {
        //store.state.isLoading = false;
        isLoadingService.isLoading.next(false);
        return response;
      },
      function (error) {
        //store.state.isLoading = false;
        isLoadingService.isLoading.next(false);
        return Promise.reject(error);
      }
    );
  }
}
