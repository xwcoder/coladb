import coladb from '../index'

export const dbname = 'school-db'
export const version = 1
export const storename = 'user'

export const users = Array(50).fill('')
  .map((_, index) => ({ uid: `100${index}`, name: `user-${index}`, birthday: new Date() }))

export const createDB = async () => {

  await coladb.deleteDatabase(dbname)

  const db = await coladb.open(dbname, version, (idb) => {

    const store = idb.createObjectStore(storename, { autoIncrement: true, keyPath: 'id' })
    store.createIndex('sid', 'sid', { unique: true })
    store.createIndex('name', 'name')
    store.createIndex('birthday', 'birthday')

  })

  db.close()
}

export async function open () {
  return coladb.open(dbname, version)
}

export const insertData = async () => {

  await createDB()

  const db = await coladb.open(dbname, 1)

  const transaction = db.transaction(storename, 'readwrite')
  const store = transaction.objectStore(storename)

  for (const user of users) {
    await store.add(user)
  }

  db.close()
}
