import ObjectStore from './objectstore'
import Transaction from './transaction'
import { createHandler } from './proxyhandlers'

export default function DB (db: IDBDatabase): IDBDatabase {

  const proxyMethods = {

    createObjectStore (name: string, optionalParameters?: IDBObjectStoreParameters): IDBObjectStore {
      return ObjectStore(db.createObjectStore(name, optionalParameters))
    },

    transaction (storeNames: string | string[], mode?: 'readonly' | 'readwrite'): IDBTransaction {
      return Transaction(db.transaction(storeNames, mode))
    }
  }

  return new Proxy<IDBDatabase>(db, createHandler(proxyMethods))
}
