<template><div><h1 id="функции" tabindex="-1"><a class="header-anchor" href="#функции" aria-hidden="true">#</a> Функции</h1>
<h2 id="createnervue" tabindex="-1"><a class="header-anchor" href="#createnervue" aria-hidden="true">#</a> createNervue</h2>
<p>Возвращает <code v-pre>vue</code> плагин, который установит <code v-pre>root</code> объект Nervue в качестве глобальной переменной,
доступ к которой можно получить с помощью инъекции по ключу <code v-pre>NERVUE_ROOT_SYMBOL</code>.</p>
<div class="language-typescript ext-ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createNervue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useProductStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./product-store'</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createNervue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

store<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>useProductStore<span class="token punctuation">)</span>
</code></pre></div><p>Затем импортируем в <code v-pre>main.ts</code></p>
<div class="language-typescript ext-ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> store <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./store'</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App.vue'</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>store<span class="token punctuation">)</span>

</code></pre></div><h2 id="definestore" tabindex="-1"><a class="header-anchor" href="#definestore" aria-hidden="true">#</a> defineStore</h2>
<h2 id="mapstate" tabindex="-1"><a class="header-anchor" href="#mapstate" aria-hidden="true">#</a> mapState</h2>
<p>Позволяет использовать состояние хранилища, путем создания объекта распространения доступа в <code v-pre>computed</code> свойстве
компонента. В качестве аргумента принимает <code v-pre>composition</code> функцию, возвращающую хранилище, вторым аргументом можно
передать либо объект ключей, вида <code v-pre>{ localKeyName: &quot;stateKey&quot;}</code>, либо массив ключей состояния.</p>
<p>В качестве примера возьмем все то же хранилище, которое мы определили ранее в качестве базового примера:</p>
<div class="language-typescript ext-ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>

<span class="token keyword">const</span> useCounterStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">'counter'</span><span class="token punctuation">,</span>
  <span class="token comment">// определяем состояние</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    count<span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token comment">// определяем действия</span>
  actions<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Теперь мы можем в Vue компоненте извлечь ключи состояния, с помощью <code v-pre>mapState</code>:</p>
<div class="language-vue ext-vue"><pre v-pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> mapState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span> useCounterStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./store/counter-store'</span>

  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span><span class="token function">mapState</span><span class="token punctuation">(</span>useCounterStore<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">counterValue</span><span class="token operator">:</span> <span class="token string">'count'</span><span class="token punctuation">,</span>
        <span class="token function-variable function">doubleCount</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>count <span class="token operator">*</span> <span class="token number">2</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>counterValue <span class="token operator">-=</span> <span class="token number">1</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
</code></pre></div><div class="custom-container tip"><p class="custom-container-title">Примечание</p>
<p>Нет необходимости использовать <code v-pre>mapState</code> при использовании <code v-pre>composition api</code>.</p>
</div>
<h2 id="mapactions" tabindex="-1"><a class="header-anchor" href="#mapactions" aria-hidden="true">#</a> mapActions</h2>
<h2 id="usenervue" tabindex="-1"><a class="header-anchor" href="#usenervue" aria-hidden="true">#</a> useNervue</h2>
</div></template>

