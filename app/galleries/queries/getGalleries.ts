import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

export type FilterType = "lasted" | "most_viewed"
export const GetGalleriesInput = z.object({
  page: z.number().int().gte(0),
  perPage: z.number().int().gt(0),
  filterType: z.enum(["lasted", "most_viewed"]).optional(),
  ownerId: z.number().int().gt(0).optional(),
})

export default async function getGalleries(
  { page, perPage, filterType, ownerId }: z.infer<typeof GetGalleriesInput>,
  { session }: Ctx
) {
  const galleries = await db.gallery.findMany({
    take: perPage,
    skip: page * perPage,
    orderBy:
      filterType ?? filterType == "lasted"
        ? {
            createdAt: "desc",
          }
        : {
            updatedAt: "desc",
          },
    where: {
      ownerId,
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

  return galleries
}
