import { defineAsyncComponent, defineComponent, ref, computed, onMounted, h, Transition, inject, mergeProps, useSSRContext, provide, watch, onUnmounted, resolveComponent, unref, toRefs, withCtx, renderSlot, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, withDirectives, Fragment, renderList, vShow, nextTick, onBeforeUnmount, readonly, reactive, createSSRApp } from "vue";
import { isFunction, isString, isArray, isPlainObject, resolveLocalePath, isLinkHttp, isLinkMailto, isLinkTel, removeLeadingSlash, removeEndingSlash, dedupeHead } from "@vuepress/shared";
import { debounce } from "ts-debounce";
import { useRouter, useRoute, RouterView, createRouter, START_LOCATION, createMemoryHistory } from "vue-router";
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderSlotInner, ssrRenderAttr, ssrRenderStyle } from "vue/server-renderer";
import { usePreferredDark, useStorage, useToggle } from "@vueuse/core";
const pagesData$1 = {
  "v-5dc4b15a": () => import(
    /* webpackChunkName: "v-5dc4b15a" */
    "./assets/getting-started.html.b42594f3.mjs"
  ).then(({ data }) => data),
  "v-8daa1a0e": () => import(
    /* webpackChunkName: "v-8daa1a0e" */
    "./assets/index.html.2cf3186e.mjs"
  ).then(({ data }) => data),
  "v-52062726": () => import(
    /* webpackChunkName: "v-52062726" */
    "./assets/introduction.html.736bb238.mjs"
  ).then(({ data }) => data),
  "v-744497ce": () => import(
    /* webpackChunkName: "v-744497ce" */
    "./assets/index.html.d096e086.mjs"
  ).then(({ data }) => data),
  "v-7fa0208b": () => import(
    /* webpackChunkName: "v-7fa0208b" */
    "./assets/actions.html.c17df83d.mjs"
  ).then(({ data }) => data),
  "v-b28f3d86": () => import(
    /* webpackChunkName: "v-b28f3d86" */
    "./assets/computed.html.01ad65ff.mjs"
  ).then(({ data }) => data),
  "v-3835c726": () => import(
    /* webpackChunkName: "v-3835c726" */
    "./assets/expose.html.2d6108a9.mjs"
  ).then(({ data }) => data),
  "v-0b2a3ebc": () => import(
    /* webpackChunkName: "v-0b2a3ebc" */
    "./assets/guards.html.a8015a58.mjs"
  ).then(({ data }) => data),
  "v-39d79de2": () => import(
    /* webpackChunkName: "v-39d79de2" */
    "./assets/index.html.9cc9067f.mjs"
  ).then(({ data }) => data),
  "v-e8e6c070": () => import(
    /* webpackChunkName: "v-e8e6c070" */
    "./assets/plugins.html.3e0bf445.mjs"
  ).then(({ data }) => data),
  "v-ed2dcd92": () => import(
    /* webpackChunkName: "v-ed2dcd92" */
    "./assets/state.html.0bc4bbde.mjs"
  ).then(({ data }) => data),
  "v-2d0a870d": () => import(
    /* webpackChunkName: "v-2d0a870d" */
    "./assets/index.html.7d09e6ce.mjs"
  ).then(({ data }) => data),
  "v-2bb284dc": () => import(
    /* webpackChunkName: "v-2bb284dc" */
    "./assets/introduction.html.38086c4e.mjs"
  ).then(({ data }) => data),
  "v-075401e2": () => import(
    /* webpackChunkName: "v-075401e2" */
    "./assets/index.html.70706005.mjs"
  ).then(({ data }) => data),
  "v-22c4039f": () => import(
    /* webpackChunkName: "v-22c4039f" */
    "./assets/actions.html.1abb70ad.mjs"
  ).then(({ data }) => data),
  "v-6810e0a9": () => import(
    /* webpackChunkName: "v-6810e0a9" */
    "./assets/computed.html.01b15384.mjs"
  ).then(({ data }) => data),
  "v-563f3192": () => import(
    /* webpackChunkName: "v-563f3192" */
    "./assets/expose.html.7bef1322.mjs"
  ).then(({ data }) => data),
  "v-2933a928": () => import(
    /* webpackChunkName: "v-2933a928" */
    "./assets/guards.html.37ca002e.mjs"
  ).then(({ data }) => data),
  "v-f975dbba": () => import(
    /* webpackChunkName: "v-f975dbba" */
    "./assets/index.html.6b5f070c.mjs"
  ).then(({ data }) => data),
  "v-2eb082dc": () => import(
    /* webpackChunkName: "v-2eb082dc" */
    "./assets/plugins.html.fae69e7e.mjs"
  ).then(({ data }) => data),
  "v-5092b14b": () => import(
    /* webpackChunkName: "v-5092b14b" */
    "./assets/state.html.3b9ffe50.mjs"
  ).then(({ data }) => data),
  "v-3706649a": () => import(
    /* webpackChunkName: "v-3706649a" */
    "./assets/404.html.bc0aef50.mjs"
  ).then(({ data }) => data)
};
const siteData$1 = JSON.parse('{"base":"/nervue/","lang":"en-US","title":"","description":"","head":[["link",{"rel":"preconnect","href":"https://fonts.googleapis.com"}],["link",{"rel":"preconnect","crossOrigin":true,"href":"https://fonts.gstatic.com"}],["link",{"rel":"stylesheet","href":"https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap"}],["meta",{"name":"description","content":"Nervue библиотека стэйт менеджмента для современных Vue приложений"}]],"locales":{"/":{"lang":"ru-RU","title":"Nervue","lastUpdated":false},"/en/":{"lang":"en-US","title":"Nervue","lastUpdated":false}}}');
const pagesComponents = {
  "v-5dc4b15a": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-5dc4b15a" */
    "./assets/getting-started.html.5cc06f60.mjs"
  )),
  "v-8daa1a0e": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-8daa1a0e" */
    "./assets/index.html.23bd020e.mjs"
  )),
  "v-52062726": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-52062726" */
    "./assets/introduction.html.a7024021.mjs"
  )),
  "v-744497ce": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-744497ce" */
    "./assets/index.html.b8d13faf.mjs"
  )),
  "v-7fa0208b": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-7fa0208b" */
    "./assets/actions.html.cf5f1df8.mjs"
  )),
  "v-b28f3d86": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-b28f3d86" */
    "./assets/computed.html.f1d2097f.mjs"
  )),
  "v-3835c726": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-3835c726" */
    "./assets/expose.html.28dc7094.mjs"
  )),
  "v-0b2a3ebc": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-0b2a3ebc" */
    "./assets/guards.html.28135327.mjs"
  )),
  "v-39d79de2": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-39d79de2" */
    "./assets/index.html.c25b4c41.mjs"
  )),
  "v-e8e6c070": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-e8e6c070" */
    "./assets/plugins.html.b575664c.mjs"
  )),
  "v-ed2dcd92": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-ed2dcd92" */
    "./assets/state.html.6d016608.mjs"
  )),
  "v-2d0a870d": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-2d0a870d" */
    "./assets/index.html.f44f976f.mjs"
  )),
  "v-2bb284dc": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-2bb284dc" */
    "./assets/introduction.html.b4754da5.mjs"
  )),
  "v-075401e2": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-075401e2" */
    "./assets/index.html.0297ff29.mjs"
  )),
  "v-22c4039f": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-22c4039f" */
    "./assets/actions.html.38c396fd.mjs"
  )),
  "v-6810e0a9": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-6810e0a9" */
    "./assets/computed.html.60ec9e0b.mjs"
  )),
  "v-563f3192": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-563f3192" */
    "./assets/expose.html.7ea17c7e.mjs"
  )),
  "v-2933a928": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-2933a928" */
    "./assets/guards.html.c871b2bb.mjs"
  )),
  "v-f975dbba": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-f975dbba" */
    "./assets/index.html.41ea5462.mjs"
  )),
  "v-2eb082dc": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-2eb082dc" */
    "./assets/plugins.html.1cd82fd3.mjs"
  )),
  "v-5092b14b": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-5092b14b" */
    "./assets/state.html.b66f326c.mjs"
  )),
  "v-3706649a": defineAsyncComponent(() => import(
    /* webpackChunkName: "v-3706649a" */
    "./assets/404.html.4fff24b6.mjs"
  ))
};
var defineClientConfig = (clientConfig = {}) => clientConfig;
const clientConfig0 = defineClientConfig({
  setup() {
    return;
  }
});
const getScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const vars$3 = "";
const backToTop = "";
const BackToTop = defineComponent({
  name: "BackToTop",
  setup() {
    const scrollTop = ref(0);
    const show = computed(() => scrollTop.value > 300);
    const onScroll = debounce(() => {
      scrollTop.value = getScrollTop();
    }, 100);
    onMounted(() => {
      scrollTop.value = getScrollTop();
      window.addEventListener("scroll", () => onScroll());
    });
    const backToTopEl = h("div", { class: "back-to-top", onClick: scrollToTop });
    return () => h(Transition, {
      name: "back-to-top"
    }, () => show.value ? backToTopEl : null);
  }
});
const clientConfig1 = defineClientConfig({
  rootComponents: [BackToTop]
});
const vars$2 = "";
const externalLinkIcon = "";
const svg = h("svg", {
  "class": "external-link-icon",
  "xmlns": "http://www.w3.org/2000/svg",
  "aria-hidden": "true",
  "focusable": "false",
  "x": "0px",
  "y": "0px",
  "viewBox": "0 0 100 100",
  "width": "15",
  "height": "15"
}, [
  h("path", {
    fill: "currentColor",
    d: "M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z"
  }),
  h("polygon", {
    fill: "currentColor",
    points: "45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9"
  })
]);
const ExternalLinkIcon = defineComponent({
  name: "ExternalLinkIcon",
  props: {
    locales: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  setup(props) {
    const routeLocale = useRouteLocale();
    const locale = computed(() => {
      var _a;
      return (_a = props.locales[routeLocale.value]) != null ? _a : {
        openInNewWindow: "open in new window"
      };
    });
    return () => h("span", [
      svg,
      h("span", {
        class: "external-link-icon-sr-only"
      }, locale.value.openInNewWindow)
    ]);
  }
});
const locales = { "/": { "openInNewWindow": "open in new window" }, "/en/": { "openInNewWindow": "open in new window" } };
const clientConfig2 = defineClientConfig({
  enhance({ app }) {
    app.component("ExternalLinkIcon", h(ExternalLinkIcon, { locales }));
  }
});
const vars$1 = "";
const mediumZoom = "";
const clientConfig3 = defineClientConfig({
  enhance({ app, router }) {
    return;
  }
});
/**
 * NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT
 */
const nprogress$1 = {
  settings: {
    minimum: 0.08,
    easing: "ease",
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    barSelector: '[role="bar"]',
    parent: "body",
    template: '<div class="bar" role="bar"></div>'
  },
  status: null,
  set: (n) => {
    const started = nprogress$1.isStarted();
    n = clamp(n, nprogress$1.settings.minimum, 1);
    nprogress$1.status = n === 1 ? null : n;
    const progress = nprogress$1.render(!started);
    const bar = progress.querySelector(nprogress$1.settings.barSelector);
    const speed = nprogress$1.settings.speed;
    const ease = nprogress$1.settings.easing;
    progress.offsetWidth;
    queue((next) => {
      css(bar, {
        transform: "translate3d(" + toBarPerc(n) + "%,0,0)",
        transition: "all " + speed + "ms " + ease
      });
      if (n === 1) {
        css(progress, {
          transition: "none",
          opacity: "1"
        });
        progress.offsetWidth;
        setTimeout(function() {
          css(progress, {
            transition: "all " + speed + "ms linear",
            opacity: "0"
          });
          setTimeout(function() {
            nprogress$1.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(() => next(), speed);
      }
    });
    return nprogress$1;
  },
  isStarted: () => typeof nprogress$1.status === "number",
  start: () => {
    if (!nprogress$1.status)
      nprogress$1.set(0);
    const work = () => {
      setTimeout(() => {
        if (!nprogress$1.status)
          return;
        nprogress$1.trickle();
        work();
      }, nprogress$1.settings.trickleSpeed);
    };
    if (nprogress$1.settings.trickle)
      work();
    return nprogress$1;
  },
  done: (force) => {
    if (!force && !nprogress$1.status)
      return nprogress$1;
    return nprogress$1.inc(0.3 + 0.5 * Math.random()).set(1);
  },
  inc: (amount) => {
    let n = nprogress$1.status;
    if (!n) {
      return nprogress$1.start();
    }
    if (typeof amount !== "number") {
      amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
    }
    n = clamp(n + amount, 0, 0.994);
    return nprogress$1.set(n);
  },
  trickle: () => nprogress$1.inc(Math.random() * nprogress$1.settings.trickleRate),
  render: (fromStart) => {
    if (nprogress$1.isRendered()) {
      return document.getElementById("nprogress");
    }
    addClass(document.documentElement, "nprogress-busy");
    const progress = document.createElement("div");
    progress.id = "nprogress";
    progress.innerHTML = nprogress$1.settings.template;
    const bar = progress.querySelector(nprogress$1.settings.barSelector);
    const perc = fromStart ? "-100" : toBarPerc(nprogress$1.status || 0);
    const parent = document.querySelector(nprogress$1.settings.parent);
    css(bar, {
      transition: "all 0 linear",
      transform: "translate3d(" + perc + "%,0,0)"
    });
    if (parent !== document.body) {
      addClass(parent, "nprogress-custom-parent");
    }
    parent == null ? void 0 : parent.appendChild(progress);
    return progress;
  },
  remove: () => {
    removeClass(document.documentElement, "nprogress-busy");
    removeClass(document.querySelector(nprogress$1.settings.parent), "nprogress-custom-parent");
    const progress = document.getElementById("nprogress");
    progress && removeElement(progress);
  },
  isRendered: () => !!document.getElementById("nprogress")
};
const clamp = (n, min, max) => {
  if (n < min)
    return min;
  if (n > max)
    return max;
  return n;
};
const toBarPerc = (n) => (-1 + n) * 100;
const queue = function() {
  const pending = [];
  function next() {
    const fn = pending.shift();
    if (fn) {
      fn(next);
    }
  }
  return function(fn) {
    pending.push(fn);
    if (pending.length === 1)
      next();
  };
}();
const css = function() {
  const cssPrefixes = ["Webkit", "O", "Moz", "ms"];
  const cssProps = {};
  function camelCase(string) {
    return string.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(match, letter) {
      return letter.toUpperCase();
    });
  }
  function getVendorProp(name) {
    const style = document.body.style;
    if (name in style)
      return name;
    let i = cssPrefixes.length;
    const capName = name.charAt(0).toUpperCase() + name.slice(1);
    let vendorName;
    while (i--) {
      vendorName = cssPrefixes[i] + capName;
      if (vendorName in style)
        return vendorName;
    }
    return name;
  }
  function getStyleProp(name) {
    name = camelCase(name);
    return cssProps[name] || (cssProps[name] = getVendorProp(name));
  }
  function applyCss(element, prop, value) {
    prop = getStyleProp(prop);
    element.style[prop] = value;
  }
  return function(element, properties) {
    for (const prop in properties) {
      const value = properties[prop];
      if (value !== void 0 && Object.prototype.hasOwnProperty.call(properties, prop))
        applyCss(element, prop, value);
    }
  };
}();
const hasClass = (element, name) => {
  const list = typeof element === "string" ? element : classList(element);
  return list.indexOf(" " + name + " ") >= 0;
};
const addClass = (element, name) => {
  const oldList = classList(element);
  const newList = oldList + name;
  if (hasClass(oldList, name))
    return;
  element.className = newList.substring(1);
};
const removeClass = (element, name) => {
  const oldList = classList(element);
  if (!hasClass(element, name))
    return;
  const newList = oldList.replace(" " + name + " ", " ");
  element.className = newList.substring(1, newList.length - 1);
};
const classList = (element) => {
  return (" " + (element.className || "") + " ").replace(/\s+/gi, " ");
};
const removeElement = (element) => {
  element && element.parentNode && element.parentNode.removeChild(element);
};
const vars = "";
const nprogress = "";
const useNprogress = () => {
  onMounted(() => {
    const router = useRouter();
    const loadedPages = /* @__PURE__ */ new Set();
    loadedPages.add(router.currentRoute.value.path);
    router.beforeEach((to) => {
      if (!loadedPages.has(to.path)) {
        nprogress$1.start();
      }
    });
    router.afterEach((to) => {
      loadedPages.add(to.path);
      nprogress$1.done();
    });
  });
};
const clientConfig4 = defineClientConfig({
  setup() {
    useNprogress();
  }
});
const themeData$1 = JSON.parse(`{"colorMode":"light","home":"/","repo":"https://github.com/wiseadme/nervue","editLink":false,"contributors":false,"locales":{"/":{"selectLanguageName":"Русский","navbar":[{"text":"Руководство","link":"/introduction.html"},{"text":"API","link":"/api/"}],"sidebar":{"/api/":[{"text":"","children":["/api/index.md"]}],"/":[{"text":"Введение","children":["/introduction.md"]},{"text":"Начинаем","children":["/getting-started.md"]},{"text":"Основные концепции","children":["/core-concepts/state.md","/core-concepts/computed.md","/core-concepts/guards.md","/core-concepts/actions.md","/core-concepts/expose.md","/core-concepts/plugins.md"]}]},"home":"/","selectLanguageText":"Язык","lastUpdatedText":"Последнее обновление","contributorsText":"Контрибутор"},"/en/":{"selectLanguageName":"English","label":"English","navbar":[{"text":"Guide","link":"/en/introduction.html"},{"text":"API","link":"/en/api/"}],"sidebar":{"/en/api/":[{"text":"","children":["/en/api/index.md"]}],"/en/":[{"text":"Introduction","collapsible":false,"collapsed":false,"children":[{"text":"Nervue","link":"/en/introduction.html"}]},{"text":"Main concepts","children":[{"text":"State","link":"/en/core-concepts/state.html"},{"text":"Computed","link":"/en/core-concepts/computed.html"},{"text":"Guards","link":"/en/core-concepts/guards.html"},{"text":"Actions","link":"/en/core-concepts/actions.html"},{"text":"Expose","link":"/en/core-concepts/expose.html"},{"text":"Plugins","link":"/en/core-concepts/plugins.html"}]}]},"home":"/en/","selectLanguageText":"Languages","lastUpdatedText":"Last Updated","contributorsText":"Contributor"}},"colorModeSwitch":true,"navbar":[],"logo":null,"selectLanguageText":"Languages","selectLanguageAriaLabel":"Select language","sidebar":"auto","sidebarDepth":2,"editLinkText":"Edit this page","lastUpdated":true,"lastUpdatedText":"Last Updated","contributorsText":"Contributors","notFound":["There's nothing here.","How did we get here?","That's a Four-Oh-Four.","Looks like we've got some broken links."],"backToHome":"Take me home","openInNewWindow":"open in new window","toggleColorMode":"toggle color mode","toggleSidebar":"toggle sidebar"}`);
const themeData = ref(themeData$1);
const useThemeData = () => themeData;
const themeLocaleDataSymbol = Symbol("");
const useThemeLocaleData$1 = () => {
  const themeLocaleData = inject(themeLocaleDataSymbol);
  if (!themeLocaleData) {
    throw new Error("useThemeLocaleData() is called without provider.");
  }
  return themeLocaleData;
};
const resolveThemeLocaleData = (theme, routeLocale) => {
  var _a;
  return {
    ...theme,
    ...(_a = theme.locales) == null ? void 0 : _a[routeLocale]
  };
};
const clientConfig5 = defineClientConfig({
  enhance({ app }) {
    const themeData2 = useThemeData();
    const routeLocale = app._context.provides[routeLocaleSymbol];
    const themeLocaleData = computed(() => resolveThemeLocaleData(themeData2.value, routeLocale.value));
    app.provide(themeLocaleDataSymbol, themeLocaleData);
    Object.defineProperties(app.config.globalProperties, {
      $theme: {
        get() {
          return themeData2.value;
        }
      },
      $themeLocale: {
        get() {
          return themeLocaleData.value;
        }
      }
    });
  }
});
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "Badge",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      required: false,
      default: "tip"
    },
    text: {
      type: String,
      required: false,
      default: ""
    },
    vertical: {
      type: String,
      required: false,
      default: void 0
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["badge", __props.type],
        style: {
          verticalAlign: __props.vertical
        }
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`${ssrInterpolate(__props.text)}`);
      }, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/global/Badge.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const Badge = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "Badge.vue"]]);
