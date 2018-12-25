export const createHandler = (agency) => ({
    set(target, p, value, receiver) {
        target[p] = value;
        return true;
    },
    get(target, p, receiver) {
        if (agency[p]) {
            return agency[p];
        }
        if (typeof target[p] === 'function') {
            return (...args) => {
                target[p].call(target, ...args);
            };
        }
        return target[p];
    }
});
//# sourceMappingURL=proxyhandlers.js.map