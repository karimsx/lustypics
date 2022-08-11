import { resolver } from "@blitzjs/rpc"
import db from "../../../db"
import { z } from "zod"

export const UpdateUserZod = z.object({
  id: z.number().int().positive(),
  name: z.string().optional(),
  birthday: z.date().optional(),
  country: z.string().optional(),
  bio: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional()
})

export default resolver.pipe(
  resolver.zod(UpdateUserZod),
  resolver.authorize(),
  async ({ id, name, birthday, country, gender, bio }, ctx) => {

    await db.user.update({
      where: {
        id,
      },
      data: {
        name,
        birthday,
        country,
        gender,
        bio,
      }
    })
  }
)
