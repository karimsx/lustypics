import { resolver } from "@blitzjs/rpc"
import db from "../../../db"
import { z } from "zod"
import { S3Service } from "../hosts/s3-upload"

export const UpdateFileZod = z.object({
  id: z.number().int().positive(),
  name: z.string().optional(),
  galleryIndex: z.number().int().positive().optional(),
  data64: z.string().optional()
})

export default resolver.pipe(
  resolver.zod(UpdateFileZod),
  resolver.authorize(),
  async ({ id, name, galleryIndex, data64 }, ctx) => {

    const s3 = S3Service.getInstance()
    let newInstance

    if (data64) {
      newInstance = await s3.upload({ fileStream: data64, contentType: "" })
    }

    const dbFile = await db.file.update({
      where: {
        id
      },
      data: {
        key: newInstance?.key,
        galleryIndex,
        name
      }
    })


    return dbFile
  }
)
