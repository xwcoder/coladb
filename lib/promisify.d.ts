import { keyType } from './types';
export declare const promiseifyRequest: (request: IDBRequest<any>) => Promise<any>;
export declare function createPromisifyRequestMethod(obj: IDBObjectStore | IDBIndex | IDBCursor, methodName: string): (...args: any[]) => Promise<any>;
export declare function createPromisifyRequestMethods(obj: IDBObjectStore | IDBIndex | IDBCursor, methodNames: string[]): {};
export declare const createPromisifyOpenCursorMthods: (obj: IDBObjectStore | IDBIndex) => {
    openCursor(range?: keyType, direction?: IDBCursorDirection): Promise<IDBCursorWithValue>;
    openKeyCursor(range?: keyType, direction?: IDBCursorDirection): Promise<IDBCursorWithValue>;
};
