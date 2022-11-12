<template><div><h1 id="установка" tabindex="-1"><a class="header-anchor" href="#установка" aria-hidden="true">#</a> Установка</h1>
<p>Для начала необходимо установить <strong>Nervue</strong> с помощью вашего любимого менеджера пакетов:</p>
<div class="language-bash" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> nervue
<span class="token comment"># или с помощью</span>
<span class="token function">yarn</span> <span class="token function">add</span> nervue
</code></pre></div><p>Далее после установки библиотеки, мы можем создать экземпляр <strong>Nervue</strong>
который будет корневым объектом всех хранилищ:</p>
<div class="language-typescript" data-ext="ts"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> router <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./router'</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createNervue <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'nervue'</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> nervue <span class="token operator">=</span> <span class="token function">createNervue</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>nervue<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span>

router<span class="token punctuation">.</span><span class="token function">isReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> app<span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre></div><div class="custom-container tip"><p class="custom-container-title">Примечание!</p>
<p>Вы можете прекрасно обходиться и без создания корневого объекта <strong>Nervue</strong>, просто импортируя ваши
<code v-pre>useStore</code> функции туда, там где вам это необходимо.</p>
</div>
</div></template>


