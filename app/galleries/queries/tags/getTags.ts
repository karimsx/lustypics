import { Ctx } from "blitz"
import db from "db"
import {S3Service} from "../../../file/hosts/s3-upload";

export default async function getTags(_, { session }: Ctx) {

  const s3 = S3Service.getInstance()


  const tags = await db.tags.findMany({
    include: {
      file: true
    }
  })

  return tags.map(tag => ({
    ...tag,
    file:{
      ...tag.file,
      signedUrl: tag?.file?.key && s3.getObjectSignedUrl(tag?.file?.key)
    }
  }))
}
