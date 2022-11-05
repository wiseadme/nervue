import type { Plugin } from 'vue-demi'

export const NervuePlugin: Plugin = function (Vue){
  Vue.mixin({
    beforeCreate() {
      const options = this.$options;

      if (options.nervue) {
        let nervue = options.nervue;

        if (this.$nervue && this.$nervue.isInstalled) {
          return;
        }

        this.$nervue = nervue
        this.$nervue.isInstalled = true;

      } else if (!this.$nervue && options.parent.$nervue) {
        this.$nervue = options.parent.$nervue
      }
    }
  });
}
