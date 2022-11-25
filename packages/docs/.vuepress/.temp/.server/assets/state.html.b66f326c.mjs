import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../app.730bf4d3.mjs";
import "@vuepress/shared";
import "ts-debounce";
import "vue-router";
import "@vueuse/core";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="state" tabindex="-1"><a class="header-anchor" href="#state" aria-hidden="true">#</a> State</h1><p>Is a reactive object that is defined using a factory function that always returns a state initialization object:</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">state</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&#39;Alex&#39;</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">35</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>During initialization, the <code>state</code> will first be wrapped in a <code>proxy</code> object (you will find out why this is done later) and only then the resulting proxy object will be wrapped in a reactive proxy, using the Vue API <code>ref</code> and <code>toRefs</code>. Then the resulting reactive object will be additionally wrapped in <code>reactive</code> to decompress the <code>value</code> of the <code>ref</code> object, as specified in the Vue documentation for the <code>reactive</code> API, while maintaining reactivity.</p><p>Now, after initializing, we have the state that we can mutate:</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>

<span class="token keyword">const</span> <span class="token function-variable function">state</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&#39;Alex&#39;</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">35</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setUserName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// we get access to state directly from the &quot;this&quot; context</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> useUserStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">&#39;USER&#39;</span><span class="token punctuation">,</span>
  state<span class="token punctuation">,</span>
  actions
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/en/core-concepts/state.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const state_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "state.html.vue"]]);
export {
  state_html as default
};
