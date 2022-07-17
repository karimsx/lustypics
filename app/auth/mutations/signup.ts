import db from "db"
import { generateToken, hash256, SecurePassword } from "@blitzjs/auth"
import { Role } from "types"
import { parseTemplate, sendMail } from "mailers/base/mailer-service"

const VALIDATE_EMAIL_TOKEN_EXPIRATION_IN_HOURS = 1

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

  // generate and send email validation token
  const token = generateToken()
  const hashedToken = hash256(token)
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + 1)

  await db.token.deleteMany({ where: { type: "VALIDATE_EMAIL", userId: user.id } })

  await db.token.create({
    data: {
      user: { connect: { id: user.id } },
      type: "VALIDATE_EMAIL",
      expiresAt,
      hashedToken,
      sentTo: user.email,
    },
  })

  await sendMail({
    mailOptions: {
      from: "no",
      to: "tata@live.fr",
      subject: "tezteztze",
      html: await parseTemplate("welcomeMail.mjml", { name: "Karim Squalli" }),
    },
  })

  return { userId: blitzContext.session.userId, ...user, email: input.email }
}
