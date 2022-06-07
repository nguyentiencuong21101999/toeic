import { TransformFnParams } from 'class-transformer'
import { fullUrl } from './s3'

/** Transform 0/1 to true/false */
export const ToBoolean = (param: TransformFnParams) => {
    if (param.value === 1) {
        return true
    } else if (param.value == 0) {
        return false
    }
    return param.value
}

/** Transform path to full location url */
export const ToFullUrl = (param: TransformFnParams) => fullUrl(param.value)

/** Transform to trim text */
export const ToTrim = (param: TransformFnParams) =>
    (param?.value as string)?.trim()

export const genFullName = (fn: string, mn: string, ln: string) => {
    const names = [fn]
    if (mn != null && mn != '') {
        names.push(mn)
    }
    names.push(ln)
    return names.join(' ')
}
