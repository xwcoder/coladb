import ObjectStore from './objectstore';
import { createPromisifyRequestMethods, createPromisifyOpenCursorMthods } from './promisify';
import { createHandler } from './proxyhandlers';
const requestMethodNames = [
    'count',
    'get',
    'getKey',
    'getAll',
    'getAllKeys'
];
export default function Index(index) {
    const agency = Object.assign({ objectStore: ObjectStore(index.objectStore) }, createPromisifyOpenCursorMthods(index), createPromisifyRequestMethods(index, requestMethodNames));
    return new Proxy(index, createHandler(agency));
}
//# sourceMappingURL=colaindex.js.map