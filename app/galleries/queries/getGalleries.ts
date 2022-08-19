import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"
import { S3Service } from "../../file/hosts/s3-upload"

export const GetGalleriesInput = z.object({
  page: z.number().int().gte(0),
  perPage: z.number().int().gt(0),
  term: z.string().optional(),
  tags: z.array(z.number().int().positive()).optional(),
  orderBy: z.enum(["latest", "most_viewed", "best_rated"]).optional(),
  ownerId: z.number().int().gt(0).optional(),
})

export default async function getGalleries(
  { page, perPage, term, orderBy: orderByObject, tags, ownerId }: z.infer<typeof GetGalleriesInput>,
  { session }: Ctx
) {
  const s3 = S3Service.getInstance()

  const orderBy = {}

  switch (orderByObject) {
    case "latest": {
      orderBy["createdAt"] = "desc"
      break
    }
    case "most_viewed": {
      orderBy["views"] = "desc"
      break
    }
  }

  const where = {
    ownerId,
  }

  if (term) {
    where["OR"] = [
      {
        name: {
          contains: term,
        },
      },
      {
        description: {
          contains: term,
        },
      },
    ]
  }

  if (tags && tags.length > 0) {
    where["tags"] = {
      some: {
        id: {
          in: tags,
        },
      },
    }
  }

  const galleries = await db.gallery.findMany({
    take: perPage,
    skip: (page - 1) * perPage,
    orderBy,
    where: {
      ...where,
    },
    include: {
      files: true,
      owner: {
        select: {
          name: true,
        },
      },
      tags: true,
    },
  })

  const count = await db.gallery.count({
    where: {
      ...where,
    },
  })

  return {
    totalPage: Math.floor(count / perPage) + (count % perPage ? 1 : 0),
    items: galleries.map((gallery) => ({
      ...gallery,
      files: gallery.files?.map((file) => ({
        ...file,
        signedUrl: s3.getObjectSignedUrl(file.key),
      })),
    })),
  }
}
