// app/products/mutations/createProduct.tsx
import { Ctx } from "blitz"
import db, { prisma } from "db"
import * as z from "zod"

export default async function createGallery(_, ctx: Ctx) {
  ctx.session.$authorize()

  return db.gallery.create({
    data: {
      ownerId: ctx.session.userId,
    },
  })
}
