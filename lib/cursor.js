import { createPromisifyRequestMethods, promiseifyRequest } from './promisify';
import { createHandler } from './proxyhandlers';
const requestMethodNames = [
    'delete',
    'update'
];
export default function Cursor(cursor, request) {
    const agency = Object.assign({ async advance(count) {
            cursor.advance(count);
            const nextCursor = await promiseifyRequest(request);
            return nextCursor ? Cursor(nextCursor, request) : nextCursor;
        },
        async continue(key) {
            cursor.continue(key);
            const nextCursor = await promiseifyRequest(request);
            return nextCursor ? Cursor(nextCursor, request) : nextCursor;
        },
        async continuePrimaryKey(key, primaryKey) {
            cursor.continuePrimaryKey(key, primaryKey);
            const nextCursor = await promiseifyRequest(request);
            return nextCursor ? Cursor(nextCursor, request) : nextCursor;
        } }, createPromisifyRequestMethods(cursor, requestMethodNames));
    return new Proxy(cursor, createHandler(agency));
}
//# sourceMappingURL=cursor.js.map