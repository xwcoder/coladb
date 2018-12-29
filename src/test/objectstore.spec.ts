import {
  users,
  storename,
  createDB,
  insertData,
  open
} from './util'

describe('ObjectStore', () => {

  let db: IDBDatabase
  let transaction: IDBTransaction
  let store: IDBObjectStore

  // beforeAll(async () => {
  //   await createDB()
  //   await insertData()
  // })

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

  it('get', async () => {

    const user: any = await store.get(1)

    expect(store.name).toEqual(storename)
    expect(store.autoIncrement).toBeTruthy()

    expect(user).not.toBeNull()
    expect(user).not.toBeUndefined()
    expect(typeof user.id).toEqual('number')
    expect(user.id).toEqual(1)
    expect(typeof user.name).toEqual('string')

  })

  it('count', async () => {

    let count: any = await store.count()
    expect(count).toEqual(users.length)

    count = await store.count(IDBKeyRange.bound(1, 5))
    expect(count).toEqual(5)

  })

  it('add', async () => {

    const beforeCount: any = await store.count()

    const id: any = await store.add({ uid: '001', name: 'creep001' })

    const afterCount = await store.count()

    expect(afterCount).toEqual(beforeCount + 1)

    const user: any = await store.get(id)

    expect(user.id).toEqual(id)
    expect(user.uid).toEqual('001')
    expect(user.name).toEqual('creep001')

  })

  it('put', async () => {

    const userList = await store.getAll()
    let user = userList[0]
    user.name = 'creep-put'
    user.age = 18

    const key: any = await store.put(user)

    expect(user.id).toEqual(key)

    user = await store.get(key)

    expect(user.name).toEqual('creep-put')
    expect(user.age).toEqual(18)
  })

  it('delete', async () => {

    const beforeUserList: any = await store.getAll()
    let user = beforeUserList[0]
    const { id } = user

    await store.delete(id)

    const afterUserList: any = await store.getAll()
    user = afterUserList[0]

    expect(afterUserList.length).toEqual(beforeUserList.length - 1)
    expect(user.id).not.toEqual(id)
  })

  it('getKey', async () => {

    let key: any = await store.getKey(1)
    expect(key).toEqual(1)

    key = await store.getKey(IDBKeyRange.bound(2, 5))

    expect(key).toEqual(2)
  })

  it('getAll', async () => {

    let userList: any = await store.getAll()
    expect(userList.length).toEqual(users.length)

    userList = await store.getAll(IDBKeyRange.bound(3, 10))
    expect(userList.length).toEqual(8)
  })

  it('getAllKeys', async () => {

    let keys: any = await store.getAllKeys()
    expect(keys.length).toEqual(users.length)
    expect(typeof keys[0]).toEqual('number')

    keys = await store.getAllKeys(IDBKeyRange.bound(2, 10))
    expect(keys.length).toEqual(9)
  })

  it('clear', async () => {

    let userList: any = await store.getAll()
    expect(userList.length).toEqual(users.length)

    await store.clear()

    userList = await store.getAll()
    expect(userList.length).toEqual(0)
  })

  it('index', async () => {

    const index = store.index('name')

    expect(index.keyPath).toEqual('name')
    expect(index.unique).toBeFalsy()
    expect(index.objectStore).toEqual(store)

    const user: any = await index.get('user-0')

    expect(user.name).toEqual('user-0')
    expect(user.id).toEqual(1)
    expect(user.uid).toEqual('1000')
  })

  it('openCursor', async () => {

    let cursor: any = await store.openCursor()
    let user = cursor.value

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

  it('openKeyCursor', async () => {

    let cursor: any = await store.openKeyCursor()
    let user = cursor.value

    expect(cursor.source instanceof IDBObjectStore).toBeTruthy()
    expect(cursor.key).toEqual(1)
    expect(user).toBeUndefined()

    cursor = await cursor.continue()
    user = cursor.value

    expect(cursor.source instanceof IDBObjectStore).toBeTruthy()
    expect(cursor.key).toEqual(2)
    expect(user).toBeUndefined()
  })
})
