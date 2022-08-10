import {Ctx} from "blitz"
import db from "db"
import {z} from "zod";

export const GetUsersZod = z.object({
  name: z.string().optional()
})

export default async function getUsers(params: z.infer<typeof GetUsersZod>, {session}: Ctx) {

  const users = await db.user.findMany({
    where: {
      name: {
        contains: params.name,
      }
    },
  })

  return users
}
