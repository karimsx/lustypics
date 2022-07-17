import nodemailer, { SendMailOptions } from "nodemailer"
import mjml2html from "mjml"
import smtpTransport from "nodemailer-smtp-transport"
import Handlebars from "handlebars"
import fs from "fs/promises"
import path from "path"

export const sendMail = async ({
  mailOptions,
  transportOptions,
}: {
  mailOptions: SendMailOptions
  transportOptions?: any
}) => {
  if (process.env.NODE_ENV === "production") {
    const transport = nodemailer.createTransport(
      smtpTransport({
        pool: {
          pool: true,
        },
        host: process.env.MAIL_HOST,
        secure: process.env.MAIL_SECURE === "true",
        port: parseInt(process.env.MAIL_PORT || "23"),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      })
    )

    await transport.sendMail(mailOptions)
  } else {
    const previewEmail = (await import("preview-email")).default
    await previewEmail(mailOptions)
  }

  return true
}

export const parseTemplate = async (templateName, variables?: Record<string, string>) => {
  const mjml = (
    await fs.readFile(path.join(process.cwd(), "mailers/templates", templateName))
  ).toString()
  const parsedMjml = mjml2html(mjml)
  const compiledHbs = Handlebars.compile(parsedMjml.html)
  return compiledHbs(variables ?? {})
}
