# coladb

A small library for using `IndexedDB` in `Promise` style. Wrap `IDBRequest` to `Promise`.

## Installation

```bash
npm i coladb --save
```

## Usage

Use as module:
```typescript
import coladb from 'coladb'

async function openDB () {

  const db = await coladb.open('dbname', 1, (idb) => {
    const store = idb.createObjectStore('user', { autoIncrement: true, keyPath: 'id' })
    store.createIndex('uid', 'uid', { unique: true })
    store.createIndex('name', 'name')
    store.createIndex('birthday', 'birthday')
  })

  return db
}

async function insertUser (user = {}) {
  const db = await openDB()
  const transaction = db.transaction('user', 'readwrite')
  const store = transaction.objectStore('user')
  const id = await store.add(user)
}
```
Use as script in html file. Import `dist/coladb.js` to your project, export as global variable named `colaDB`:
```html
<script src="path/to/coladb.js"></script>
<script>
async function main () {

  const db = await colaDB.open('dbname', 1, (idb) => {
    const store = idb.createObjectStore('user', { autoIncrement: true, keyPath: 'id' })
    store.createIndex('uid', 'uid', { unique: true })
    store.createIndex('name', 'name')
    store.createIndex('birthday', 'birthday')
  })

  const transaction = db.transaction('user', 'readwrite')
  const store = transaction.objectStore('user')
  const id = await store.add(user)
}
main()
</script>
```

## API

Contrast to native `IndexedDB`, the `open` method signature has a little different.

## coladb.open(name: string, version?: number, onupgradeneeded?: onupgradeneededFn, onblocked?: onblockedFn)

```typescript
type onupgradeneededFn = (db, oldVersion: number, newVersion: number) => void
type onblockedFn = (event) => void
```

## Examples

### Use `Cursor`:
```typescript
const db = coladb.open('dbname', 1)
const transaction = db.transaction('user', 'readwrite')
const store = transaction.objectStore('user')

let cursor: any = await store.openCursor(IDBKeyRange.bound(1, 10))
cursor = await cursor.continue(8)

console.log(`key: ${cursor.key}, value: ${cursor.value}`)

const key = await cursor.update(user)
```

More example in [`test directory`](./src/test).

## Development

dist
```bash
npm run dist
```

Lint
```bash
npm run lint
```

Test
```bash
npm run karma:start
npm run karma:run
```
