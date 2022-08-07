import AWS, { S3 } from "aws-sdk"
import { v4 as uuid } from "uuid"

export class S3Service {
  private defaultBucket: string;
  private static instance: S3Service
  private s3: S3

  private constructor() {

    if (process.env.S3_SECRET == undefined) throw new Error("S3_SECRET should be defined to use s3")
    if (process.env.S3_ACCESS_ID == undefined) throw new Error("S3_ACCESS_ID should be defined to use s3")
    if (process.env.S3_REGION == undefined) throw new Error("S3_REGION should be defined to use s3")
    if (process.env.S3_VERSION == undefined) throw new Error("S3_VERSION should be defined to use s3")
    if (process.env.S3_BUCKET == undefined) throw new Error("S3_BUCKET should be defined to use s3")

    AWS.config.update({
      accessKeyId: process.env.S3_ACCESS_ID,
      secretAccessKey: process.env.S3_SECRET,
      region: process.env.S3_REGION,
    })

    this.defaultBucket = process.env.S3_BUCKET

    this.s3 = new S3({
      region: process.env.S3_REGION,
      apiVersion: process.env.S3_VERSION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_ID,
        secretAccessKey: process.env.S3_SECRET
      }
    })
  }

  public static getInstance(): S3Service {
    if (!S3Service.instance) {
      S3Service.instance = new S3Service()
    }

    return S3Service.instance
  }

  getObjectSignedUrl(key: string, s3Params?: any): string {
    const params = {
      ...s3Params,
      Bucket: s3Params?.Bucket || this.defaultBucket,
      Key: key
    }

    return this.s3.getSignedUrl("getObject", params)
  }

  /**
   * return file content as string from storage
   * useful for getting text files for example
   * @param key object key
   */
  async read(key: string, s3Params?: any): Promise<string | undefined> {
    const params = {
      Bucket: s3Params?.Bucket || this.defaultBucket,
      Key: key
    }

    const object = await this.s3.getObject(params).promise()

    return object.Body?.toString()
  }

  async upload(
    { fileStream, contentType },
    s3Params?: any
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const params: S3.PutObjectRequest = {
      Bucket: s3Params?.Bucket || this.defaultBucket,
      Key: uuid(),
      Body: fileStream
    }

    return new Promise((resolve, reject) => {
      this.s3.upload(params, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
  }
}
