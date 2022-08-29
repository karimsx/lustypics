import { S3Service } from "app/file/hosts/s3-upload"
import { Ctx } from "blitz"
import db from "db"

export default async function getGallery({ id }: { id: number }, { session }: Ctx) {
  const s3 = S3Service.getInstance()
  const gallery = await db.gallery.findUnique({
    where: {
      id,
    },
    include: {
      files: true,
      owner: true,
      tags: true,
      rating: true,
    },
  })

  return {
    ...gallery,
    files: gallery?.files?.map((file) => ({
      ...file,
      signedUrl: s3.getObjectSignedUrl(file.key),
    })),
  }
}
