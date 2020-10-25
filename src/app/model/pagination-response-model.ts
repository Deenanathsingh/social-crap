import { BaseResponse } from './base-response';

export class PaginationResponse<T> extends BaseResponse<T>{
    
    totalCount: number;
    previousPage: number;
    currentPage: number;
    nextPage: number;
    lastPage: number;

}