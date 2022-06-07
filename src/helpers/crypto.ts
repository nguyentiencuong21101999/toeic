import crypto from 'crypto'
import { configs } from '../configs'

const algorithm = 'aes-256-ctr'
const iv = crypto.randomBytes(16)

export const encrypt = (text: string) => {
    const cipher = crypto.createCipheriv(algorithm, configs.secretKey, iv)
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
    return iv.toString('hex') + '.' + encrypted.toString('hex')
}

export const decrypt = (hash: string) => {
    const data = hash.split('.')
    if (data.length == 2) {
        const iv = data[0]
        const msg = data[1]
        const decipher = crypto.createDecipheriv(
            algorithm,
            configs.secretKey,
            iv
        )
        const decrypted = Buffer.concat([
            decipher.update(Buffer.from(msg, 'hex')),
            decipher.final(),
        ])
        return decrypted.toString()
    }
    return null
}
