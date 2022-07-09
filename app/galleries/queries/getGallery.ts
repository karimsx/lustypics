import { Ctx } from "blitz"
import db from "db"

export default async function getGallery(_ = null, { session }: Ctx) {
  const gallery = await db.gallery.findUnique({
    where: {
      id: 1,
    },
  })

  return gallery
}
