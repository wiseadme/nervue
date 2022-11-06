<template><div><h1 id="computed" tabindex="-1"><a class="header-anchor" href="#computed" aria-hidden="true">#</a> Computed</h1>
<p>Само название говорит за себя. Это хорошо знакомый вам по названию метод Vue, с помощью которого и реализованы
вычесления
в Nervue. Это абсолютный аналог getters во Vuex или в Pinia:</p>
<div class="language-typescript" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>

<span class="token keyword">const</span> useUserStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">'USER'</span><span class="token punctuation">,</span>

  <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token string">'Alex'</span><span class="token punctuation">,</span>
    secondName<span class="token operator">:</span> <span class="token string">'Malkovic'</span><span class="token punctuation">,</span>
    age<span class="token operator">:</span> <span class="token number">35</span><span class="token punctuation">,</span>
    gender<span class="token operator">:</span> <span class="token string">'Male'</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

  computed<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// функция в качестве аргумента принимает store</span>
    <span class="token function-variable function">fullName</span><span class="token operator">:</span> store <span class="token operator">=></span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> store<span class="token punctuation">.</span>name <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> store<span class="token punctuation">.</span>secondName <span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>

    <span class="token function">userFullInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token comment">// либо можно использовать контекст для доступа как к state, </span>
      <span class="token comment">// так и к другим computed значениям.</span>
      <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">name: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fullName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, age: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, gender: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span> <span class="token keyword">this</span><span class="token punctuation">.</span>gender <span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div></div></template>


