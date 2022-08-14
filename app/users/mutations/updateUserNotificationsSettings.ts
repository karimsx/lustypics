import { resolver } from "@blitzjs/rpc"
import db from "../../../db"
import { z } from "zod"

export const UpdateUserZod = z.object({
  whenGalleryCommented: z.boolean(),
  whenGalleryLiked: z.boolean(),
  whenFollowed: z.boolean(),
  whenWebsiteUpdate: z.boolean()
})

export default resolver.pipe(
  resolver.zod(UpdateUserZod),
  resolver.authorize(),
  async (data, ctx) => {


    const keys = ["whenGalleryCommented", "whenGalleryLiked", "whenFollowed", "whenWebsiteUpdate"]

    for (let key of keys) {
      await db.userNotificationSettings.upsert({
        where: {
          content_userId: {
            userId: ctx.session.userId,
            content: key
          }
        },
        create: {
          userId: ctx.session.userId,
          content: key,
          enabled: data[key]
        },
        update: {
          enabled: data[key]
        }

      })
    }
  }
)
