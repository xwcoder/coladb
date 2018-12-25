import {
  users,
  storename,
  createDB,
  insertData,
  open
} from './util'

describe('Index', () => {

  let db: IDBDatabase
  let transaction: IDBTransaction
  let store: IDBObjectStore
  let index: IDBIndex

  beforeEach(async () => {

    await createDB()
    await insertData()
    db = await open()

    transaction = db.transaction(storename, 'readwrite')
    store = transaction.objectStore(storename)
    index = store.index('name')
  })

  afterEach(() => {
    if (db) {
      db.close()
    }
  })

  it('properties', () => {
    expect(index.name).toEqual('name')
    expect(index.keyPath).toEqual('name')
    expect(index.objectStore instanceof IDBObjectStore).toBeTruthy()
  })

  it('count', async () => {
    let count: any = await index.count()
    expect(count).toEqual(users.length)

    count = await index.count(IDBKeyRange.bound('user-0', 'user-2'))
    expect(count).toEqual(13)
  })

  it('get', async () => {
    const user: any = await index.get('user-1')
    expect(user.id).toEqual(2)
  })

  it('getAll', async () => {
    let userList: any = await index.getAll()
    expect(userList.length).toEqual(users.length)

    userList = await index.getAll(IDBKeyRange.upperBound('user-10', true))

    expect(userList.length).toEqual(2)
  })

  it('getKey', async () => {

    let key: any = await index.getKey('user-2')
    expect(key).toEqual(3)

    key = await index.getKey('user-1000')
    expect(key).toBeUndefined()

  })

  it('getAllKeys', async () => {

    let keys: any = await index.getAllKeys()
    expect(keys.length).toEqual(users.length)

    keys = await index.getAllKeys(IDBKeyRange.upperBound('user-10'))
    expect(keys.length).toEqual(3)
    expect(typeof keys[0]).toEqual('number')
  })

  it('openCursor', async () => {
    const cursor: any = await index.openCursor()
    const user = cursor.value

    expect(cursor.primaryKey).toEqual(1)
    expect(cursor.source instanceof IDBIndex).toBeTruthy()
    expect(cursor.key).toEqual('user-0')
    expect(user.id).toEqual(1)
    expect(user.name).toEqual('user-0')
  })

  it('openKeyCursor', async () => {
    const cursor: any = await index.openKeyCursor()
    const user = cursor.value

    expect(cursor.primaryKey).toEqual(1)
    expect(cursor.source instanceof IDBIndex).toBeTruthy()
    expect(cursor.key).toEqual('user-0')
    expect(user.id).toEqual(1)
    expect(user.name).toEqual('user-0')
  })
})
