import ObjectStore from './objectstore';
import { createHandler } from './proxyhandlers';
export default function Transaction(transaction) {
    const proxyMethods = {
        objectStore(name) {
            return ObjectStore(transaction.objectStore(name));
        }
    };
    return new Proxy(transaction, createHandler(proxyMethods));
}
//# sourceMappingURL=transaction.js.map