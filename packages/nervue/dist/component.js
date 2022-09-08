import { defineComponent, h } from 'vue';
import { useNervue } from './createNervue';
export const VNervue = defineComponent({
    name: 'VNervue',
    props: {
        store: {
            type: [String, Function],
            required: true
        }
    },
    setup(props, { slots }) {
        let _store = null;
        if (typeof props.store === 'string') {
            _store = useNervue(props.store);
        }
        else {
            _store = props.store();
        }
        return () => h('div', {
            class: 'v-nervue'
        }, {
            default: () => slots.default?.({ ..._store })
        });
    }
});
//# sourceMappingURL=component.js.map