import Cursor from './cursor';
export const promiseifyRequest = (request) => new Promise((resolve, reject) => {
    request.onsuccess = () => {
        resolve(request.result);
    };
    request.onerror = () => {
        reject(request.error);
    };
});
export function createPromisifyRequestMethod(obj, methodName) {
    return (...args) => {
        const request = obj[methodName].call(obj, ...args);
        return promiseifyRequest(request);
    };
}
export function createPromisifyRequestMethods(obj, methodNames) {
    const methods = {};
    methodNames.forEach((methodName) => {
        methods[methodName] = createPromisifyRequestMethod(obj, methodName);
    });
    return methods;
}
export const createPromisifyOpenCursorMthods = (obj) => ({
    async openCursor(range, direction) {
        const request = obj.openCursor(range, direction);
        const cursor = await promiseifyRequest(request);
        return Cursor(cursor, request);
    },
    async openKeyCursor(range, direction) {
        const request = obj.openCursor(range, direction);
        const cursor = await promiseifyRequest(request);
        return Cursor(cursor, request);
    }
});
//# sourceMappingURL=promisify.js.map