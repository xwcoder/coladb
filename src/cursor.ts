import { keyType } from './types'
import { createPromisifyRequestMethods, promiseifyRequest } from './promisify'
import { createHandler } from './proxyhandlers'

const requestMethodNames: string[] = [
  'delete',
  'update'
]

export default function Cursor (cursor: IDBCursor, request: IDBRequest) {

  const agency = {

    async advance (count: number): Promise<IDBCursor> {
      cursor.advance(count)
      const nextCursor = await promiseifyRequest(request)
      return nextCursor ? Cursor(nextCursor, request) : nextCursor
    },

    async continue (key?: keyType): Promise<IDBCursor> {
      cursor.continue(key)
      const nextCursor = await promiseifyRequest(request)
      return nextCursor ? Cursor(nextCursor, request) : nextCursor
    },

    async continuePrimaryKey (key: keyType, primaryKey: keyType): Promise<IDBCursor> {
      cursor.continuePrimaryKey(key, primaryKey)
      const nextCursor = await promiseifyRequest(request)
      return nextCursor ? Cursor(nextCursor, request) : nextCursor
    },

    ...createPromisifyRequestMethods(cursor, requestMethodNames)
  }

  return new Proxy(cursor, createHandler(agency))
}
