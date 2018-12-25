export declare type onupgradeneededFn = (db: IDBDatabase, oldVersion: number, newVersion: number) => void;
export declare type onblockedFn = (event: any) => void;
export declare type keyType = string | number | Date | ArrayBufferView | ArrayBuffer | IDBArrayKey | IDBKeyRange;
