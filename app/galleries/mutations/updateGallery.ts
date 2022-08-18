// app/products/mutations/createProduct.tsx
import db from "db"
import * as z from "zod"
import { resolver } from "@blitzjs/rpc"

export const UpdateGalleryZod = z.object({
  id: z.number().int().positive(),
  name: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.number().int().positive()),
  isPublic: z.boolean(),
})

export default resolver.pipe(
  resolver.zod(UpdateGalleryZod),
  resolver.authorize(),
  async ({ id, name, description, isPublic, tags }, ctx) => {
    const updatedGallery = await db.gallery.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        isPublic,
        tags: {
          connect: tags.map((tagId) => ({ id: tagId })),
        },
      },
    })
  }
)
