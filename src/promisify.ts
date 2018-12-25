import Cursor from './cursor'
import { keyType } from './types'

export const promiseifyRequest = (request: IDBRequest): Promise<any> => new Promise((resolve, reject) => {

  request.onsuccess = () => {
    resolve(request.result)
  }

  request.onerror = () => {
    reject(request.error)
  }

})

export function createPromisifyRequestMethod (obj: IDBObjectStore | IDBIndex | IDBCursor, methodName: string) {

  return (...args) => {
    const request = obj[methodName].call(obj, ...args)
    return promiseifyRequest(request)
  }
}

export function createPromisifyRequestMethods (obj: IDBObjectStore | IDBIndex | IDBCursor, methodNames: string[]) {

  const methods = {}
  methodNames.forEach((methodName) => {
    methods[methodName] = createPromisifyRequestMethod(obj, methodName)
  })

  return methods
}

export const createPromisifyOpenCursorMthods = (obj: IDBObjectStore | IDBIndex) => ({

    async openCursor (range?: keyType, direction?: IDBCursorDirection): Promise<IDBCursorWithValue> {
      const request = obj.openCursor(range, direction)
      const cursor = await promiseifyRequest(request)
      return Cursor(cursor, request)
    },

    async openKeyCursor (range?: keyType, direction?: IDBCursorDirection): Promise<IDBCursorWithValue> {
      const request = obj.openCursor(range, direction)
      const cursor = await promiseifyRequest(request)
      return Cursor(cursor, request)
    }
})
