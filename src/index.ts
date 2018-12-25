import { promiseifyRequest } from './promisify'
import DB from './db'
import { onupgradeneededFn, onblockedFn } from './types'

const colaDB = {

  async open (
    name: string,
    version?: number,
    onupgradeneeded?: onupgradeneededFn,
    onblocked?: onblockedFn
  ): Promise<IDBDatabase> {

    const request = indexedDB.open(name, version)

    if (onupgradeneeded) {
      request.onupgradeneeded = (event) => {
        onupgradeneeded(DB(request.result), event.oldVersion, event.newVersion)
      }
    }

    if (onblocked) {
      request.onblocked = onblocked
    }

    const db: IDBDatabase = await promiseifyRequest(request)

    return DB(db)
  },

  deleteDatabase (name: string): Promise<undefined> {

    const request = indexedDB.deleteDatabase(name)

    return promiseifyRequest(request)
  }
}

export default colaDB
