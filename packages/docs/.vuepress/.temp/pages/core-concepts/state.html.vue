<template><div><h1 id="state" tabindex="-1"><a class="header-anchor" href="#state" aria-hidden="true">#</a> State</h1>
<p>Это реактивный объект, который определяется с помощью
функции фабрики, которая всегда возвращает объект инициализации состояния:</p>
<div class="language-typescript" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">state</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'Alex'</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">35</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>В момент инициализации <code v-pre>state</code> сначала будет обернут в <code v-pre>proxy</code> объект (зачем это сделано, вы узнаете позже) и
только затем
полученный <code v-pre>proxy</code> объект будет обернут в реактивный прокси, с помощью использования Vue API <code v-pre>ref</code>
и <code v-pre>toRefs</code>. Затем уже полученный реактивный объект будет дополнительно обернут в <code v-pre>reactive</code> для распоковывания
значения <code v-pre>ref</code>
объекта,
как это указано в документации Vue по <code v-pre>reactive</code> API, с сохранением реактивности. Что в свою очередь повзолит
нам получать значения <code v-pre>state</code> без использования <code v-pre>value</code>.</p>
<p>Теперь, после инициализции <code v-pre>state</code> мы имеем состояние которое можем мутировать:</p>
<div class="language-typescript" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>

<span class="token keyword">const</span> <span class="token function-variable function">state</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'Alex'</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">35</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> actions <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">setUserName</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// доступ к state мы получаем прямо из контекста this</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> useUserStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">'USER'</span><span class="token punctuation">,</span>
  state<span class="token punctuation">,</span>
  actions
<span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre></div></div></template>


