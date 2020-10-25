export class BaseResponse<T>{
    error: boolean;
    code: string;
    message: string;
    data: T;
}


