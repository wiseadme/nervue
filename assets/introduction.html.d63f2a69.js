import{_ as n,o as s,c as a,a as t}from"./app.48cd36d6.js";const p={},o=t(`<h1 id="что-такое-nervue" tabindex="-1"><a class="header-anchor" href="#что-такое-nervue" aria-hidden="true">#</a> Что такое Nervue?</h1><p><strong>Nervue</strong> - это интуитивно понятный и простой в использовании <code>state</code> менеджер для современных <strong>Vue</strong> приложений. Он позволяет вам писать чистый и хорошо структурированный код, который легко читается и поддерживается. А благодаря тому, что библиотека полностью реализована на <code>typescript</code>, она имеет отличную типизацию данных. Разумеется все это реализовано с поддержкой как <code>composition</code> так и <code>options</code> api.</p><p>Что означает название <strong>Nervue</strong>? Название созвучно со словом <strong>nerve</strong>, что в переводе означает &quot;нерв&quot;. Таким названием хотелось передать понимание, как о жизненно важной системе вашего приложения, которая будет реагировать так же быстро как ваша нервная система реагирует на происходящее вокруг, разумеется в хорошем смысле сказанного выше 😃.</p><h2 id="базовыи-пример" tabindex="-1"><a class="header-anchor" href="#базовыи-пример" aria-hidden="true">#</a> Базовый пример</h2><p>Давайте рассмотрим небольшой базовый пример использования <strong>Nervue</strong>:</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>

<span class="token keyword">const</span> useCounterStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">&#39;counter&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// определяем состояние</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    count<span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// определяем действия</span>
  actions<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Где - то в другом файле:</p><div class="language-vue" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span> useCounterStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./store/counter-store.ts&#39;</span>

  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useCounterStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token comment">// можно применять деструктуризацию, </span>
      <span class="token comment">// действия не потеряют контекст.</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> increment <span class="token punctuation">}</span> <span class="token operator">=</span> store

      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        store<span class="token punctuation">,</span>
        increment
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>counter-block<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>counter-display<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>{{ store.count }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>increment<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>up<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>И этого базового локального примера в принципе будет достаточно для того, что бы организовать хранилище состояния вашего реактивного приложения. Интересно? Ну что же, тогда поехали дальше.</p><div class="custom-container tip"><p class="custom-container-title">информация</p><p>Далее вы узнаете больше о возможностях библиотеки.</p></div>`,10),e=[o];function c(u,l){return s(),a("div",null,e)}const i=n(p,[["render",c],["__file","introduction.html.vue"]]);export{i as default};
