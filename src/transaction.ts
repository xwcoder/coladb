import ObjectStore from './objectstore'
import { createHandler } from './proxyhandlers'

export default function Transaction (transaction: IDBTransaction): IDBTransaction {

  const proxyMethods = {

    objectStore (name: string): IDBObjectStore {
      return ObjectStore(transaction.objectStore(name))
    }
  }

  return new Proxy(transaction, createHandler(proxyMethods))
}
