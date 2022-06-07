/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResp } from './error'

export class ResponseWrapper {
    data: any
    error: ErrorResp
    pagination: Pagination

    constructor(
        data: any,
        error: ErrorResp = null,
        pagination: Pagination = null
    ) {
        this.data = data
        this.error = error
        this.pagination = pagination
    }
}

export interface Pagination {
    total: number
    page: number
    limit: number
}
