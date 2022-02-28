import { useRouter } from 'next/router'
import { IncomingMessage, ServerResponse } from 'http'

import Database from '../../../database/db'

const db: Database = new Database()

const getAvocado = async (req: IncomingMessage, res: ServerResponse) => {
  // @ts-ignore
  const id = req.query.id
  const avo = await db.getById(id)
  // @ts-ignore
  res.status(200).json(avo)
}

export default getAvocado
