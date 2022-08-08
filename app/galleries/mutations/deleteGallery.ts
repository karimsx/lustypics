import { resolver } from "@blitzjs/rpc"
import db, {Gallery} from "../../../db"
import { z } from "zod"

export const DeleteFileZod = z.number().int().positive()

export default resolver.pipe(
  resolver.zod(DeleteFileZod),
  resolver.authorize(),
  async (id, ctx) => {

    await db.gallery.delete({
      where: {
        id,
      }
    })
  }
)
