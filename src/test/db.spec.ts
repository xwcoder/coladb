import coladb from '../index'
import {
  dbname,
  storename,
  version,
  createDB
} from './util'

describe('DB', () => {

  let db

  afterEach(() => {
    if (db) {
      db.close()
    }
  })

  it('open', async () => {

    await coladb.deleteDatabase(dbname)

    db = await coladb.open(dbname, version, (idb) => {
      const store = idb.createObjectStore('student', { autoIncrement: true, keyPath: 'id' })
      store.createIndex('name', 'name')
      store.createIndex('birthday', 'birthday')
    })

    expect(db.name).toEqual(dbname)
    expect(db.objectStoreNames).toContain('student')

  })
})
