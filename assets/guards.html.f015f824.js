import{_ as n,o as s,c as a,a as t}from"./app.f142f31f.js";const p={},o=t(`<h1 id="guards" tabindex="-1"><a class="header-anchor" href="#guards" aria-hidden="true">#</a> Guards</h1><p>Гуарды - это по сути функции валидаторы, которые будут выполнены перед тем, как мутировать <code>state</code> приложения. Они объявляются по имени свойства которое будут валидировать, в виде массива функций валидаторов, которые должны возвращать объект нижеследующего вида:</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// typescript</span>
<span class="token punctuation">{</span>
  value <span class="token operator">?</span> <span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> next
<span class="token operator">:</span>
  <span class="token builtin">boolean</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Давайте рассмотрим небольшой боевой пример кода:</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>

<span class="token keyword">const</span> usersStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">&#39;PRODUCTS&#39;</span><span class="token punctuation">,</span>

  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    products<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    categories<span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

  guards<span class="token operator">:</span> <span class="token punctuation">{</span>
    products<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// валидация массива вернет true или false</span>
      <span class="token punctuation">(</span>items<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
        next<span class="token operator">:</span> items<span class="token punctuation">.</span><span class="token function">every</span><span class="token punctuation">(</span>it <span class="token operator">=&gt;</span> it<span class="token punctuation">.</span>visible<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span>items<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
        next<span class="token operator">:</span> <span class="token operator">!</span>items<span class="token punctuation">.</span><span class="token function">some</span><span class="token punctuation">(</span>it <span class="token operator">=&gt;</span> <span class="token operator">!</span>it<span class="token punctuation">.</span>available<span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  actions<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">async</span> <span class="token function">fetchProductItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/products&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>products <span class="token operator">=</span> data<span class="token punctuation">.</span>items
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>В случае если хотя бы одна проверка <code>items</code> гуардами вернет значение <code>next</code> равное <code>false</code>, мутация состояния будет пропущена, то есть сработает защита от нежелательных мутаций состояния приложения.</p><h1 id="не-только-валидаторы" tabindex="-1"><a class="header-anchor" href="#не-только-валидаторы" aria-hidden="true">#</a> Не только валидаторы</h1><p>Гуарды можно использовать не только как валидаторы, но и для модификации данных. С их помощью можно привести данные в нужный вид для мутации состояния. Давайте рассмотрим тот же пример, но немного изменив его:</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>

<span class="token keyword">const</span> usersStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">&#39;PRODUCTS&#39;</span><span class="token punctuation">,</span>

  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    products<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    categories<span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

  guards<span class="token operator">:</span> <span class="token punctuation">{</span>
    products<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">(</span>items<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> visibleItems <span class="token operator">=</span> items<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>it <span class="token operator">=&gt;</span> it<span class="token punctuation">.</span>visible<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            next<span class="token operator">:</span> items<span class="token punctuation">.</span>length<span class="token punctuation">,</span>
            value<span class="token operator">:</span> visibleItems
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  actions<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">async</span> <span class="token function">fetchProductItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/products&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>products <span class="token operator">=</span> data<span class="token punctuation">.</span>items
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div></div><p>Как видно из примера выше, гуард возвращает объект у которого присутствует совйство <code>value</code>, которое и будет сохранено для мутации, если не будет модифицировано нижеследующим гуардом. Давайте продолжим рассматривать все тот же пример:</p><div class="language-typescript" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;nervue&#39;</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>

<span class="token keyword">const</span> usersStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">&#39;PRODUCTS&#39;</span><span class="token punctuation">,</span>

  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    products<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    categories<span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

  guards<span class="token operator">:</span> <span class="token punctuation">{</span>
    products<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">(</span>items<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> visibleItems <span class="token operator">=</span> items<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>it <span class="token operator">=&gt;</span> it<span class="token punctuation">.</span>visible<span class="token punctuation">)</span>

        <span class="token keyword">return</span> <span class="token punctuation">{</span>
          next<span class="token operator">:</span> visibleItems<span class="token punctuation">.</span>length<span class="token punctuation">,</span>
          value<span class="token operator">:</span> visibleItems
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// В качестве массива products мы получаем уже</span>
      <span class="token comment">// отфильтрованный массив предыдущим гуардом</span>
      <span class="token punctuation">(</span>items<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// тут некая логика...</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  actions<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">async</span> <span class="token function">fetchProductItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&#39;/products&#39;</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>products <span class="token operator">=</span> data<span class="token punctuation">.</span>items
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div>`,11),c=[o];function e(u,l){return s(),a("div",null,c)}const i=n(p,[["render",e],["__file","guards.html.vue"]]);export{i as default};
