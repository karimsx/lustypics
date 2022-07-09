import { Ctx } from "blitz"
import db from "db"

export default async function getGalleries(_ = null, { session }: Ctx) {
  const galleries = await db.gallery.findMany({
    take: 20,
  })

  return galleries
}
