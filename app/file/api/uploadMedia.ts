import formidable  from "formidable"
import { v4 as uuid } from 'uuid'
import fs from 'fs'
import mime from 'mime-types'
import db from 'db'
import { S3Service } from "../hosts/s3-upload"
import { getSession } from "@blitzjs/auth"
const util = require('util')
const exec = util.promisify(require('child_process').exec)



const s3Instance = S3Service.getInstance()


const handler = async (req, res): Promise<any> => {
  const session = await getSession(req, res)

  if (req.method === 'POST' && session.userId) {
    const form = new formidable.IncomingForm()

    // form.parse(req, async (err, fields, files) => {
    //   if (err) {
    //     res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' })
    //     res.end(String(err))
    //
    //     return
    //   }
    //
    //
    //
    //   if(file instanceof Array<File>) {
    //
    //   } else  {
    //
    //   }
    //   for(let file of files) {
    //
    //   }
    //   const mimeType = mime.lookup(file?.name) || 'application/octet-stream'
    //   const response = await s3Instance.upload({
    //     fileStream: file,
    //     contentType: mimeType,
    //   })
    //
    //   const media = await db.file.create({
    //     data: {
    //       name: file.name,
    //       mimetype: mimeType,
    //       key: response.Key,
    //       ownerId: session.userId as number,
    //     },
    //   })
    //
    //   res.statusCode = 200
    //   res.setHeader('Content-Type', 'application/json')
    //   res.end(JSON.stringify(media))
    // })
  } else {
    res.writeHead(400, { 'Content-Type': 'text/plain' })
    res.end('Invalid access')
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
