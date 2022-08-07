import { resolver } from "@blitzjs/rpc"
import { ChangePassword } from "../../auth/validations"
import db, {File} from "../../../db"
import { AuthenticationError, NotFoundError } from "blitz"
import { authenticateUser } from "../../auth/mutations/login"
import { SecurePassword } from "@blitzjs/auth"
import { z } from "zod"
import { S3Service } from "../hosts/s3-upload"

export const CreateFilesZod = z.array(z.object({
  name: z.string(),
  data64: z.string(),
  galleryIndex: z.number().int().positive().optional(),
}))

export default resolver.pipe(
  resolver.zod(CreateFilesZod),
  resolver.authorize(),
  async (files, ctx) => {

    const s3 = S3Service.getInstance()
    const filesReturned: File[] = []
    for(let file of files) {
      const fileContents = Buffer.from(file.data64, 'base64')
      const instance = await s3.upload({ fileStream: fileContents, contentType: ''})

      const dbFile = await db.file.create({
        data: {
          ownerId: ctx.session.userId,
          key: instance.Key,
          name: file.name
        }
      })

      filesReturned.push(dbFile)
    }
    return filesReturned
  }
)
