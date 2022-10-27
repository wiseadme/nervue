<template><div><h1 id="state" tabindex="-1"><a class="header-anchor" href="#state" aria-hidden="true">#</a> State</h1>
<p><code v-pre>State</code> - это реактивное состояние хранилища. Определяется с помощью
функции, которая вовзвращает объект:</p>
<div class="language-typescript ext-ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">state</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'Alex'</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">35</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>В момент инициализации <code v-pre>state</code> будет обернут в <code v-pre>proxy</code> объект, с помощью которого
реализованы гуарды. Подробнее о гуардах вы узнаете далее.</p>
</div></template>


