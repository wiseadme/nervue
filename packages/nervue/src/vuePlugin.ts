import type { Plugin } from 'vue-demi'

export const NervuePlugin: Plugin = function (Vue){
  Vue.mixin({
    beforeCreate(){
      const options = this.$options
      const nervue = options.nervue

      if (nervue.isInstalled) {
        return
      }

      this.$nervue = nervue
    }
  })
}
