<template><div><h1 id="state" tabindex="-1"><a class="header-anchor" href="#state" aria-hidden="true">#</a> State</h1>
<p>Реактивное состояние хранилища, которое определяется с помощью
функции - инициализатора, который вовзвращает объект с ключами:</p>
<div class="language-typescript ext-ts"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> <span class="token function-variable function">state</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token string">'Alex'</span><span class="token punctuation">,</span>
  age<span class="token operator">:</span> <span class="token number">35</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>После того как определен объект состояния хранилища, в момент инициализации
хранилища оно будет обернуто в <code v-pre>proxy</code> объект, с помощью чего
будет расширена функциональные возможности доступа к свойствам состояния,
с помощью метода <code v-pre>prev</code></p>
</div></template>


