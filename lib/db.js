import ObjectStore from './objectstore';
import Transaction from './transaction';
import { createHandler } from './proxyhandlers';
export default function DB(db) {
    const proxyMethods = {
        createObjectStore(name, optionalParameters) {
            return ObjectStore(db.createObjectStore(name, optionalParameters));
        },
        transaction(storeNames, mode) {
            return Transaction(db.transaction(storeNames, mode));
        }
    };
    return new Proxy(db, createHandler(proxyMethods));
}
//# sourceMappingURL=db.js.map