const CodeGroup = defineComponent({
  name: "CodeGroup",
  setup(_, { slots }) {
    const activeIndex = ref(-1);
    const tabRefs = ref([]);
    const activateNext = (i = activeIndex.value) => {
      if (i < tabRefs.value.length - 1) {
        activeIndex.value = i + 1;
      } else {
        activeIndex.value = 0;
      }
      tabRefs.value[activeIndex.value].focus();
    };
    const activatePrev = (i = activeIndex.value) => {
      if (i > 0) {
        activeIndex.value = i - 1;
      } else {
        activeIndex.value = tabRefs.value.length - 1;
      }
      tabRefs.value[activeIndex.value].focus();
    };
    const keyboardHandler = (event, i) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        activeIndex.value = i;
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        activateNext(i);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        activatePrev(i);
      }
    };
    return () => {
      var _a;
      const items = (((_a = slots.default) == null ? void 0 : _a.call(slots)) || []).filter((vnode) => vnode.type.name === "CodeGroupItem").map((vnode) => {
        if (vnode.props === null) {
          vnode.props = {};
        }
        return vnode;
      });
      if (items.length === 0) {
        return null;
      }
      if (activeIndex.value < 0 || activeIndex.value > items.length - 1) {
        activeIndex.value = items.findIndex((vnode) => vnode.props.active === "" || vnode.props.active === true);
        if (activeIndex.value === -1) {
          activeIndex.value = 0;
        }
      } else {
        items.forEach((vnode, i) => {
          vnode.props.active = i === activeIndex.value;
        });
      }
      return h("div", { class: "code-group" }, [
        h("div", { class: "code-group__nav" }, h("ul", { class: "code-group__ul" }, items.map((vnode, i) => {
          const isActive = i === activeIndex.value;
          return h("li", { class: "code-group__li" }, h("button", {
            ref: (element) => {
              if (element) {
                tabRefs.value[i] = element;
              }
            },
            class: {
              "code-group__nav-tab": true,
              "code-group__nav-tab-active": isActive
            },
            ariaPressed: isActive,
            ariaExpanded: isActive,
            onClick: () => activeIndex.value = i,
            onKeydown: (e) => keyboardHandler(e, i)
          }, vnode.props.title));
        }))),
        items
      ]);
    };
  }
});
const __default__$1 = defineComponent({
  name: "CodeGroupItem"
});
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  __ssrInlineRender: true,
  props: {
    title: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["code-group-item", { "code-group-item__active": __props.active }],
        "aria-selected": __props.active
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/global/CodeGroupItem.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const CodeGroupItem = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "CodeGroupItem.vue"]]);
const useThemeLocaleData = () => useThemeLocaleData$1();
const darkModeSymbol = Symbol("");
const useDarkMode = () => {
  const isDarkMode = inject(darkModeSymbol);
  if (!isDarkMode) {
    throw new Error("useDarkMode() is called without provider.");
  }
  return isDarkMode;
};
const setupDarkMode = () => {
  const themeLocale = useThemeLocaleData();
  const isDarkPreferred = usePreferredDark();
  const darkStorage = useStorage("vuepress-color-scheme", themeLocale.value.colorMode);
  const isDarkMode = computed({
    get() {
      if (!themeLocale.value.colorModeSwitch) {
        return themeLocale.value.colorMode === "dark";
      }
      if (darkStorage.value === "auto") {
        return isDarkPreferred.value;
      }
      return darkStorage.value === "dark";
    },
    set(val) {
      if (val === isDarkPreferred.value) {
        darkStorage.value = "auto";
      } else {
        darkStorage.value = val ? "dark" : "light";
      }
    }
  });
  provide(darkModeSymbol, isDarkMode);
  updateHtmlDarkClass(isDarkMode);
};
const updateHtmlDarkClass = (isDarkMode) => {
  const update = (value = isDarkMode.value) => {
    const htmlEl = window == null ? void 0 : window.document.querySelector("html");
    htmlEl == null ? void 0 : htmlEl.classList.toggle("dark", value);
  };
  onMounted(() => {
    watch(isDarkMode, update, { immediate: true });
  });
  onUnmounted(() => update());
};
const useResolveRouteWithRedirect = (...args) => {
  const router = useRouter();
  const route = router.resolve(...args);
  const lastMatched = route.matched[route.matched.length - 1];
  if (!(lastMatched == null ? void 0 : lastMatched.redirect)) {
    return route;
  }
  const { redirect } = lastMatched;
  const resolvedRedirect = isFunction(redirect) ? redirect(route) : redirect;
  const resolvedRedirectObj = isString(resolvedRedirect) ? { path: resolvedRedirect } : resolvedRedirect;
  return useResolveRouteWithRedirect({
    hash: route.hash,
    query: route.query,
    params: route.params,
    ...resolvedRedirectObj
  });
};
const useNavLink = (item) => {
  const resolved = useResolveRouteWithRedirect(encodeURI(item));
  return {
    text: resolved.meta.title || item,
    link: resolved.name === "404" ? item : resolved.fullPath
  };
};
let promise = null;
let promiseResolve = null;
const scrollPromise = {
  wait: () => promise,
  pending: () => {
    promise = new Promise((resolve) => promiseResolve = resolve);
  },
  resolve: () => {
    promiseResolve == null ? void 0 : promiseResolve();
    promise = null;
    promiseResolve = null;
  }
};
const useScrollPromise = () => scrollPromise;
const sidebarItemsSymbol = Symbol("sidebarItems");
const useSidebarItems = () => {
  const sidebarItems = inject(sidebarItemsSymbol);
  if (!sidebarItems) {
    throw new Error("useSidebarItems() is called without provider.");
  }
  return sidebarItems;
};
const setupSidebarItems = () => {
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter();
  const sidebarItems = computed(() => resolveSidebarItems(frontmatter.value, themeLocale.value));
  provide(sidebarItemsSymbol, sidebarItems);
};
const resolveSidebarItems = (frontmatter, themeLocale) => {
  var _a, _b, _c, _d;
  const sidebarConfig = (_b = (_a = frontmatter.sidebar) != null ? _a : themeLocale.sidebar) != null ? _b : "auto";
  const sidebarDepth = (_d = (_c = frontmatter.sidebarDepth) != null ? _c : themeLocale.sidebarDepth) != null ? _d : 2;
  if (frontmatter.home || sidebarConfig === false) {
    return [];
  }
  if (sidebarConfig === "auto") {
    return resolveAutoSidebarItems(sidebarDepth);
  }
  if (isArray(sidebarConfig)) {
    return resolveArraySidebarItems(sidebarConfig, sidebarDepth);
  }
  if (isPlainObject(sidebarConfig)) {
    return resolveMultiSidebarItems(sidebarConfig, sidebarDepth);
  }
  return [];
};
const headerToSidebarItem = (header, sidebarDepth) => ({
  text: header.title,
  link: header.link,
  children: headersToSidebarItemChildren(header.children, sidebarDepth)
});
const headersToSidebarItemChildren = (headers, sidebarDepth) => sidebarDepth > 0 ? headers.map((header) => headerToSidebarItem(header, sidebarDepth - 1)) : [];
const resolveAutoSidebarItems = (sidebarDepth) => {
  const page = usePageData();
  return [
    {
      text: page.value.title,
      children: headersToSidebarItemChildren(page.value.headers, sidebarDepth)
    }
  ];
};
const resolveArraySidebarItems = (sidebarConfig, sidebarDepth) => {
  const route = useRoute();
  const page = usePageData();
  const handleChildItem = (item) => {
    var _a;
    let childItem;
    if (isString(item)) {
      childItem = useNavLink(item);
    } else {
      childItem = item;
    }
    if (childItem.children) {
      return {
        ...childItem,
        children: childItem.children.map((item2) => handleChildItem(item2))
      };
    }
    if (childItem.link === route.path) {
      const headers = ((_a = page.value.headers[0]) == null ? void 0 : _a.level) === 1 ? page.value.headers[0].children : page.value.headers;
      return {
        ...childItem,
        children: headersToSidebarItemChildren(headers, sidebarDepth)
      };
    }
    return childItem;
  };
  return sidebarConfig.map((item) => handleChildItem(item));
};
const resolveMultiSidebarItems = (sidebarConfig, sidebarDepth) => {
  var _a;
  const route = useRoute();
  const sidebarPath = resolveLocalePath(sidebarConfig, route.path);
  const matchedSidebarConfig = (_a = sidebarConfig[sidebarPath]) != null ? _a : [];
  return resolveArraySidebarItems(matchedSidebarConfig, sidebarDepth);
};
const _sfc_main$l = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_Content = resolveComponent("Content");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "theme-default-content" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Content, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/HomeContent.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const HomeContent = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["ssrRender", _sfc_ssrRender$1], ["__file", "HomeContent.vue"]]);
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "HomeFeatures",
  __ssrInlineRender: true,
  setup(__props) {
    const frontmatter = usePageFrontmatter();
    const features = computed(() => {
      if (isArray(frontmatter.value.features)) {
        return frontmatter.value.features;
      }
      return [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(features).length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "features" }, _attrs))}><!--[-->`);
        ssrRenderList(unref(features), (feature) => {
          _push(`<div class="feature"><h2>${ssrInterpolate(feature.title)}</h2><p>${ssrInterpolate(feature.details)}</p></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/HomeFeatures.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const HomeFeatures = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "HomeFeatures.vue"]]);
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "HomeFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const frontmatter = usePageFrontmatter();
    const footer = computed(() => frontmatter.value.footer);
    const footerHtml = computed(() => frontmatter.value.footerHtml);
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(footer)) {
        _push(`<!--[-->`);
        if (unref(footerHtml)) {
          _push(`<div class="footer">${unref(footer)}</div>`);
        } else {
          _push(`<div class="footer">${ssrInterpolate(unref(footer))}</div>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/HomeFooter.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const HomeFooter = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "HomeFooter.vue"]]);
const __default__ = defineComponent({
  inheritAttrs: false
});
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  ...__default__,
  __name: "AutoLink",
  __ssrInlineRender: true,
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const site = useSiteData();
    const { item } = toRefs(props);
    const hasHttpProtocol = computed(() => isLinkHttp(item.value.link));
    const hasNonHttpProtocol = computed(
      () => isLinkMailto(item.value.link) || isLinkTel(item.value.link)
    );
    const linkTarget = computed(() => {
      if (hasNonHttpProtocol.value)
        return void 0;
      if (item.value.target)
        return item.value.target;
      if (hasHttpProtocol.value)
        return "_blank";
      return void 0;
    });
    const isBlankTarget = computed(() => linkTarget.value === "_blank");
    const isRouterLink = computed(
      () => !hasHttpProtocol.value && !hasNonHttpProtocol.value && !isBlankTarget.value
    );
    const linkRel = computed(() => {
      if (hasNonHttpProtocol.value)
        return void 0;
      if (item.value.rel)
        return item.value.rel;
      if (isBlankTarget.value)
        return "noopener noreferrer";
      return void 0;
    });
    const linkAriaLabel = computed(() => item.value.ariaLabel || item.value.text);
    const shouldBeActiveInSubpath = computed(() => {
      const localeKeys = Object.keys(site.value.locales);
      if (localeKeys.length) {
        return !localeKeys.some((key) => key === item.value.link);
      }
      return item.value.link !== "/";
    });
    const isActiveInSubpath = computed(() => {
      if (!shouldBeActiveInSubpath.value) {
        return false;
      }
      return route.path.startsWith(item.value.link);
    });
    const isActive = computed(() => {
      if (!isRouterLink.value) {
        return false;
      }
      if (item.value.activeMatch) {
        return new RegExp(item.value.activeMatch).test(route.path);
      }
      return isActiveInSubpath.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      const _component_AutoLinkExternalIcon = resolveComponent("AutoLinkExternalIcon");
      if (unref(isRouterLink)) {
        _push(ssrRenderComponent(_component_RouterLink, mergeProps({
          class: { "router-link-active": unref(isActive) },
          to: unref(item).link,
          "aria-label": unref(linkAriaLabel)
        }, _ctx.$attrs, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "before", {}, null, _push2, _parent2, _scopeId);
              _push2(` ${ssrInterpolate(unref(item).text)} `);
              ssrRenderSlot(_ctx.$slots, "after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "before"),
                createTextVNode(" " + toDisplayString(unref(item).text) + " ", 1),
                renderSlot(_ctx.$slots, "after")
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<a${ssrRenderAttrs(mergeProps({
          class: "external-link",
          href: unref(item).link,
          rel: unref(linkRel),
          target: unref(linkTarget),
          "aria-label": unref(linkAriaLabel)
        }, _ctx.$attrs, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "before", {}, null, _push, _parent);
        _push(` ${ssrInterpolate(unref(item).text)} `);
        if (unref(isBlankTarget)) {
          _push(ssrRenderComponent(_component_AutoLinkExternalIcon, null, null, _parent));
        } else {
          _push(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "after", {}, null, _push, _parent);
        _push(`</a>`);
      }
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/AutoLink.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const AutoLink = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "AutoLink.vue"]]);
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "HomeHero",
  __ssrInlineRender: true,
  setup(__props) {
    const frontmatter = usePageFrontmatter();
    const siteLocale = useSiteLocaleData();
    const isDarkMode = useDarkMode();
    const heroImage = computed(() => {
      if (isDarkMode.value && frontmatter.value.heroImageDark !== void 0) {
        return frontmatter.value.heroImageDark;
      }
      return frontmatter.value.heroImage;
    });
    const heroAlt = computed(
      () => frontmatter.value.heroAlt || heroText.value || "hero"
    );
    const heroHeight = computed(() => frontmatter.value.heroHeight || 280);
    const heroText = computed(() => {
      if (frontmatter.value.heroText === null) {
        return null;
      }
      return frontmatter.value.heroText || siteLocale.value.title || "Hello";
    });
    const tagline = computed(() => {
      if (frontmatter.value.tagline === null) {
        return null;
      }
      return frontmatter.value.tagline || siteLocale.value.description || "Welcome to your VuePress site";
    });
    const actions = computed(() => {
      if (!isArray(frontmatter.value.actions)) {
        return [];
      }
      return frontmatter.value.actions.map(({ text, link, type = "primary" }) => ({
        text,
        link,
        type
      }));
    });
    const HomeHeroImage = () => {
      if (!heroImage.value)
        return null;
      const img = h("img", {
        src: withBase(heroImage.value),
        alt: heroAlt.value,
        height: heroHeight.value
      });
      if (frontmatter.value.heroImageDark === void 0) {
        return img;
      }
      return h(ClientOnly, () => img);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "hero" }, _attrs))}>`);
      _push(ssrRenderComponent(HomeHeroImage, null, null, _parent));
      if (unref(heroText)) {
        _push(`<h1 id="main-title">${ssrInterpolate(unref(heroText))}</h1>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(tagline)) {
        _push(`<p class="description">${ssrInterpolate(unref(tagline))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(actions).length) {
        _push(`<p class="actions"><!--[-->`);
        ssrRenderList(unref(actions), (action) => {
          _push(ssrRenderComponent(AutoLink, {
            key: action.text,
            class: ["action-button", [action.type]],
            item: action
          }, null, _parent));
        });
        _push(`<!--]--></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/HomeHero.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const HomeHero = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "HomeHero.vue"]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "home" }, _attrs))}>`);
      _push(ssrRenderComponent(HomeHero, null, null, _parent));
      _push(ssrRenderComponent(HomeFeatures, null, null, _parent));
      _push(ssrRenderComponent(HomeContent, null, null, _parent));
      _push(ssrRenderComponent(HomeFooter, null, null, _parent));
      _push(`</main>`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/Home.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const Home = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "Home.vue"]]);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "NavbarBrand",
  __ssrInlineRender: true,
  setup(__props) {
    const routeLocale = useRouteLocale();
    const siteLocale = useSiteLocaleData();
    const themeLocale = useThemeLocaleData();
    const isDarkMode = useDarkMode();
    const navbarBrandLink = computed(
      () => themeLocale.value.home || routeLocale.value
    );
    const navbarBrandTitle = computed(() => siteLocale.value.title);
    const navbarBrandLogo = computed(() => {
      if (isDarkMode.value && themeLocale.value.logoDark !== void 0) {
        return themeLocale.value.logoDark;
      }
      return themeLocale.value.logo;
    });
    const NavbarBrandLogo = () => {
      if (!navbarBrandLogo.value)
        return null;
      const img = h("img", {
        class: "logo",
        src: withBase(navbarBrandLogo.value),
        alt: navbarBrandTitle.value
      });
      if (themeLocale.value.logoDark === void 0) {
        return img;
      }
      return h(ClientOnly, () => img);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(ssrRenderComponent(_component_RouterLink, mergeProps({ to: unref(navbarBrandLink) }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(NavbarBrandLogo, null, null, _parent2, _scopeId));
            if (unref(navbarBrandTitle)) {
              _push2(`<span class="${ssrRenderClass([{ "can-hide": unref(navbarBrandLogo) }, "site-name"])}"${_scopeId}>${ssrInterpolate(unref(navbarBrandTitle))}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(NavbarBrandLogo),
              unref(navbarBrandTitle) ? (openBlock(), createBlock("span", {
                key: 0,
                class: ["site-name", { "can-hide": unref(navbarBrandLogo) }]
              }, toDisplayString(unref(navbarBrandTitle)), 3)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/NavbarBrand.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const NavbarBrand = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "NavbarBrand.vue"]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "DropdownTransition",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSlotInner(_ctx.$slots, "default", {}, null, _push, _parent, null, true);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/DropdownTransition.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const DropdownTransition = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "DropdownTransition.vue"]]);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "NavbarDropdown",
  __ssrInlineRender: true,
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const { item } = toRefs(props);
    const dropdownAriaLabel = computed(
      () => item.value.ariaLabel || item.value.text
    );
    const open = ref(false);
    const route = useRoute();
    watch(
      () => route.path,
      () => {
        open.value = false;
      }
    );
    const isLastItemOfArray = (item2, arr) => arr[arr.length - 1] === item2;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["navbar-dropdown-wrapper", { open: open.value }]
      }, _attrs))}><button class="navbar-dropdown-title" type="button"${ssrRenderAttr("aria-label", unref(dropdownAriaLabel))}><span class="title">${ssrInterpolate(unref(item).text)}</span><span class="arrow down"></span></button><button class="navbar-dropdown-title-mobile" type="button"${ssrRenderAttr("aria-label", unref(dropdownAriaLabel))}><span class="title">${ssrInterpolate(unref(item).text)}</span><span class="${ssrRenderClass([open.value ? "down" : "right", "arrow"])}"></span></button>`);
      _push(ssrRenderComponent(DropdownTransition, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul style="${ssrRenderStyle(open.value ? null : { display: "none" })}" class="navbar-dropdown"${_scopeId}><!--[-->`);
            ssrRenderList(unref(item).children, (child) => {
              _push2(`<li class="navbar-dropdown-item"${_scopeId}>`);
              if (child.children) {
                _push2(`<!--[--><h4 class="navbar-dropdown-subtitle"${_scopeId}>`);
                if (child.link) {
                  _push2(ssrRenderComponent(AutoLink, {
                    item: child,
                    onFocusout: ($event) => isLastItemOfArray(child, unref(item).children) && child.children.length === 0 && (open.value = false)
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<span${_scopeId}>${ssrInterpolate(child.text)}</span>`);
                }
                _push2(`</h4><ul class="navbar-dropdown-subitem-wrapper"${_scopeId}><!--[-->`);
                ssrRenderList(child.children, (grandchild) => {
                  _push2(`<li class="navbar-dropdown-subitem"${_scopeId}>`);
                  _push2(ssrRenderComponent(AutoLink, {
                    item: grandchild,
                    onFocusout: ($event) => isLastItemOfArray(grandchild, child.children) && isLastItemOfArray(child, unref(item).children) && (open.value = false)
                  }, null, _parent2, _scopeId));
                  _push2(`</li>`);
                });
                _push2(`<!--]--></ul><!--]-->`);
              } else {
                _push2(ssrRenderComponent(AutoLink, {
                  item: child,
                  onFocusout: ($event) => isLastItemOfArray(child, unref(item).children) && (open.value = false)
                }, null, _parent2, _scopeId));
              }
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              withDirectives(createVNode("ul", { class: "navbar-dropdown" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(item).children, (child) => {
                  return openBlock(), createBlock("li", {
                    key: child.text,
                    class: "navbar-dropdown-item"
                  }, [
                    child.children ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createVNode("h4", { class: "navbar-dropdown-subtitle" }, [
                        child.link ? (openBlock(), createBlock(AutoLink, {
                          key: 0,
                          item: child,
                          onFocusout: ($event) => isLastItemOfArray(child, unref(item).children) && child.children.length === 0 && (open.value = false)
                        }, null, 8, ["item", "onFocusout"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(child.text), 1))
                      ]),
                      createVNode("ul", { class: "navbar-dropdown-subitem-wrapper" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(child.children, (grandchild) => {
                          return openBlock(), createBlock("li", {
                            key: grandchild.link,
                            class: "navbar-dropdown-subitem"
                          }, [
                            createVNode(AutoLink, {
                              item: grandchild,
                              onFocusout: ($event) => isLastItemOfArray(grandchild, child.children) && isLastItemOfArray(child, unref(item).children) && (open.value = false)
                            }, null, 8, ["item", "onFocusout"])
                          ]);
                        }), 128))
                      ])
                    ], 64)) : (openBlock(), createBlock(AutoLink, {
                      key: 1,
                      item: child,
                      onFocusout: ($event) => isLastItemOfArray(child, unref(item).children) && (open.value = false)
                    }, null, 8, ["item", "onFocusout"]))
                  ]);
                }), 128))
              ], 512), [
                [vShow, open.value]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/NavbarDropdown.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const NavbarDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "NavbarDropdown.vue"]]);
const normalizePath = (path) => decodeURI(path).replace(/#.*$/, "").replace(/(index)?\.(md|html)$/, "");
const isActiveLink = (link, route) => {
  if (route.hash === link) {
    return true;
  }
  const currentPath = normalizePath(route.path);
  const targetPath = normalizePath(link);
  return currentPath === targetPath;
};
const isActiveSidebarItem = (item, route) => {
  if (item.link && isActiveLink(item.link, route)) {
    return true;
  }
  if (item.children) {
    return item.children.some((child) => isActiveSidebarItem(child, route));
  }
  return false;
};
const resolveRepoType = (repo) => {
  if (!isLinkHttp(repo) || /github\.com/.test(repo))
    return "GitHub";
  if (/bitbucket\.org/.test(repo))
    return "Bitbucket";
  if (/gitlab\.com/.test(repo))
    return "GitLab";
  if (/gitee\.com/.test(repo))
    return "Gitee";
  return null;
};
const editLinkPatterns = {
  GitHub: ":repo/edit/:branch/:path",
  GitLab: ":repo/-/edit/:branch/:path",
  Gitee: ":repo/edit/:branch/:path",
  Bitbucket: ":repo/src/:branch/:path?mode=edit&spa=0&at=:branch&fileviewer=file-view-default"
};
const resolveEditLinkPatterns = ({ docsRepo, editLinkPattern }) => {
  if (editLinkPattern) {
    return editLinkPattern;
  }
  const repoType = resolveRepoType(docsRepo);
  if (repoType !== null) {
    return editLinkPatterns[repoType];
  }
  return null;
};
const resolveEditLink = ({ docsRepo, docsBranch, docsDir, filePathRelative, editLinkPattern }) => {
  if (!filePathRelative)
    return null;
  const pattern = resolveEditLinkPatterns({ docsRepo, editLinkPattern });
  if (!pattern)
    return null;
  return pattern.replace(/:repo/, isLinkHttp(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`).replace(/:branch/, docsBranch).replace(/:path/, removeLeadingSlash(`${removeEndingSlash(docsDir)}/${filePathRelative}`));
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "NavbarItems",
  __ssrInlineRender: true,
  setup(__props) {
    const useNavbarSelectLanguage = () => {
      const router = useRouter();
      const routeLocale = useRouteLocale();
      const siteLocale = useSiteLocaleData();
      const themeLocale = useThemeLocaleData();
      return computed(() => {
        var _a, _b, _c;
        const localePaths = Object.keys(siteLocale.value.locales);
        if (localePaths.length < 2) {
          return [];
        }
        const currentPath = router.currentRoute.value.path;
        const currentFullPath = router.currentRoute.value.fullPath;
        const currentHash = router.currentRoute.value.hash;
        const languageDropdown = {
          text: (_a = themeLocale.value.selectLanguageText) != null ? _a : "unknown language",
          ariaLabel: (_c = (_b = themeLocale.value.selectLanguageAriaLabel) != null ? _b : themeLocale.value.selectLanguageText) != null ? _c : "unknown language",
          children: localePaths.map((targetLocalePath) => {
            var _a2, _b2, _c2, _d, _e, _f;
            const targetSiteLocale = (_b2 = (_a2 = siteLocale.value.locales) == null ? void 0 : _a2[targetLocalePath]) != null ? _b2 : {};
            const targetThemeLocale = (_d = (_c2 = themeLocale.value.locales) == null ? void 0 : _c2[targetLocalePath]) != null ? _d : {};
            const targetLang = `${targetSiteLocale.lang}`;
            const text = (_e = targetThemeLocale.selectLanguageName) != null ? _e : targetLang;
            let link;
            if (targetLang === siteLocale.value.lang) {
              link = currentFullPath;
            } else {
              const targetLocalePage = currentPath.replace(
                routeLocale.value,
                targetLocalePath
              );
              if (router.getRoutes().some((item) => item.path === targetLocalePage)) {
                link = `${targetLocalePage}${currentHash}`;
              } else {
                link = (_f = targetThemeLocale.home) != null ? _f : targetLocalePath;
              }
            }
            return {
              text,
              link
            };
          })
        };
        return [languageDropdown];
      });
    };
    const useNavbarRepo = () => {
      const themeLocale = useThemeLocaleData();
      const repo = computed(() => themeLocale.value.repo);
      const repoType = computed(
        () => repo.value ? resolveRepoType(repo.value) : null
      );
      const repoLink = computed(() => {
        if (repo.value && !isLinkHttp(repo.value)) {
          return `https://github.com/${repo.value}`;
        }
        return repo.value;
      });
      const repoLabel = computed(() => {
        if (!repoLink.value)
          return null;
        if (themeLocale.value.repoLabel)
          return themeLocale.value.repoLabel;
        if (repoType.value === null)
          return "Source";
        return repoType.value;
      });
      return computed(() => {
        if (!repoLink.value || !repoLabel.value) {
          return [];
        }
        return [
          {
            text: repoLabel.value,
            link: repoLink.value
          }
        ];
      });
    };
    const resolveNavbarItem = (item) => {
      if (isString(item)) {
        return useNavLink(item);
      }
      if (item.children) {
        return {
          ...item,
          children: item.children.map(resolveNavbarItem)
        };
      }
      return item;
    };
    const useNavbarConfig = () => {
      const themeLocale = useThemeLocaleData();
      return computed(() => (themeLocale.value.navbar || []).map(resolveNavbarItem));
    };
    const isMobile = ref(false);
    const navbarConfig = useNavbarConfig();
    const navbarSelectLanguage = useNavbarSelectLanguage();
    const navbarRepo = useNavbarRepo();
    const navbarLinks = computed(() => [
      ...navbarConfig.value,
      ...navbarSelectLanguage.value,
      ...navbarRepo.value
    ]);
    onMounted(() => {
      const MOBILE_DESKTOP_BREAKPOINT = 719;
      const handleMobile = () => {
        if (window.innerWidth < MOBILE_DESKTOP_BREAKPOINT) {
          isMobile.value = true;
        } else {
          isMobile.value = false;
        }
      };
      handleMobile();
      window.addEventListener("resize", handleMobile, false);
      window.addEventListener("orientationchange", handleMobile, false);
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(navbarLinks).length) {
        _push(`<nav${ssrRenderAttrs(mergeProps({ class: "navbar-items" }, _attrs))}><!--[-->`);
        ssrRenderList(unref(navbarLinks), (item) => {
          _push(`<div class="navbar-item">`);
          if (item.children) {
            _push(ssrRenderComponent(NavbarDropdown, {
              item,
              class: isMobile.value ? "mobile" : ""
            }, null, _parent));
          } else {
            _push(ssrRenderComponent(AutoLink, { item }, null, _parent));
          }
          _push(`</div>`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/NavbarItems.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const NavbarItems = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "NavbarItems.vue"]]);
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "ToggleColorModeButton",
  __ssrInlineRender: true,
  setup(__props) {
    const themeLocale = useThemeLocaleData();
    const isDarkMode = useDarkMode();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: "toggle-color-mode-button",
        title: unref(themeLocale).toggleColorMode
      }, _attrs))}><svg style="${ssrRenderStyle(!unref(isDarkMode) ? null : { display: "none" })}" class="icon" focusable="false" viewBox="0 0 32 32"><path d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6z" fill="currentColor"></path><path d="M5.394 6.813l1.414-1.415l3.506 3.506L8.9 10.318z" fill="currentColor"></path><path d="M2 15.005h5v2H2z" fill="currentColor"></path><path d="M5.394 25.197L8.9 21.691l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 25.005h2v5h-2z" fill="currentColor"></path><path d="M21.687 23.106l1.414-1.415l3.506 3.506l-1.414 1.414z" fill="currentColor"></path><path d="M25 15.005h5v2h-5z" fill="currentColor"></path><path d="M21.687 8.904l3.506-3.506l1.414 1.415l-3.506 3.505z" fill="currentColor"></path><path d="M15 2.005h2v5h-2z" fill="currentColor"></path></svg><svg style="${ssrRenderStyle(unref(isDarkMode) ? null : { display: "none" })}" class="icon" focusable="false" viewBox="0 0 32 32"><path d="M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3z" fill="currentColor"></path></svg></button>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/ToggleColorModeButton.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const ToggleColorModeButton = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "ToggleColorModeButton.vue"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "ToggleSidebarButton",
  __ssrInlineRender: true,
  emits: ["toggle"],
  setup(__props) {
    const themeLocale = useThemeLocaleData();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "toggle-sidebar-button",
        title: unref(themeLocale).toggleSidebar,
        "aria-expanded": "false",
        role: "button",
        tabindex: "0"
      }, _attrs))}><div class="icon" aria-hidden="true"><span></span><span></span><span></span></div></div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/ToggleSidebarButton.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const ToggleSidebarButton = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "ToggleSidebarButton.vue"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  emits: ["toggle-sidebar"],
  setup(__props) {
    const themeLocale = useThemeLocaleData();
    const navbar = ref(null);
    const navbarBrand = ref(null);
    const linksWrapperMaxWidth = ref(0);
    const linksWrapperStyle = computed(() => {
      if (!linksWrapperMaxWidth.value) {
        return {};
      }
      return {
        maxWidth: linksWrapperMaxWidth.value + "px"
      };
    });
    onMounted(() => {
      const MOBILE_DESKTOP_BREAKPOINT = 719;
      const navbarHorizontalPadding = getCssValue(navbar.value, "paddingLeft") + getCssValue(navbar.value, "paddingRight");
      const handleLinksWrapWidth = () => {
        var _a;
        if (window.innerWidth < MOBILE_DESKTOP_BREAKPOINT) {
          linksWrapperMaxWidth.value = 0;
        } else {
          linksWrapperMaxWidth.value = navbar.value.offsetWidth - navbarHorizontalPadding - (((_a = navbarBrand.value) == null ? void 0 : _a.offsetWidth) || 0);
        }
      };
      handleLinksWrapWidth();
      window.addEventListener("resize", handleLinksWrapWidth, false);
      window.addEventListener("orientationchange", handleLinksWrapWidth, false);
    });
    function getCssValue(el, property) {
      var _a, _b, _c;
      const val = (_c = (_b = (_a = el == null ? void 0 : el.ownerDocument) == null ? void 0 : _a.defaultView) == null ? void 0 : _b.getComputedStyle(el, null)) == null ? void 0 : _c[property];
      const num = Number.parseInt(val, 10);
      return Number.isNaN(num) ? 0 : num;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NavbarSearch = resolveComponent("NavbarSearch");
      _push(`<header${ssrRenderAttrs(mergeProps({
        ref_key: "navbar",
        ref: navbar,
        class: "navbar"
      }, _attrs))}>`);
      _push(ssrRenderComponent(ToggleSidebarButton, {
        onToggle: ($event) => _ctx.$emit("toggle-sidebar")
      }, null, _parent));
      _push(`<span>`);
      _push(ssrRenderComponent(NavbarBrand, null, null, _parent));
      _push(`</span><div class="navbar-items-wrapper" style="${ssrRenderStyle(unref(linksWrapperStyle))}">`);
      ssrRenderSlot(_ctx.$slots, "before", {}, null, _push, _parent);
      _push(ssrRenderComponent(NavbarItems, { class: "can-hide" }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "after", {}, null, _push, _parent);
      if (unref(themeLocale).colorModeSwitch) {
        _push(ssrRenderComponent(ToggleColorModeButton, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NavbarSearch, null, null, _parent));
      _push(`</div></header>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/Navbar.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "Navbar.vue"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "PageMeta",
  __ssrInlineRender: true,
  setup(__props) {
    const useEditNavLink = () => {
      const themeLocale2 = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();
      return computed(() => {
        var _a, _b, _c;
        const showEditLink = (_b = (_a = frontmatter.value.editLink) != null ? _a : themeLocale2.value.editLink) != null ? _b : true;
        if (!showEditLink) {
          return null;
        }
        const {
          repo,
          docsRepo = repo,
          docsBranch = "main",
          docsDir = "",
          editLinkText
        } = themeLocale2.value;
        if (!docsRepo)
          return null;
        const editLink = resolveEditLink({
          docsRepo,
          docsBranch,
          docsDir,
          filePathRelative: page.value.filePathRelative,
          editLinkPattern: (_c = frontmatter.value.editLinkPattern) != null ? _c : themeLocale2.value.editLinkPattern
        });
        if (!editLink)
          return null;
        return {
          text: editLinkText != null ? editLinkText : "Edit this page",
          link: editLink
        };
      });
    };
    const useLastUpdated = () => {
      const themeLocale2 = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();
      return computed(() => {
        var _a, _b, _c, _d;
        const showLastUpdated = (_b = (_a = frontmatter.value.lastUpdated) != null ? _a : themeLocale2.value.lastUpdated) != null ? _b : true;
        if (!showLastUpdated)
          return null;
        if (!((_c = page.value.git) == null ? void 0 : _c.updatedTime))
          return null;
        const updatedDate = new Date((_d = page.value.git) == null ? void 0 : _d.updatedTime);
        return updatedDate.toLocaleString();
      });
    };
    const useContributors = () => {
      const themeLocale2 = useThemeLocaleData();
      const page = usePageData();
      const frontmatter = usePageFrontmatter();
      return computed(() => {
        var _a, _b, _c, _d;
        const showContributors = (_b = (_a = frontmatter.value.contributors) != null ? _a : themeLocale2.value.contributors) != null ? _b : true;
        if (!showContributors)
          return null;
        return (_d = (_c = page.value.git) == null ? void 0 : _c.contributors) != null ? _d : null;
      });
    };
    const themeLocale = useThemeLocaleData();
    const editNavLink = useEditNavLink();
    const lastUpdated = useLastUpdated();
    const contributors = useContributors();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = resolveComponent("ClientOnly");
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "page-meta" }, _attrs))}>`);
      if (unref(editNavLink)) {
        _push(`<div class="meta-item edit-link">`);
        _push(ssrRenderComponent(AutoLink, {
          class: "meta-item-label",
          item: unref(editNavLink)
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(lastUpdated)) {
        _push(`<div class="meta-item last-updated"><span class="meta-item-label">${ssrInterpolate(unref(themeLocale).lastUpdatedText)}: </span>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="meta-item-info"${_scopeId}>${ssrInterpolate(unref(lastUpdated))}</span>`);
            } else {
              return [
                createVNode("span", { class: "meta-item-info" }, toDisplayString(unref(lastUpdated)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(contributors) && unref(contributors).length) {
        _push(`<div class="meta-item contributors"><span class="meta-item-label">${ssrInterpolate(unref(themeLocale).contributorsText)}: </span><span class="meta-item-info"><!--[-->`);
        ssrRenderList(unref(contributors), (contributor, index2) => {
          _push(`<!--[--><span class="contributor"${ssrRenderAttr("title", `email: ${contributor.email}`)}>${ssrInterpolate(contributor.name)}</span>`);
          if (index2 !== unref(contributors).length - 1) {
            _push(`<!--[-->, <!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</footer>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/PageMeta.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const PageMeta = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "PageMeta.vue"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "PageNav",
  __ssrInlineRender: true,
  setup(__props) {
    const resolveFromFrontmatterConfig = (conf) => {
      if (conf === false) {
        return null;
      }
      if (isString(conf)) {
        return useNavLink(conf);
      }
      if (isPlainObject(conf)) {
        return conf;
      }
      return false;
    };
    const resolveFromSidebarItems = (sidebarItems2, currentPath, offset) => {
      const index2 = sidebarItems2.findIndex((item) => item.link === currentPath);
      if (index2 !== -1) {
        const targetItem = sidebarItems2[index2 + offset];
        if (!(targetItem == null ? void 0 : targetItem.link)) {
          return null;
        }
        return targetItem;
      }
      for (const item of sidebarItems2) {
        if (item.children) {
          const childResult = resolveFromSidebarItems(
            item.children,
            currentPath,
            offset
          );
          if (childResult) {
            return childResult;
          }
        }
      }
      return null;
    };
    const frontmatter = usePageFrontmatter();
    const sidebarItems = useSidebarItems();
    const route = useRoute();
    const prevNavLink = computed(() => {
      const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev);
      if (prevConfig !== false) {
        return prevConfig;
      }
      return resolveFromSidebarItems(sidebarItems.value, route.path, -1);
    });
    const nextNavLink = computed(() => {
      const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next);
      if (nextConfig !== false) {
        return nextConfig;
      }
      return resolveFromSidebarItems(sidebarItems.value, route.path, 1);
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(prevNavLink) || unref(nextNavLink)) {
        _push(`<nav${ssrRenderAttrs(mergeProps({ class: "page-nav" }, _attrs))}><p class="inner">`);
        if (unref(prevNavLink)) {
          _push(`<span class="prev">`);
          _push(ssrRenderComponent(AutoLink, { item: unref(prevNavLink) }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(nextNavLink)) {
          _push(`<span class="next">`);
          _push(ssrRenderComponent(AutoLink, { item: unref(nextNavLink) }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/PageNav.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const PageNav = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "PageNav.vue"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Page",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Content = resolveComponent("Content");
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      _push(`<div class="theme-default-content">`);
      ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push, _parent);
      _push(ssrRenderComponent(_component_Content, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(PageMeta, null, null, _parent));
      _push(ssrRenderComponent(PageNav, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
      _push(`</main>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/Page.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const Page = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "Page.vue"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "SidebarItem",
  __ssrInlineRender: true,
  props: {
    item: {
      type: Object,
      required: true
    },
    depth: {
      type: Number,
      required: false,
      default: 0
    }
  },
  setup(__props) {
    const props = __props;
    const { item, depth } = toRefs(props);
    const route = useRoute();
    const router = useRouter();
    const isActive = computed(() => isActiveSidebarItem(item.value, route));
    const itemClass = computed(() => ({
      "sidebar-item": true,
      "sidebar-heading": depth.value === 0,
      "active": isActive.value,
      "collapsible": item.value.collapsible
    }));
    const isOpenDefault = computed(
      () => item.value.collapsible ? isActive.value : true
    );
    const [isOpen, toggleIsOpen] = useToggle(isOpenDefault.value);
    const unregisterRouterHook = router.afterEach((to) => {
      nextTick(() => {
        isOpen.value = isOpenDefault.value;
      });
    });
    onBeforeUnmount(() => {
      unregisterRouterHook();
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_SidebarItem = resolveComponent("SidebarItem", true);
      _push(`<li${ssrRenderAttrs(_attrs)}>`);
      if (unref(item).link) {
        _push(ssrRenderComponent(AutoLink, {
          class: unref(itemClass),
          item: unref(item)
        }, null, _parent));
      } else {
        _push(`<p tabindex="0" class="${ssrRenderClass(unref(itemClass))}">${ssrInterpolate(unref(item).text)} `);
        if (unref(item).collapsible) {
          _push(`<span class="${ssrRenderClass([unref(isOpen) ? "down" : "right", "arrow"])}"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p>`);
      }
      if ((_a = unref(item).children) == null ? void 0 : _a.length) {
        _push(ssrRenderComponent(DropdownTransition, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<ul style="${ssrRenderStyle(unref(isOpen) ? null : { display: "none" })}" class="sidebar-item-children"${_scopeId}><!--[-->`);
              ssrRenderList(unref(item).children, (child) => {
                _push2(ssrRenderComponent(_component_SidebarItem, {
                  key: `${unref(depth)}${child.text}${child.link}`,
                  item: child,
                  depth: unref(depth) + 1
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></ul>`);
            } else {
              return [
                withDirectives(createVNode("ul", { class: "sidebar-item-children" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(item).children, (child) => {
                    return openBlock(), createBlock(_component_SidebarItem, {
                      key: `${unref(depth)}${child.text}${child.link}`,
                      item: child,
                      depth: unref(depth) + 1
                    }, null, 8, ["item", "depth"]);
                  }), 128))
                ], 512), [
                  [vShow, unref(isOpen)]
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</li>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/SidebarItem.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const SidebarItem = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "SidebarItem.vue"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SidebarItems",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const sidebarItems = useSidebarItems();
    onMounted(() => {
      watch(
        () => route.hash,
        (hash) => {
          const sidebar = document.querySelector(".sidebar");
          if (!sidebar)
            return;
          const activeSidebarItem = document.querySelector(
            `.sidebar a.sidebar-item[href="${route.path}${hash}"]`
          );
          if (!activeSidebarItem)
            return;
          const { top: sidebarTop, height: sidebarHeight } = sidebar.getBoundingClientRect();
          const { top: activeSidebarItemTop, height: activeSidebarItemHeight } = activeSidebarItem.getBoundingClientRect();
          if (activeSidebarItemTop < sidebarTop) {
            activeSidebarItem.scrollIntoView(true);
          } else if (activeSidebarItemTop + activeSidebarItemHeight > sidebarTop + sidebarHeight) {
            activeSidebarItem.scrollIntoView(false);
          }
        }
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(sidebarItems).length) {
        _push(`<ul${ssrRenderAttrs(mergeProps({ class: "sidebar-items" }, _attrs))}><!--[-->`);
        ssrRenderList(unref(sidebarItems), (item) => {
          _push(ssrRenderComponent(SidebarItem, {
            key: `${item.text}${item.link}`,
            item
          }, null, _parent));
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/SidebarItems.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const SidebarItems = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "SidebarItems.vue"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "sidebar" }, _attrs))}>`);
      _push(ssrRenderComponent(NavbarItems, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "top", {}, null, _push, _parent);
      _push(ssrRenderComponent(SidebarItems, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
      _push(`</aside>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/components/Sidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Sidebar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "Sidebar.vue"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePageData();
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const shouldShowNavbar = computed(
      () => frontmatter.value.navbar !== false && themeLocale.value.navbar !== false
    );
    const sidebarItems = useSidebarItems();
    const isSidebarOpen = ref(false);
    const toggleSidebar = (to) => {
      isSidebarOpen.value = typeof to === "boolean" ? to : !isSidebarOpen.value;
    };
    const containerClass = computed(() => [
      {
        "no-navbar": !shouldShowNavbar.value,
        "no-sidebar": !sidebarItems.value.length,
        "sidebar-open": isSidebarOpen.value
      },
      frontmatter.value.pageClass
    ]);
    let unregisterRouterHook;
    onMounted(() => {
      const router = useRouter();
      unregisterRouterHook = router.afterEach(() => {
        toggleSidebar(false);
      });
    });
    onUnmounted(() => {
      unregisterRouterHook();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["theme-container", unref(containerClass)]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "navbar", {}, () => {
        if (unref(shouldShowNavbar)) {
          _push(ssrRenderComponent(Navbar, { onToggleSidebar: toggleSidebar }, {
            before: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, "navbar-before", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "navbar-before")
                ];
              }
            }),
            after: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, "navbar-after", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "navbar-after")
                ];
              }
            }),
            _: 3
          }, _parent));
        } else {
          _push(`<!---->`);
        }
      }, _push, _parent);
      _push(`<div class="sidebar-mask"></div>`);
      ssrRenderSlot(_ctx.$slots, "sidebar", {}, () => {
        _push(ssrRenderComponent(Sidebar, null, {
          top: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "sidebar-top", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "sidebar-top")
              ];
            }
          }),
          bottom: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "sidebar-bottom", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "sidebar-bottom")
              ];
            }
          }),
          _: 3
        }, _parent));
      }, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "page", {}, () => {
        if (unref(frontmatter).home) {
          _push(ssrRenderComponent(Home, null, null, _parent));
        } else {
          _push(ssrRenderComponent(Page, {
            key: unref(page).path
          }, {
            top: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, "page-top", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "page-top")
                ];
              }
            }),
            "content-top": withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, "page-content-top", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "page-content-top")
                ];
              }
            }),
            "content-bottom": withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, "page-content-bottom", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "page-content-bottom")
                ];
              }
            }),
            bottom: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, "page-bottom", {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "page-bottom")
                ];
              }
            }),
            _: 3
          }, _parent));
        }
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Layout = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "Layout.vue"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NotFound",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c;
    const routeLocale = useRouteLocale();
    const themeLocale = useThemeLocaleData();
    const messages = (_a = themeLocale.value.notFound) != null ? _a : ["Not Found"];
    const getMsg = () => messages[Math.floor(Math.random() * messages.length)];
    const homeLink = (_b = themeLocale.value.home) != null ? _b : routeLocale.value;
    const homeText = (_c = themeLocale.value.backToHome) != null ? _c : "Back to home";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_RouterLink = resolveComponent("RouterLink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "theme-container" }, _attrs))}><main class="page"><div class="theme-default-content"><h1>404</h1><blockquote>${ssrInterpolate(getMsg())}</blockquote>`);
      _push(ssrRenderComponent(_component_RouterLink, { to: unref(homeLink) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(homeText))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(homeText)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../../../node_modules/.pnpm/@vuepress+theme-default@2.0.0-beta.53/node_modules/@vuepress/theme-default/lib/client/layouts/NotFound.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const NotFound = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "NotFound.vue"]]);
