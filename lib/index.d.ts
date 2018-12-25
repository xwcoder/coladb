import { onupgradeneededFn, onblockedFn } from './types';
declare const colaDB: {
    open(name: string, version?: number, onupgradeneeded?: onupgradeneededFn, onblocked?: onblockedFn): Promise<IDBDatabase>;
    deleteDatabase(name: string): Promise<undefined>;
};
export default colaDB;
