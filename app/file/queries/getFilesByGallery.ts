import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"
import { resolver } from "@blitzjs/rpc"
import { S3Service } from "../hosts/s3-upload"
import { File } from "../../../db"
import { CreateFilesZod } from "../mutations/createFiles"

export type FilterType = "lasted" | "most_viewed"
export const GetFilesByGalleryZod = z.object({
  galleryId: z.number().int().positive()
})


export default resolver.pipe(
  resolver.zod(GetFilesByGalleryZod),
  resolver.authorize(),
  async ({galleryId}, ctx) => {

    return db.file.findMany({
      where: {
        galleryId,
      },
      orderBy: {
        galleryIndex: 'asc'
      }
    })
  }
)
