<template><div><h1 id="store" tabindex="-1"><a class="header-anchor" href="#store" aria-hidden="true">#</a> Store</h1>
<p>Прежде чем приступить к работе с хранилищем, необходимо сначала создать
его, с помощью функции <code v-pre>defineStore</code>, передав ему в качестве аргумента
объект с опциями, который обязательно должен включать в себя уникальное <code v-pre>id</code>,
с помощью которого унифицируется доступ к данному хранилищу:</p>
<div class="language-typescript line-numbers-mode" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>

<span class="token keyword">const</span> useUserStore <span class="token operator">=</span> <span class="token function">defineStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token string">'user'</span><span class="token punctuation">,</span>
  <span class="token comment">//...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


