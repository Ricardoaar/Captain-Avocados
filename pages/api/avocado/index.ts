import { IncomingMessage, ServerResponse } from 'http'
import Database from '../../../database/db'

const db = new Database()
const allAvocados = async (req: IncomingMessage, res: ServerResponse) => {
  const avocados = await db.getAll()
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(avocados))
}
export default allAvocados
