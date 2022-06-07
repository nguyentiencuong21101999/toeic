import { configs } from "../configs"

export const fullUrl = (path: string) => {
    if (path) {
        return configs.awsS3Location + '/' + path
    }
    return path
}