const index = "";
const clientConfig6 = defineClientConfig({
  enhance({ app, router }) {
    app.component("Badge", Badge);
    app.component("CodeGroup", CodeGroup);
    app.component("CodeGroupItem", CodeGroupItem);
    app.component("AutoLinkExternalIcon", () => {
      const ExternalLinkIcon2 = app.component("ExternalLinkIcon");
      if (ExternalLinkIcon2) {
        return h(ExternalLinkIcon2);
      }
      return null;
    });
    app.component("NavbarSearch", () => {
      const SearchComponent = app.component("Docsearch") || app.component("SearchBox");
      if (SearchComponent) {
        return h(SearchComponent);
      }
      return null;
    });
    const scrollBehavior = router.options.scrollBehavior;
    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();
      return scrollBehavior(...args);
    };
  },
  setup() {
    setupDarkMode();
    setupSidebarItems();
  },
  layouts: {
    Layout,
    NotFound
  }
});
const custom = "";
const codeTheme = "";
const HomePage_vue_vue_type_style_index_0_scoped_297eccf9_lang = "";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-page" }, _attrs))} data-v-297eccf9><div class="container" data-v-297eccf9><div class="main" data-v-297eccf9><h1 class="main__head" data-v-297eccf9><span class="main__head-title" data-v-297eccf9>Nervue</span></h1><div class="main__text" data-v-297eccf9>Vue composition API compatible state manager library</div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../components/HomePage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const HomePage = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-297eccf9"], ["__file", "HomePage.vue"]]);
const clientConfig7 = defineClientConfig({
  enhance({ app }) {
    app.component("HomePage", HomePage);
  }
});
const clientConfigs = [
  clientConfig0,
  clientConfig1,
  clientConfig2,
  clientConfig3,
  clientConfig4,
  clientConfig5,
  clientConfig6,
  clientConfig7
];
var pagesData = ref(pagesData$1);
var pageDataEmpty = readonly({
  key: "",
  path: "",
  title: "",
  lang: "",
  frontmatter: {},
  excerpt: "",
  headers: []
});
var pageData = ref(pageDataEmpty);
var usePageData = () => pageData;
var pageFrontmatterSymbol = Symbol(
  ""
);
var usePageFrontmatter = () => {
  const pageFrontmatter = inject(pageFrontmatterSymbol);
  if (!pageFrontmatter) {
    throw new Error("usePageFrontmatter() is called without provider.");
  }
  return pageFrontmatter;
};
var pageHeadSymbol = Symbol(
  ""
);
var usePageHead = () => {
  const pageHead = inject(pageHeadSymbol);
  if (!pageHead) {
    throw new Error("usePageHead() is called without provider.");
  }
  return pageHead;
};
var pageHeadTitleSymbol = Symbol(
  ""
);
var pageLangSymbol = Symbol(
  ""
);
var usePageLang = () => {
  const pageLang = inject(pageLangSymbol);
  if (!pageLang) {
    throw new Error("usePageLang() is called without provider.");
  }
  return pageLang;
};
var routeLocaleSymbol = Symbol(
  ""
);
var useRouteLocale = () => {
  const routeLocale = inject(routeLocaleSymbol);
  if (!routeLocale) {
    throw new Error("useRouteLocale() is called without provider.");
  }
  return routeLocale;
};
var siteData = ref(siteData$1);
var useSiteData = () => siteData;
var siteLocaleDataSymbol = Symbol(
  ""
);
var useSiteLocaleData = () => {
  const siteLocaleData = inject(siteLocaleDataSymbol);
  if (!siteLocaleData) {
    throw new Error("useSiteLocaleData() is called without provider.");
  }
  return siteLocaleData;
};
var resolvers = reactive({
  resolvePageData: async (pageKey) => {
    const pageDataResolver = pagesData.value[pageKey];
    const pageData2 = await (pageDataResolver == null ? void 0 : pageDataResolver());
    return pageData2 != null ? pageData2 : pageDataEmpty;
  },
  resolvePageFrontmatter: (pageData2) => pageData2.frontmatter,
  resolvePageHead: (headTitle, frontmatter, siteLocale) => {
    const description = isString(frontmatter.description) ? frontmatter.description : siteLocale.description;
    const head = [
      ...isArray(frontmatter.head) ? frontmatter.head : [],
      ...siteLocale.head,
      ["title", {}, headTitle],
      ["meta", { name: "description", content: description }]
    ];
    return dedupeHead(head);
  },
  resolvePageHeadTitle: (page, siteLocale) => `${page.title ? `${page.title}` : ``}${siteLocale.title ? ` | ${siteLocale.title}` : ``}`,
  resolvePageLang: (pageData2) => pageData2.lang || "en",
  resolveRouteLocale: (locales2, routePath) => resolveLocalePath(locales2, routePath),
  resolveSiteLocaleData: (site, routeLocale) => ({
    ...site,
    ...site.locales[routeLocale]
  })
});
var ClientOnly = defineComponent({
  name: "ClientOnly",
  setup(_, ctx) {
    const isMounted = ref(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return () => {
      var _a, _b;
      return isMounted.value ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
    };
  }
});
var Content = defineComponent({
  name: "Content",
  props: {
    pageKey: {
      type: String,
      required: false,
      default: ""
    }
  },
  setup(props) {
    const page = usePageData();
    const pageComponent = computed(
      () => pagesComponents[props.pageKey || page.value.key]
    );
    return () => pageComponent.value ? h(pageComponent.value) : h(
      "div",
      "404 Not Found"
    );
  }
});
var LAYOUT_NAME_DEFAULT = "Layout";
var LAYOUT_NAME_NOT_FOUND = "NotFound";
var layouts = clientConfigs.reduce(
  (prev, item) => ({
    ...prev,
    ...item.layouts
  }),
  {}
);
var Vuepress = defineComponent({
  name: "Vuepress",
  setup() {
    const page = usePageData();
    const layoutComponent = computed(() => {
      let layoutName;
      if (page.value.path) {
        const frontmatterLayout = page.value.frontmatter.layout;
        if (isString(frontmatterLayout)) {
          layoutName = frontmatterLayout;
        } else {
          layoutName = LAYOUT_NAME_DEFAULT;
        }
      } else {
        layoutName = LAYOUT_NAME_NOT_FOUND;
      }
      return layouts[layoutName];
    });
    return () => h(layoutComponent.value);
  }
});
var withBase = (url) => {
  if (isLinkHttp(url))
    return url;
  const base = useSiteData().value.base;
  return `${base}${removeLeadingSlash(url)}`;
};
const pagesRoutes = [
  ["v-5dc4b15a", "/getting-started.html", { "title": "Установка" }, ["/getting-started", "/getting-started.md"]],
  ["v-8daa1a0e", "/", { "title": "Главная" }, ["/index.html", "/index.md"]],
  ["v-52062726", "/introduction.html", { "title": "Что такое Nervue?" }, ["/introduction", "/introduction.md"]],
  ["v-744497ce", "/api/", { "title": "Документация API" }, ["/api/index.html", "/api/index.md"]],
  ["v-7fa0208b", "/core-concepts/actions.html", { "title": "Actions" }, ["/core-concepts/actions", "/core-concepts/actions.md"]],
  ["v-b28f3d86", "/core-concepts/computed.html", { "title": "Computed" }, ["/core-concepts/computed", "/core-concepts/computed.md"]],
  ["v-3835c726", "/core-concepts/expose.html", { "title": "Expose" }, ["/core-concepts/expose", "/core-concepts/expose.md"]],
  ["v-0b2a3ebc", "/core-concepts/guards.html", { "title": "Guards" }, ["/core-concepts/guards", "/core-concepts/guards.md"]],
  ["v-39d79de2", "/core-concepts/", { "title": "Store" }, ["/core-concepts/index.html", "/core-concepts/index.md"]],
  ["v-e8e6c070", "/core-concepts/plugins.html", { "title": "Plugins" }, ["/core-concepts/plugins", "/core-concepts/plugins.md"]],
  ["v-ed2dcd92", "/core-concepts/state.html", { "title": "State" }, ["/core-concepts/state", "/core-concepts/state.md"]],
  ["v-2d0a870d", "/en/", { "title": "Main page" }, ["/en/index.html", "/en/index.md"]],
  ["v-2bb284dc", "/en/introduction.html", { "title": "What is Nervue?" }, ["/en/introduction", "/en/introduction.md"]],
  ["v-075401e2", "/en/api/", { "title": "API documentation" }, ["/en/api/index.html", "/en/api/index.md"]],
  ["v-22c4039f", "/en/core-concepts/actions.html", { "title": "Actions" }, ["/en/core-concepts/actions", "/en/core-concepts/actions.md"]],
  ["v-6810e0a9", "/en/core-concepts/computed.html", { "title": "Computed" }, ["/en/core-concepts/computed", "/en/core-concepts/computed.md"]],
  ["v-563f3192", "/en/core-concepts/expose.html", { "title": "Expose" }, ["/en/core-concepts/expose", "/en/core-concepts/expose.md"]],
  ["v-2933a928", "/en/core-concepts/guards.html", { "title": "Guards" }, ["/en/core-concepts/guards", "/en/core-concepts/guards.md"]],
  ["v-f975dbba", "/en/core-concepts/", { "title": "Store" }, ["/en/core-concepts/index.html", "/en/core-concepts/index.md"]],
  ["v-2eb082dc", "/en/core-concepts/plugins.html", { "title": "Plugins" }, ["/en/core-concepts/plugins", "/en/core-concepts/plugins.md"]],
  ["v-5092b14b", "/en/core-concepts/state.html", { "title": "State" }, ["/en/core-concepts/state", "/en/core-concepts/state.md"]],
  ["v-3706649a", "/404.html", { "title": "" }, ["/404"]]
];
var createRoutes = () => pagesRoutes.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path
      }))
    );
    return result;
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress
    }
  ]
);
var historyCreator = createMemoryHistory;
var createVueRouter = () => {
  const router = createRouter({
    history: historyCreator(removeEndingSlash(siteData.value.base)),
    routes: createRoutes(),
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition)
        return savedPosition;
      if (to.hash)
        return { el: to.hash };
      return { top: 0 };
    }
  });
  router.beforeResolve(async (to, from) => {
    var _a;
    if (to.path !== from.path || from === START_LOCATION) {
      [pageData.value] = await Promise.all([
        resolvers.resolvePageData(to.name),
        (_a = pagesComponents[to.name]) == null ? void 0 : _a.__asyncLoader()
      ]);
    }
  });
  return router;
};
var setupGlobalComponents = (app) => {
  app.component("ClientOnly", ClientOnly);
  app.component("Content", Content);
};
var setupGlobalComputed = (app, router) => {
  const routeLocale = computed(
    () => resolvers.resolveRouteLocale(
      siteData.value.locales,
      router.currentRoute.value.path
    )
  );
  const siteLocaleData = computed(
    () => resolvers.resolveSiteLocaleData(siteData.value, routeLocale.value)
  );
  const pageFrontmatter = computed(
    () => resolvers.resolvePageFrontmatter(pageData.value)
  );
  const pageHeadTitle = computed(
    () => resolvers.resolvePageHeadTitle(pageData.value, siteLocaleData.value)
  );
  const pageHead = computed(
    () => resolvers.resolvePageHead(
      pageHeadTitle.value,
      pageFrontmatter.value,
      siteLocaleData.value
    )
  );
  const pageLang = computed(() => resolvers.resolvePageLang(pageData.value));
  app.provide(routeLocaleSymbol, routeLocale);
  app.provide(siteLocaleDataSymbol, siteLocaleData);
  app.provide(pageFrontmatterSymbol, pageFrontmatter);
  app.provide(pageHeadTitleSymbol, pageHeadTitle);
  app.provide(pageHeadSymbol, pageHead);
  app.provide(pageLangSymbol, pageLang);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $head: { get: () => pageHead.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase }
  });
  return {
    pageData,
    pageFrontmatter,
    pageHead,
    pageHeadTitle,
    pageLang,
    routeLocale,
    siteData,
    siteLocaleData
  };
};
var setupUpdateHead = () => {
  useRoute();
  const head = usePageHead();
  const lang = usePageLang();
  {
    const ssrContext = useSSRContext();
    if (ssrContext) {
      ssrContext.head = head.value;
      ssrContext.lang = lang.value;
    }
    return;
  }
};
var appCreator = createSSRApp;
var createVueApp = async () => {
  var _a;
  const app = appCreator({
    name: "VuepressApp",
    setup() {
      var _a2;
      setupUpdateHead();
      for (const clientConfig of clientConfigs) {
        (_a2 = clientConfig.setup) == null ? void 0 : _a2.call(clientConfig);
      }
      return () => [
        h(RouterView),
        ...clientConfigs.flatMap(
          ({ rootComponents = [] }) => rootComponents.map((component) => h(component))
        )
      ];
    }
  });
  const router = createVueRouter();
  setupGlobalComponents(app);
  setupGlobalComputed(app, router);
  for (const clientConfig of clientConfigs) {
    await ((_a = clientConfig.enhance) == null ? void 0 : _a.call(clientConfig, { app, router, siteData }));
  }
  app.use(router);
  return {
    app,
    router
  };
};
export {
  _export_sfc as _,
  createVueApp
};
