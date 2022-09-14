<template><div><h1 id="guards" tabindex="-1"><a class="header-anchor" href="#guards" aria-hidden="true">#</a> Guards</h1>
<p>Гуарды - это по сути валидаторы, которые будут выполнены перед тем, как мутировать <code v-pre>state</code> приложения.
Они объявляются по имени свойства которое будут валидировать, в виде массива функций
валидаторов, которые должны возвращать объект нижеследующего вида:</p>
<div class="language-typescript ext-ts"><pre v-pre class="language-typescript"><code><span class="token comment">// typescript</span>
<span class="token punctuation">{</span> value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> isValid<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">}</span>
</code></pre></div><p>Давайте рассмотрим небольшой боевой пример кода:</p>
<div class="language-typescript ext-ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'axios'</span>

<span class="token keyword">const</span> usersStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">'PRODUCTS'</span><span class="token punctuation">,</span>

  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    visibleiItems<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    categories<span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

  guards<span class="token operator">:</span> <span class="token punctuation">{</span>
    visibleiItems<span class="token operator">:</span> <span class="token punctuation">[</span>
      products <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
        isValid<span class="token operator">:</span> products<span class="token punctuation">.</span><span class="token function">every</span><span class="token punctuation">(</span>it <span class="token operator">=></span> <span class="token operator">!</span><span class="token operator">!</span>it<span class="token punctuation">.</span>visible<span class="token punctuation">)</span><span class="token punctuation">,</span>
        value<span class="token operator">:</span> products
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  actions<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">async</span> <span class="token function">fetchProductItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/products'</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>visibleItems <span class="token operator">=</span> items
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>В случае если хотя бы одна проверка <code v-pre>items</code>  гуардами вернет значение <code v-pre>isValid</code> равное <code v-pre>false</code>,
мутация состояния будет пропущена, то есть сработает защита от нежелательных мутаций состояния приложения.</p>
<h1 id="не-только-валидаторы" tabindex="-1"><a class="header-anchor" href="#не-только-валидаторы" aria-hidden="true">#</a> Не только валидаторы</h1>
<p>Если посмотреть на гуарды под другим углом, то можно увидеть то, что гуарды могут как защитить,
так и помочь привести данные в нужный вид для мутации состояния.
Давайте рассмотрим тот же пример, но немного изменив его:</p>
<div class="language-typescript ext-ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'axios'</span>

<span class="token keyword">const</span> usersStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">'PRODUCTS'</span><span class="token punctuation">,</span>

  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    visibleiItems<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    categories<span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

  guards<span class="token operator">:</span> <span class="token punctuation">{</span>
    visibleiItems<span class="token operator">:</span> <span class="token punctuation">[</span>
      products <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> visibleProducts <span class="token operator">=</span> products<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>it <span class="token operator">=></span> it<span class="token punctuation">.</span>visible<span class="token punctuation">)</span>
        
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            isValid<span class="token operator">:</span> visibleProducts<span class="token punctuation">.</span>length<span class="token punctuation">,</span>
            value<span class="token operator">:</span> visibleProducts
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  actions<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">async</span> <span class="token function">fetchProductItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/products'</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>visibleItems <span class="token operator">=</span> items
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br></div></div><p>Как видно из примера выше гуарды могут быть полезны в качестве не только валидаторов, но
и в качестве функций модификаторов данных. Более того, с помощью гуардов данные можно обрабатывать
пошагово. Давайте продолжим рассматривать все тот же пример:</p>
<div class="language-typescript ext-ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'axios'</span>

<span class="token keyword">const</span> usersStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">'PRODUCTS'</span><span class="token punctuation">,</span>

  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    visibleiItems<span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    categories<span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

  guards<span class="token operator">:</span> <span class="token punctuation">{</span>
    visibleiItems<span class="token operator">:</span> <span class="token punctuation">[</span>
      products <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> visibleProducts <span class="token operator">=</span> products<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span>it <span class="token operator">=></span> it<span class="token punctuation">.</span>visible<span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            isValid<span class="token operator">:</span> visibleProducts<span class="token punctuation">.</span>length<span class="token punctuation">,</span>
            value<span class="token operator">:</span> visibleProducts
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// В качестве аргумента мы получаем уже</span>
      <span class="token comment">// модифицированные данные предыдущим валидатором</span>
      products <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// тут некая логика...</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  actions<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">async</span> <span class="token function">fetchProductItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> items <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/products'</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>visibleItems <span class="token operator">=</span> items
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token builtin">Promise</span><span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div></div></template>


