import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../app.9fbc48e4.mjs";
import "@vuepress/shared";
import "ts-debounce";
import "vue-router";
import "@vueuse/core";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="state" tabindex="-1"><a class="header-anchor" href="#state" aria-hidden="true">#</a> State</h1><p><code>State</code> - это реактивный объект, который определяется с помощью функции фабрики, которая в свою очередь всегда возвращает объект инициализации состояния:</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">state</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&#39;Alex&#39;</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">35</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>В момент инициализации <code>state</code> будет обернут в <code>proxy</code> объект, с помощью которого будут перехватытваться все обращения к объекту состояния. Это сделано для того, что бы защитить состояние от нежелательных мутаций с помощью гуардов, о которых вы узнаете далее.</p><p>Теперь, после инициализции <code>state</code> мы имеем состояние которое можем мутировать:</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>

<span class="token keyword">const</span> <span class="token function-variable function">state</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">&#39;Alex&#39;</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">35</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setUserName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// доступ к state мы получаем прямо из контекста this</span>
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/core-concepts/state.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const state_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "state.html.vue"]]);
export {
  state_html as default
};
