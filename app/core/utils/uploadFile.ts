import axios, {AxiosRequestConfig} from 'axios'

export const uploadFile = async (files: File[], token: string) => {
    const url = `${process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL}/api/files/upload`
    const formData = new FormData()

    for (const file of files) {
        formData.append('file', file)
    }

    const config: AxiosRequestConfig = {
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        }, onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            console.log(percentCompleted)
        },
    }

    return axios.post(url, formData, config)

}