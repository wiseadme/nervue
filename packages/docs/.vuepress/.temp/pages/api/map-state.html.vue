<template><div><h1 id="mapstate" tabindex="-1"><a class="header-anchor" href="#mapstate" aria-hidden="true">#</a> mapState</h1>
<p>Позволяет использовать состояние хранилища, путем создания объекта распространения доступа в <code v-pre>computed</code> свойстве
компонента. В качестве аргумента принимает <code v-pre>composition</code> функцию, возвращающую хранилище, вторым аргументом можно
передать либо объект ключей, вида <code v-pre>{ localKeyName: &quot;stateKey&quot;}</code>, либо массив ключей состояния.</p>
<p>В качестве примера возьмем все то же хранилище, которое мы определили ранее в качестве базового примера:</p>
<div class="language-typescript" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>

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
<div class="language-vue" data-ext="vue"><pre v-pre class="language-vue"><code>
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
        <span class="token function-variable function">doubleCount</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=></span> state<span class="token punctuation">.</span>count <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">,</span>
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
</div></template>


