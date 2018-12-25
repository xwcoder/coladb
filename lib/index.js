import { promiseifyRequest } from './promisify';
import DB from './db';
const colaDB = {
    async open(name, version, onupgradeneeded, onblocked) {
        const request = indexedDB.open(name, version);
        if (onupgradeneeded) {
            request.onupgradeneeded = (event) => {
                onupgradeneeded(DB(request.result), event.oldVersion, event.newVersion);
            };
        }
        if (onblocked) {
            request.onblocked = onblocked;
        }
        const db = await promiseifyRequest(request);
        return DB(db);
    },
    deleteDatabase(name) {
        const request = indexedDB.deleteDatabase(name);
        return promiseifyRequest(request);
    }
};
export default colaDB;
//# sourceMappingURL=index.js.map