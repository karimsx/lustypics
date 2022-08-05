import { S3 } from "aws-sdk"
import { v4 as uuid } from "uuid"
import fs from "fs"

export class S3Service {
  private defaultBucket: string = "euwest"
  private static instance: S3Service
  private s3: S3;

  private constructor() {
    this.s3 = new S"
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
      Key: key,
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
      Key: key,
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
      Body: fileStream,
      ContentType: contentType,
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
