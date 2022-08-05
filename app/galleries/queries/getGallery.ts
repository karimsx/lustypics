import { Ctx } from "blitz"
import db from "db"

export default async function getGallery({ id }: { id: number }, { session }: Ctx) {
  const gallery = await db.gallery.findUnique({
    where: {
      id,
    },
    include: {
      files: true,
      owner: true,
      tags: true,
    },
  })

  return gallery
}
