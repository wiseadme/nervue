<template><div><h1 id="actions" tabindex="-1"><a class="header-anchor" href="#actions" aria-hidden="true">#</a> Actions</h1>
<p>Действия это то место, где определяются методы вашего хранилища. Именно здесь можно реализовать бизнес логику и
взаимодействие с серверной частью.</p>
<div class="language-typescript" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> axios <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'axios'</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> useItemsStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    items<span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

  actions<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token keyword">async</span> <span class="token function">fetchItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/items'</span><span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>items <span class="token operator">=</span> data<span class="token punctuation">.</span>items
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Наверное нет необходимости объяснять свободу в использовании функций как таковых. Вы можете определять их с любым
количеством аргументов, использовать как для синхронных действий, так и для асинхронных, либо для вызова других
действий. Действия имеют полный доступ к контексту всего хранилища через ключевое слово <code v-pre>this</code>.</p>
<h2 id="использование-деиствии-c-setup" tabindex="-1"><a class="header-anchor" href="#использование-деиствии-c-setup" aria-hidden="true">#</a> Использование действий c <code v-pre>setup()</code></h2>
<div class="language-typescript" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useItemsStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./store/items-store'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> itemsStore <span class="token operator">=</span> <span class="token function">useItemsStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> <span class="token function-variable function">onClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      itemsStore<span class="token punctuation">.</span><span class="token function">fetchItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      onClick
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><h2 id="использование-деиствии-c-options-api" tabindex="-1"><a class="header-anchor" href="#использование-деиствии-c-options-api" aria-hidden="true">#</a> Использование действий c Options API</h2>
<p>Для этого можно использовать функцию <strong>mapActions</strong>.</p>
<div class="language-typescript" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> mapActions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useItemsStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./store/items-store'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  methods<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// получаем доступ к this.fetchItems()</span>
    <span class="token comment">// в контексте компонента</span>
    <span class="token operator">...</span><span class="token function">mapActions</span><span class="token punctuation">(</span>useItemsStore<span class="token punctuation">,</span> <span class="token punctuation">[</span> <span class="token string">'fetchItems'</span> <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token comment">// либо можем дать свое локальное название</span>
    <span class="token comment">// this.someMethodName()</span>
    <span class="token operator">...</span><span class="token function">mapActions</span><span class="token punctuation">(</span>useItemsStore<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      someMethodName<span class="token operator">:</span> <span class="token string">'fetchItems'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="подписка-на-деиствия" tabindex="-1"><a class="header-anchor" href="#подписка-на-деиствия" aria-hidden="true">#</a> Подписка на действия</h2>
<p>Мы можем наблюдать за действиями, с помощью функций обратного вызова получать результаты, обрабатывать ошибки,
создавать сторонние эффекты.</p>
<div class="language-typescript" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useItemsStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./store/items-store'</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useItemsStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> unsubscribe <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">$subscribe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// Имя действия.</span>
  name<span class="token operator">:</span> <span class="token string">'fetchItems'</span><span class="token punctuation">,</span>
  <span class="token comment">// Удаление подписки при размонтировании компонента,</span>
  <span class="token comment">// если установлено значение false.</span>
  <span class="token comment">// По умолчанию установлен false.</span>
  detached<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>

  <span class="token function">before</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Будет вызван до исполнения действия.</span>
    <span class="token comment">// В качестве аргумента получает те же аргументы,</span>
    <span class="token comment">// что и само действие.</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">after</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Будет вызван после действия.</span>
    <span class="token comment">// В качестве аргумента получает</span>
    <span class="token comment">// результат вызова действия.</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">onError</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Будет вызван, если действие возвратит ошибку.</span>
    <span class="token comment">// В качетсве аргумента получает</span>
    <span class="token comment">// перехваченную ошибку.</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div></div></template>


