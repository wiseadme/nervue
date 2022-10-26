import { ref } from 'vue';
export const NERVUE_ROOT_SYMBOL = Symbol.for('nervue');
export const root = ref({
    isInstalled: false,
    _stores: {},
    _exposed: {}
});
//# sourceMappingURL=root.js.map