import axios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios';

import {
    handleChangeRequestHeader,
    handleGeneralError,
    handleNetworkError
} from './tools'

interface IAnyObj {
    [index: string]: unknown;
}

interface BaseResponse<T> {
    code: number;
    message: string;
    data: T;
}

//基础URL，axios将会自动拼接在url前
//process.env.NODE_ENV 判断是否为开发环境 根据不同环境使用不同的baseURL 方便调试
// let baseURL = process.env.NODE_ENV === 'development' ? '' : 'https://your.domain.com/api';
// let baseURL = 'http://localhost:8080';
let baseURL = 'https://api.huangrx.cn';


//默认请求超时时间
const timeout = 30000;

//创建axios实例
const service = axios.create({
    timeout,
    baseURL,
    //如需要携带cookie 该值需设为true
    withCredentials: false
});

//统一请求拦截 可配置自定义headers 例如 language、token等
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config = handleChangeRequestHeader(config);
        // config = handleConfigureAuth(config);
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status !== 200) return Promise.reject(response.data);
        // handleAuthError(response.data.errno);
        if (!handleGeneralError(response.data.code, response.data.message)) return Promise.reject(response.data);
        return response;
    },
    (err) => {
        handleNetworkError(502);
        return Promise.reject(err.response);
    }
);

export const Get = <T>(url: string, params: IAnyObj = {}): Promise<[any, BaseResponse<T> | undefined]> =>
    new Promise((resolve) => {
            service
                .get(url, {params})
                .then((result) => {
                    resolve([null, result.data as BaseResponse<T>]);
                })
                .catch((err) => {
                    resolve([err, undefined]);
                });
        }
    );

export const Post = <T>(url: string, data: IAnyObj, params: IAnyObj = {}): Promise<[any, BaseResponse<T> | undefined]> =>
    new Promise((resolve) => {
        service
            .post(url, data, {params})
            .then((result) => {
                resolve([null, result.data as BaseResponse<T>]);
            })
            .catch((err) => {
                resolve([err, undefined]);
            });
    });