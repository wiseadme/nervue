import { defineComponent, h } from 'vue';
import { useZikkurat } from './createZikkurat';
export const VZikkurat = defineComponent({
    name: 'VZikkurat',
    props: {
        store: {
            type: [String, Function],
            required: true
        }
    },
    setup(props, { slots }) {
        let _store = null;
        if (typeof props.store === 'string') {
            _store = useZikkurat(props.store);
        }
        else {
            _store = props.store();
        }
        return () => h('div', {
            class: 'v-zikkurat'
        }, {
            default: () => slots.default?.({ ..._store })
        });
    }
});
//# sourceMappingURL=component.js.map