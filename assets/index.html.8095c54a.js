import{_ as n,o as s,c as a,a as t}from"./app.fe82b37f.js";const p={},o=t(`<h1 id="документация-api" tabindex="-1"><a class="header-anchor" href="#документация-api" aria-hidden="true">#</a> Документация API</h1><h2 id="createnervue" tabindex="-1"><a class="header-anchor" href="#createnervue" aria-hidden="true">#</a> createNervue</h2><p>Возвращает <code>vue</code> плагин, который установит <code>root</code> объект Nervue в качестве глобальной переменной, доступ к которой можно получить с помощью инъекции по ключу <code>nervueSymbol</code>.</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createNervue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useProductStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./product-store&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createNervue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

store<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>useProductStore<span class="token punctuation">)</span>
</code></pre></div><p>Затем импортируем в <code>main.ts</code></p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> store <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./store&#39;</span>
<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">&#39;./App.vue&#39;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>store<span class="token punctuation">)</span>
</code></pre></div><p>Теперь для того чтобы получить доступ к <code>root</code> объекту, достаточно будет использовать <code>inject</code>.</p><div class="language-vue" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent<span class="token punctuation">,</span> inject <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span> nervueSymbol <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>

  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">const</span> globalStore <span class="token operator">=</span> <span class="token function">inject</span><span class="token punctuation">(</span>nervueSymbol<span class="token punctuation">)</span>

      globalStore<span class="token punctuation">.</span>_stores<span class="token punctuation">.</span><span class="token constant">PRODUCT</span><span class="token punctuation">.</span><span class="token function">fetchProducts</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

</code></pre></div><h2 id="usenervue" tabindex="-1"><a class="header-anchor" href="#usenervue" aria-hidden="true">#</a> useNervue</h2><p>Функция, которая возвращает <code>root</code> объект. Если в качестве аргумента передать <code>id</code> конкретного хранилища, которое зарегистрировано в <code>root</code> объекте, с помощью метода <code>set</code>, то в таком случае функция вернет хранилище по <code>id</code> ключу.</p><div class="language-vue" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span> useNervue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>
  
  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> productStore <span class="token operator">=</span> <span class="token function">useNervue</span><span class="token punctuation">(</span><span class="token string">&#39;PRODUCT&#39;</span><span class="token punctuation">)</span>
      
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        productStore
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

</code></pre></div><h2 id="definestore" tabindex="-1"><a class="header-anchor" href="#definestore" aria-hidden="true">#</a> defineStore</h2><h2 id="mapstate" tabindex="-1"><a class="header-anchor" href="#mapstate" aria-hidden="true">#</a> mapState</h2><p>Позволяет получить доступ к свойствам <code>state</code> и <code>computed</code> хранилища, путем распространения в <code>computed</code> свойстве компонента, с использованием <code>options api</code>. В качестве первого аргумента принимает <code>useStore</code> функцию, возвращающую хранилище, вторым аргументом необходимо передать либо объект, либо массив ключей.</p><p>В качестве примера возьмем все то же хранилище, которое мы определили ранее в качестве базового примера:</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>

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
</code></pre></div><p>Теперь мы можем в Vue компоненте извлечь ключи состояния, с помощью <code>mapState</code>:</p><div class="language-vue" data-ext="vue"><pre class="language-vue"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> mapState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>
  <span class="token keyword">import</span> <span class="token punctuation">{</span> useCounterStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./store/counter-store&#39;</span>

  <span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">computed</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token operator">...</span><span class="token function">mapState</span><span class="token punctuation">(</span>useCounterStore<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">counterValue</span><span class="token operator">:</span> <span class="token string">&#39;count&#39;</span><span class="token punctuation">,</span>
        <span class="token function-variable function">doubleCount</span><span class="token operator">:</span> <span class="token parameter">state</span> <span class="token operator">=&gt;</span> state<span class="token punctuation">.</span>count <span class="token operator">*</span> <span class="token number">2</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>counterValue <span class="token operator">-=</span> <span class="token number">1</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><div class="custom-container tip"><p class="custom-container-title">Примечание</p><p>Нет необходимости использовать <code>mapState</code> при использовании <code>composition api</code>.</p></div><h2 id="mapactions" tabindex="-1"><a class="header-anchor" href="#mapactions" aria-hidden="true">#</a> mapActions</h2><h2 id="patch" tabindex="-1"><a class="header-anchor" href="#patch" aria-hidden="true">#</a> $patch</h2><h2 id="subscribe" tabindex="-1"><a class="header-anchor" href="#subscribe" aria-hidden="true">#</a> $subscribe</h2>`,22),e=[o];function c(u,l){return s(),a("div",null,e)}const k=n(p,[["render",c],["__file","index.html.vue"]]);export{k as default};
