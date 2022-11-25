<template><div><h1 id="документация-api" tabindex="-1"><a class="header-anchor" href="#документация-api" aria-hidden="true">#</a> Документация API</h1>
<h2 id="createnervue" tabindex="-1"><a class="header-anchor" href="#createnervue" aria-hidden="true">#</a> createNervue</h2>
<p>Возвращает <code v-pre>vue</code> плагин <strong>Nervue</strong>.</p>
<div class="language-typescript" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createNervue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">'./App.vue'</span>

<span class="token keyword">const</span> nervue <span class="token operator">=</span> <span class="token function">createNervue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>nervue<span class="token punctuation">)</span>
</code></pre></div><p>Для того чтобы получить доступ к <code v-pre>nervue</code> объекту, достаточно будет
использовать <code v-pre>inject</code>, передав ему в качестве аргумента <code v-pre>nervueSymbol</code>.</p>
<div class="language-vue" data-ext="vue"><pre v-pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span> nervueSymbol <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>

  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">const</span> globalStore <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>nervueSymbol<span class="token punctuation">)</span>

      globalStore<span class="token punctuation">.</span>stores<span class="token punctuation">.</span><span class="token constant">USER</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

</code></pre></div><p>Nervue устанавливается как глобальная переменная и поэтому мы можем обращаться из шаблона
компонента к нему на прямую:</p>
<div class="language-vue" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>user__name<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      {{ $nervue.stores.USER.name }}
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">></span></span>
</code></pre></div><h2 id="createcomponent" tabindex="-1"><a class="header-anchor" href="#createcomponent" aria-hidden="true">#</a> createComponent</h2>
<p>В процессе...</p>
<h2 id="usenervue" tabindex="-1"><a class="header-anchor" href="#usenervue" aria-hidden="true">#</a> useNervue</h2>
<p>Функция, которая возвращает корневой объект <strong>Nervue</strong>.</p>
<div class="language-vue" data-ext="vue"><pre v-pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>ts<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span> useNervue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>
  
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// корневой объект Nervue</span>
      <span class="token keyword">const</span> nervue <span class="token operator">=</span> <span class="token function">useNervue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        nervue
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

</code></pre></div><h2 id="usestore" tabindex="-1"><a class="header-anchor" href="#usestore" aria-hidden="true">#</a> useStore</h2>
<p>В процессе...</p>
<h2 id="definestore" tabindex="-1"><a class="header-anchor" href="#definestore" aria-hidden="true">#</a> defineStore</h2>
<p>В процессе...</p>
<h2 id="mapstate" tabindex="-1"><a class="header-anchor" href="#mapstate" aria-hidden="true">#</a> mapState</h2>
<p>Позволяет получить доступ к свойствам <code v-pre>state</code> и <code v-pre>computed</code> хранилища, путем распространения в <code v-pre>computed</code> свойстве
компонента, с использованием <code v-pre>options api</code>. В качестве первого аргумента принимает <code v-pre>useStore</code> функцию, возвращающую хранилище, вторым аргументом необходимо
передать либо объект, либо массив ключей.</p>
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
        <span class="token function-variable function">doubleCount</span><span class="token operator">:</span> <span class="token parameter">store</span> <span class="token operator">=></span> store<span class="token punctuation">.</span>count <span class="token operator">*</span> <span class="token number">2</span>
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
<p>В процессе...</p>
<h2 id="patch" tabindex="-1"><a class="header-anchor" href="#patch" aria-hidden="true">#</a> $patch</h2>
<p>В процессе...</p>
<h2 id="subscribe" tabindex="-1"><a class="header-anchor" href="#subscribe" aria-hidden="true">#</a> $subscribe</h2>
<p>В процессе...</p>
</div></template>


