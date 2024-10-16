import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ConfigurationService } from './config_service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/constants';
import { AxiosConfig } from './axios_config';

@injectable()
class AxiosService implements AxiosConfig {
  private readonly axiosInstance: AxiosInstance;

  constructor(@inject(TYPES.Configuration) private readonly configService: ConfigurationService) {
    this.axiosInstance = axios.create({
      baseURL: this.configService.get('NASSA_API_BASE_URL')
    });

    this.setupInterceptors();
  }

  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (axiosRequestConfig: InternalAxiosRequestConfig) => {
        const params = axiosRequestConfig.params || {};

        if (axiosRequestConfig.url?.startsWith('/neo')) {
          params.api_key = this.configService.get('API_KEY');
        }

        axiosRequestConfig.params = params;
        return axiosRequestConfig;
      },
      (error: Error) => {
        return Promise.reject(error);
      }
    );
  }
}

export { AxiosService };
