import {
  users,
  storename,
  createDB,
  insertData,
  open
} from './util'

describe('Cursor', () => {

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

  it('objectStore/openCursor', async () => {

    let cursor: any = await store.openCursor()
    let user = cursor.value

    expect(cursor.primaryKey).toEqual(1)
    expect(cursor.source instanceof IDBObjectStore).toBeTruthy()
    expect(cursor.key).toEqual(1)
    expect(user.id).toEqual(1)
    expect(user.name).toEqual('user-0')

    cursor = await cursor.continue()
    user = cursor.value

    expect(cursor.source instanceof IDBObjectStore).toBeTruthy()
    expect(cursor.key).toEqual(2)
    expect(user.id).toEqual(2)
    expect(user.name).toEqual('user-1')
  })

  it('objectStore/openKeyCursor', async () => {

    let cursor: any = await store.openKeyCursor()
    let user = cursor.value

    expect(cursor.primaryKey).toEqual(1)
    expect(cursor.source instanceof IDBObjectStore).toBeTruthy()
    expect(cursor.key).toEqual(1)
    expect(user).toBeUndefined()

    cursor = await cursor.continue()
    user = cursor.value

    expect(cursor.source instanceof IDBObjectStore).toBeTruthy()
    expect(cursor.key).toEqual(2)
    expect(user).toBeUndefined()
  })

  it('continue', async () => {

    let cursor: any = await store.openCursor(IDBKeyRange.bound(1, 10))
    let count = 1

    expect(cursor.key).toEqual(1)

    while (cursor) {
      cursor = await cursor.continue()
      if (cursor) {
        count += 1
        expect(cursor.key).toEqual(count)
      }
    }

    expect(count).toEqual(10)
  })

  it('advance', async () => {

    let cursor: any = await store.openCursor(IDBKeyRange.bound(1, 10))

    expect(cursor.key).toEqual(1)

    cursor = await cursor.continue(8)
    cursor = await cursor.advance(1)

    expect(cursor.key).toEqual(9)

    cursor = await cursor.advance(3)
    expect(cursor).toBeNull()
  })

  it('delete', async () => {

    let cursor: any = await store.openCursor(IDBKeyRange.bound(1, 10))
    cursor = await cursor.continue(8)

    expect(cursor.key).toEqual(8)

    await cursor.delete()

    const user = await store.get(8)
    expect(user).toBeUndefined()

  })

  it('update', async () => {

    let cursor: any = await store.openCursor(IDBKeyRange.bound(1, 10))
    cursor = await cursor.continue(8)

    expect(cursor.key).toEqual(8)

    let user = cursor.value
    user.name = 'creep'

    const key = await cursor.update(user)

    expect(key).toEqual(8)

    user = await store.get(key)
    expect(user.name).toEqual('creep')
  })
})
