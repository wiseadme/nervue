import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "../app.9fbc48e4.mjs";
import "@vuepress/shared";
import "ts-debounce";
import "vue-router";
import "@vueuse/core";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="установка" tabindex="-1"><a class="header-anchor" href="#установка" aria-hidden="true">#</a> Установка</h1><p>Для начала необходимо установить <strong>Nervue</strong> с помощью вашего любимого менеджера пакетов:</p><div class="language-bash" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> nervue
<span class="token comment"># или с помощью</span>
<span class="token function">yarn</span> <span class="token function">add</span> nervue
</code></pre></div><p>Далее после установки библиотеки, мы можем создать глобальный <code>root</code> объект <strong>Nervue</strong></p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createNervue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createNervue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>В <code>main.ts</code></p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> store <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./store&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> router <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./router&#39;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>store<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span>

router<span class="token punctuation">.</span><span class="token function">isReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><p>Таким образом мы создали <code>root</code> объект, куда будут добавлены все созданные <code>useStore</code> функции.</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>Примечание! Вы можете прекрасно обходиться и без создания <code>root</code> объекта, просто импортируя ваши хранилища туда, там где вам это необходимо.</p></div><h2 id="добавление-usestore-функции-в-root-объект" tabindex="-1"><a class="header-anchor" href="#добавление-usestore-функции-в-root-объект" aria-hidden="true">#</a> Добавление useStore функции в root объект</h2><p>Добавление функции useStore происходит автоматически, соответственно функция уже возвращает хранилище которое добавлено в <code>root</code> объект, именно поэтому нет никакой необходимости делать это вручную. Но для того, что бы было понимание как это происходит, вам будет достаточно взглянуть на следующий пример:</p><div class="language-javascript" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createNervue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useUserStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;modules/users/store&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createNervue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

store<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>useUserStore<span class="token punctuation">)</span>
</code></pre></div><p>Метод <code>set</code> сохранит по <code>id</code> ключу функцию useStore в <code>root</code> объекте, после чего, получить значение сохраненное по ключу <code>id</code> можно будет как с помощью самой функции useStore, так и с помощью функции <code>useNervue</code>:</p><div class="language-vue" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> useNervue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>
  
  <span class="token keyword">const</span> userStore <span class="token operator">=</span> <span class="token function">useNervue</span><span class="token punctuation">(</span><span class="token string">&#39;USER&#39;</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../pages/getting-started.html.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const gettingStarted_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__file", "getting-started.html.vue"]]);
export {
  gettingStarted_html as default
};
