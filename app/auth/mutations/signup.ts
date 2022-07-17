import db from "db"
import { SecurePassword } from "@blitzjs/auth"
import { Role } from "types"
import { parseTemplate, sendMail } from "mailers/base/mailer-service"

export default async function signup(input, ctx) {
  const blitzContext = ctx

  const hashedPassword = await SecurePassword.hash((input.password as string) || "test-password")
  const email = (input.email as string) || "test" + Math.random() + "@test.com"
  const user = await db.user.create({
    data: { email, hashedPassword, role: "user" },
    select: { id: true, name: true, email: true, role: true },
  })

  await blitzContext.session.$create({
    userId: user.id,
    role: user.role as Role,
  })

  await sendMail({
    mailOptions: {
      from: "test",
      to: "tata@live.fr",
      subject: "tezteztze",
      html: await parseTemplate("welcomeMail.mjml", { name: "Karim Squalli" }),
    },
  })

  return { userId: blitzContext.session.userId, ...user, email: input.email }
}
