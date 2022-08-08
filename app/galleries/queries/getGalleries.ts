import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"
import { S3Service } from "../../file/hosts/s3-upload"

export type FilterType = "lasted" | "most_viewed"
export const GetGalleriesInput = z.object({
  page: z.number().int().gte(0),
  perPage: z.number().int().gt(0),
  filterType: z.enum(["lasted", "most_viewed"]).optional(),
  ownerId: z.number().int().gt(0).optional()
})

export default async function getGalleries(
  { page, perPage, filterType, ownerId }: z.infer<typeof GetGalleriesInput>,
  { session }: Ctx
) {

  const s3 = S3Service.getInstance()

  const orderBy = {}

  switch (filterType) {
    case "lasted": {
      orderBy["createdAt"] = "desc"
      break
    }
    case  "most_viewed": {
      orderBy["views"] = "desc"
      break
    }
  }


  const galleries = await db.gallery.findMany({
    take: perPage,
    skip: (page - 1) * perPage,
    orderBy,
    where: {
      ownerId
    },
    include: {
      files: true,
      owner: {
        select: {
          name: true
        }
      },
      tags: true
    }
  })

  const count = await db.gallery.count({
    orderBy,
    where: {
      ownerId
    }
  })


  return {
    totalPage: Math.floor(count / perPage) + (count % perPage ? 1 : 0),
    items: galleries.map(gallery => ({
      ...gallery,
      files: gallery.files?.map(file => ({
        ...file,
        signedUrl: s3.getObjectSignedUrl(file.key)
      }))
    }))
  }
}
