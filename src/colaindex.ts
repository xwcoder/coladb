import ObjectStore from './objectstore'
import {
  createPromisifyRequestMethods,
  createPromisifyOpenCursorMthods
} from './promisify'
import { createHandler } from './proxyhandlers'

const requestMethodNames: string[] = [
  'count',
  'get',
  'getKey',
  'getAll',
  'getAllKeys'
]

export default function Index (index: IDBIndex): IDBIndex {

  const agency = {

    objectStore: ObjectStore(index.objectStore),

    ...createPromisifyOpenCursorMthods(index),

    ...createPromisifyRequestMethods(index, requestMethodNames)
  }

  return new Proxy(index, createHandler(agency))
}
