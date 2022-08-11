import { resolver } from "@blitzjs/rpc"
import db from "../../../db"
import { z } from "zod"


export default resolver.pipe(
  resolver.authorize(),
  async (tagId: number, ctx) => {

    await db.user.update({
      where: {
        id: ctx.session.userId,
      },
      data: {
        likedTags: {
           disconnect: {
             id: tagId,
           },
        }
      }
    })
  }
)
