import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue-demi'
import { defineStore, mapState } from '../src'

describe('mapState', () => {
  let useStore

  beforeEach(() => {
    useStore = defineStore({
      id: 'a',
      state: () => ({
        name: 'Nervue',
        version: '0.0.21'
      }),
      computed: {
        nameAndVersion(){
          return `${ this.name } version ${ this.version }`
        }
      },
      actions: {
        setNewVersion() {
          this.version = '0.0.22'
        }
      }
    })
  })

  test('should test with array of keys', async () => {
    const store = useStore()

    const Component = defineComponent({
      computed: {
        ...mapState(useStore, ['name', 'version', 'nameAndVersion']),
      },
      template: `
        <div>
          <span class="name">{{ name }}</span>
          <span class="version">{{ version }}</span>
          <span class="nameAndVersion">{{ nameAndVersion }}</span>
        </div>
      `,
    })
    const wrapper = mount(Component)

    expect(wrapper.find('.name').text()).toEqual('Nervue')
    expect(wrapper.find('.version').text()).toEqual('0.0.21')
    expect(wrapper.find('.nameAndVersion').text()).toEqual('Nervue version 0.0.21')

    store.setNewVersion()

    await nextTick()

    expect(wrapper.find('.version').text()).toEqual('0.0.22')
    expect(wrapper.find('.nameAndVersion').text()).toEqual('Nervue version 0.0.22')
  })

  test('should test with mapper object', async () => {
    const store = useStore()

    const Component = defineComponent({
      computed: {
        ...mapState(useStore, {
          localName: store => store.name,
          localVersion: 'version',
          localNAndV: store => store.nameAndVersion
        }),
      },
      template: `
        <div>
          <span class="name">{{ localName }}</span>
          <span class="version">{{ localVersion }}</span>
          <span class="nameAndVersion">{{ localNAndV }}</span>
        </div>
      `,
    })

    const wrapper = mount(Component)

    expect(wrapper.find('.name').text()).toEqual('Nervue')
    expect(wrapper.find('.version').text()).toEqual('0.0.21')
    expect(wrapper.find('.nameAndVersion').text()).toEqual('Nervue version 0.0.21')

    store.setNewVersion()

    await nextTick()

    expect(wrapper.find('.version').text()).toEqual('0.0.22')
    expect(wrapper.find('.nameAndVersion').text()).toEqual('Nervue version 0.0.22')
  })
})
