import Index from './colaindex';
import { createPromisifyRequestMethods, createPromisifyOpenCursorMthods } from './promisify';
import { createHandler } from './proxyhandlers';
const requestMethodNames = [
    'add',
    'clear',
    'count',
    'delete',
    'get',
    'getKey',
    'getAll',
    'getAllKeys',
    'put'
];
export default function ObjectStore(store) {
    const proxyMethods = Object.assign({ index(name) {
            return Index(store.index(name));
        },
        createIndex(name, keyPath, options) {
            return Index(store.createIndex(name, keyPath, options));
        } }, createPromisifyOpenCursorMthods(store), createPromisifyRequestMethods(store, requestMethodNames));
    return new Proxy(store, createHandler(proxyMethods));
}
//# sourceMappingURL=objectstore.js.map