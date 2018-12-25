import {
  users,
  storename,
  createDB,
  insertData,
  open
} from './util'

describe('Transaction', () => {

  let db: IDBDatabase
  let transaction: IDBTransaction
  let store: IDBObjectStore

  beforeEach(async () => {
    await createDB()
    await insertData()
    db = await open()
    transaction = db.transaction(storename, 'readwrite')
    store = transaction.objectStore(storename)
  })

  afterEach(() => {
    if (db) {
      db.close()
    }
  })

  it('abort', (done) => {

    transaction.onabort = (event) => {
      done()
    }

    transaction.abort()
  })

  it('oncomplete', async (done) => {

    transaction.oncomplete = (event) => {
      done()
    }

    await store.add({ uid: '100000', name: 'user-10000' })
  })

  it('onerror', async (done) => {
    transaction.onerror = (error) => {
      done()
    }
    try {
      await store.add({ id: 1, uid: '1000', name: 'user-100' })
    } catch (e) {
      //
    }
  })
})
