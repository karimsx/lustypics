import { resolver } from "@blitzjs/rpc"
import { ChangePassword } from "../../auth/validations"
import db, {File} from "../../../db"
import { AuthenticationError, NotFoundError } from "blitz"
import { authenticateUser } from "../../auth/mutations/login"
import { SecurePassword } from "@blitzjs/auth"
import { z } from "zod"
import { S3Service } from "../hosts/s3-upload"

export const DeleteFileZod = z.number().int().positive()

export default resolver.pipe(
  resolver.zod(DeleteFileZod),
  resolver.authorize(),
  async (id, ctx) => {

    await db.file.delete({
      where: {
        id,
      }
    })
  }
)
