import Index from './colaindex'
import {
  createPromisifyRequestMethods,
  createPromisifyOpenCursorMthods
} from './promisify'
import { createHandler } from './proxyhandlers'

const requestMethodNames: string[] = [
  'add',
  'clear',
  'count',
  'delete',
  'get',
  'getKey',
  'getAll',
  'getAllKeys',
  'put'
]

export default function ObjectStore (store: IDBObjectStore): IDBObjectStore {

  const proxyMethods = {

    index (name: string): IDBIndex {
      return Index(store.index(name))
    },

    createIndex (name: string, keyPath: string | string[], options?: IDBIndexParameters): IDBIndex {
      return Index(store.createIndex(name, keyPath, options))
    },

    ...createPromisifyOpenCursorMthods(store),

    ...createPromisifyRequestMethods(store, requestMethodNames)
  }

  return new Proxy(store, createHandler(proxyMethods))
}
