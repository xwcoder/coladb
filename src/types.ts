export type onupgradeneededFn = (db: IDBDatabase, oldVersion: number, newVersion: number) => void
export type onblockedFn = (event) => void
export type keyType = string | number | Date | ArrayBufferView | ArrayBuffer | IDBArrayKey | IDBKeyRange
