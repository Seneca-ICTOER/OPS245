(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.5.2"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.5.2"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.5.2"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.5.2"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,s),i.exports}(()=>{s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||n(a.precache),r=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(977);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),i=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:i.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let u;async function f(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),i={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=s?s(i):i,c=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,r)}function d(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const g=new Set;s(873);function y(e){return"string"==typeof e?new Request(e):e}class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=y(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,i=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(i,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const a=y(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const i=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,a){const n=d(t.url,s);if(t.url===n)return e.match(t,a);const i=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await e.keys(t,i);for(const t of r)if(n===d(t.url,s))return e.match(t,a)}(l,i.clone(),["__WB_REVISION__"],h):null;try{await l.put(i,u?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=y(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class _ extends class{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new w(this,{event:t,request:s,params:a}),i=this._getResponse(n,s,t);return[i,this._awaitComplete(i,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(n=await i({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,i;try{n=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:i}),t.destroy(),i)throw i}}{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(_.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=n.integrity,i=e.integrity,r=!i||i===t;if(a=await s.fetch(new Request(e,{integrity:i||t})),t&&r){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,a.clone());0}}return a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==_.copyRedirectedCacheableResponsesPlugin&&(a===_.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(_.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}_.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},_.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await f(e):e};class v{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new _({cacheName:i(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),i="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),i=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}s(80);(async()=>{const e=function(){const e=JSON.parse(new URLSearchParams(self.location.search).get("params"));return e.debug&&console.log("[Docusaurus-PWA][SW]: Service Worker params:",e),e}(),t=[{"revision":"c4aa19b2f48b99c355ea6397e7a5ce3d","url":"404.html"},{"revision":"362cc240eea7672963206e0fafc03902","url":"A-Labs/lab1-vbox.html"},{"revision":"d04923d04892642e54890a74c8e68314","url":"A-Labs/lab1-vmware.html"},{"revision":"4d3d43939f9b0965e25e043e8307868e","url":"A-Labs/lab2.html"},{"revision":"5d3aa67ddf5450e35dae4ffbaf7e2025","url":"A-Labs/lab3.html"},{"revision":"cfaa1936cb259c8ab01b36d03072d0bc","url":"A-Labs/lab4.html"},{"revision":"fd14125de5af348525cad68aec39758b","url":"A-Labs/lab5.html"},{"revision":"8831d71d9eb9147eb680a02a181180a8","url":"A-Labs/lab6.html"},{"revision":"961158fb04150406c07d9a436cd06e0a","url":"A-Labs/lab7.html"},{"revision":"30d16bc1ce50740522dd4f2c46703a87","url":"A-Labs/lab8.html"},{"revision":"4a30e0992a6a9401f7f666bf4fc5df74","url":"assets/css/styles.099fe1a9.css"},{"revision":"39dfb9be315c0e2fae001a49615261ea","url":"assets/js/131.d5164acf.js"},{"revision":"a556981206fb551ecc1d86b8f0e5c3fe","url":"assets/js/17896441.17a7c943.js"},{"revision":"b4c3a37db4a497f1c60a97757abca650","url":"assets/js/1be78505.9c6640f7.js"},{"revision":"37bc60816aaec843693bbd3671565dc8","url":"assets/js/20d773fc.13ed90b5.js"},{"revision":"ecf55527f63f107da04bb7ab4c56f295","url":"assets/js/283.7e2ddd41.js"},{"revision":"92a72c90b47c73792cc787eb30ced1e8","url":"assets/js/30eb2287.dcfe1cac.js"},{"revision":"ca1a903ad185c58e5dfaee3daebb72da","url":"assets/js/539.ad0f3fc7.js"},{"revision":"92ecb151c0d77506a4b758ace876b56d","url":"assets/js/59490aaf.daa59de7.js"},{"revision":"e19e4e5c75167b5f159b102b3c9d5af7","url":"assets/js/5f827bca.b198d539.js"},{"revision":"f4bb102d6a0332c7efab43cda1a30d4f","url":"assets/js/61c5f690.f6b3abf3.js"},{"revision":"01756b9379a635990e3e837db51f5676","url":"assets/js/66689c68.5fdc5281.js"},{"revision":"9e5e64ae4a61dbba59a37cc40dddb9aa","url":"assets/js/7ca83706.1b7fa135.js"},{"revision":"851e36206ae034753ee74bbde1ca1920","url":"assets/js/830e6abf.d6bcade0.js"},{"revision":"64fda01fb5425a4759ab869bfe3b1c31","url":"assets/js/8661af7e.a716c64c.js"},{"revision":"eb5e84efd65257ff5e65a81fea4c0d20","url":"assets/js/9310cf6f.1950fbbb.js"},{"revision":"94f8a92e394892279dded9b6b13f1ac4","url":"assets/js/935f2afb.8e532439.js"},{"revision":"f7d00fc444b530c9620000ec2d2ca87c","url":"assets/js/972.7ed9e175.js"},{"revision":"d53663c871eae227c4a3a793240ee683","url":"assets/js/9af68f33.919e366c.js"},{"revision":"f7e68d60ea7545f799b33b996267f517","url":"assets/js/ae58fe3c.d8e48409.js"},{"revision":"df36998b14e51b92a493ad17c7b87b46","url":"assets/js/b9232272.7252d370.js"},{"revision":"c89431e6742b2272f97962e606e059ee","url":"assets/js/c0e20c00.71ecf150.js"},{"revision":"9c962c849224f21cc8fbcdb8704260bf","url":"assets/js/c396239e.75e60441.js"},{"revision":"4b88b6ec85d2074e846477e7e64d924e","url":"assets/js/e4eb8022.34f498c5.js"},{"revision":"9a13661733f06b292ac70f86cc49c8ba","url":"assets/js/ea934244.6353b584.js"},{"revision":"1429c52f6750f4cf87d12e0f98a9e478","url":"assets/js/eb6a5da1.449ca91b.js"},{"revision":"e368f187a97226db847e443f83c4d209","url":"assets/js/ebee8391.f04c8b9e.js"},{"revision":"60667f7bcc82cb9a751b9ec2db9f24fc","url":"assets/js/f06e4f40.4de57372.js"},{"revision":"16a8192bdf2a82354daae57dfd1d2216","url":"assets/js/main.2485784b.js"},{"revision":"1c0a438ea49ce5d327f65f9b64e2828b","url":"assets/js/runtime~main.e7c2f1be.js"},{"revision":"577e1660a76fdb003a5d4556a5262baf","url":"B-Assignments/assignment1.html"},{"revision":"e43f81112b60e6153dc4d1991c166cc0","url":"B-Assignments/assignment2.html"},{"revision":"5713a504575d3f322a73cfddbeaa6489","url":"C-ExtraResources/bash-shell-reference-guide.html"},{"revision":"810c2159926d2e767ee78c4097ab1ad0","url":"C-ExtraResources/bash-shell-scripting-tips.html"},{"revision":"b57036c7c85e5e1cf1789c8192483534","url":"C-ExtraResources/bash-shell-tips.html"},{"revision":"f60668d52229079ec4b9018e00892f7b","url":"C-ExtraResources/python-scripting-tips.html"},{"revision":"de9b0ac8f0be7952efa76c7c074e44ec","url":"C-ExtraResources/scripting-exercise.html"},{"revision":"70328355b1b6d2e5a42e13428a7c7a4f","url":"C-ExtraResources/tips.html"},{"revision":"ca3cda616d73957c7a2f794ec597697e","url":"index.html"},{"revision":"2524df02c6e551be5aef857403777080","url":"manifest.json"},{"revision":"b9106c1c5069d2be20142276840c3209","url":"weekly-schedule.html"},{"revision":"7843e5ea6990222327f842c71f52ebeb","url":"assets/images/bgray-8fd1574cfe839a26e88c967ec5aa8166.png"},{"revision":"cf5d8d13f8f7d0a37ef76d8ea74d4571","url":"assets/images/Chains-85c8540e54b680d4e983ce44177a7a27.png"},{"revision":"e63f4b9f1dbcbf243dfe822efefbc804","url":"assets/images/Crontab-eed842dff3680778b52aea1ec19ad84e.png"},{"revision":"1c5a7b01d097ccc00e03bf145641849b","url":"assets/images/deb1groups1-b44262266b1615db77c7d56bc4e667f3.png"},{"revision":"d4105241616028c481a53dee64ca3c9b","url":"assets/images/deb1groups2-72a1904523edb5b83d31c5a994919aca.png"},{"revision":"7ee1c02a4926527bd891716ec5969977","url":"assets/images/deb1groups3-321eb083074a92c982fab22b3b9f7f0a.png"},{"revision":"3fd25ae10ea25ae2325a147bf77ff183","url":"assets/images/deb1groups5-80a9924b068c4c3001d13b976a288f62.png"},{"revision":"95bc38cfd41b75440b3f49907bb42ca3","url":"assets/images/deb1grub-a8bb0d401b9746bfc0c0b304a0d90cba.png"},{"revision":"d31d508519a9ad1ecc076787b17f879b","url":"assets/images/deb1grubinit-61108924e504c9e216e9463dc768cc1c.png"},{"revision":"bb22770aff2333a38a51f4705ba0c6e0","url":"assets/images/deb1grubsingle-7199c603be10dae571840dcdd9f5ad03.png"},{"revision":"4973f1f92bcde23e79d07f28dbea5b05","url":"assets/images/deb1home1-b73351a0b4af12340a0ae8551b100381.png"},{"revision":"b2c21cf10c758c8990561abeb2d3d8fb","url":"assets/images/deb1home2-a57dcec2e26c939e5c1fe12516d90dc7.png"},{"revision":"4adca846c7229368fd3b7078186d0070","url":"assets/images/deb1home3-b3e6aa5fc5b4f022c5b9d82b9cad0ff9.png"},{"revision":"d2698347da714bec15dca770e6f38a25","url":"assets/images/deb1init1-ef61fed69083f1d67ffb1744a9cf863a.png"},{"revision":"6fc6f9beab41e4f4f596a1e2d36dc120","url":"assets/images/deb1journal-25f1748ebcb7cfa53046f8ce2e7c353f.png"},{"revision":"c2563bd47caf00900a38e16218488bc6","url":"assets/images/deb1login-237a2d1965d5c7c717d6b21888ab2ab2.png"},{"revision":"6c7d14b79f00dffbebb6ef38950d433e","url":"assets/images/deb1part-7df8236ca6914350a46d97ecc8562249.png"},{"revision":"98e710a89292e5f0ec3699c467ff64a1","url":"assets/images/deb1shadow1-d094d97fbb23cb44af60324965c90cef.png"},{"revision":"e99abaf2da343943a2be37539c4ad587","url":"assets/images/deb1skel1-a46d0c3ced9d2d881674c92578a05d80.png"},{"revision":"7f7867c9f7e9c6a64204249dbb93e571","url":"assets/images/deb1status-7ccd86345cf35c0fcf0a3bbd7aff3553.png"},{"revision":"59ec4d1934b1c4171e450ae1f4e334a5","url":"assets/images/deb1sudo1-7f3d7c53cdbcb3119bcc12a9f78eb0f8.png"},{"revision":"5fb52cffd15a86e157f3167968754ede","url":"assets/images/deb1systemd-be8fe31ca0538422153bba8b4e6d3eaa.png"},{"revision":"9222c62c98624617f142a00c8b25e072","url":"assets/images/deb1tty-4b1fc05496becd9c9f936778089b55ef.png"},{"revision":"0a8cce4d45d7fefeba55dbc724d6928c","url":"assets/images/deb1users1-05d265c6b3b8c7c02defad67bfaf6c80.png"},{"revision":"a423905c09e07c431fea2fe1e9089d75","url":"assets/images/deb1users2-ba79f3ba09a0ffdd414518482c7b0a90.png"},{"revision":"252bc8189d4b24dbb82e959e667a0f3e","url":"assets/images/deb2part-afc7d7f45486a21f7f1b4105cf911426.png"},{"revision":"91df8b8546e557e018ec70bb66bbaee2","url":"assets/images/deb3boot-7a1171795c1b10cf24f14802061f317e.png"},{"revision":"6747442a5a9b8a985d4cee8cc57b80a0","url":"assets/images/deb3tty-2e90dc360487f7d20db9d6dcae51e342.png"},{"revision":"5c92ca285aa1731240a0400f015a6474","url":"assets/images/debgpt-91af182cd6dab26997d3d48be59b28ee.png"},{"revision":"57b640470b4af4e45b050750e1f01b1e","url":"assets/images/debgptlvm-10-c67da4b6c204b6033826515ce2f6aad1.png"},{"revision":"5991a5dfd86c896c7317970a621ee1b3","url":"assets/images/debinstfb-ddfba98b1a5cbeeea65166a534dece35.png"},{"revision":"592c3b27a55c3678150ef76288ce0b5c","url":"assets/images/deblvm1-89ca80dd6f0f298903aa86367bfedc4a.png"},{"revision":"d6f7a711530831fde73bea6a8fc91707","url":"assets/images/debsettings-4378fdda61de4ab1c43742b898a0c0f9.png"},{"revision":"70922632d765e1d46f94765a20d16ac8","url":"assets/images/debsettings2-51aaf7488da8a155153b00a96238c29c.png"},{"revision":"9f3cf4ee692f03d01a1a146bef9ebc53","url":"assets/images/Desk_flip-421c45a0c59b297140d88dd5a57d6aa5.png"},{"revision":"893fa21cf917cd058d39a629d5cf09af","url":"assets/images/df-acc9ad4640a93bae36da5a44cfb8ef0b.png"},{"revision":"b76426be5dc9a9d42ea459e686454489","url":"assets/images/Dhcp-config-bcc68e5ad6191311657e6a0c2be814e5.png"},{"revision":"ebc24e8de480873fbedeb7df626a6334","url":"assets/images/Dhcp-pic-a50a5e1b51324c506011084bccdf7fe2.png"},{"revision":"aba75460b59fbe11656f5faa667e7936","url":"assets/images/Disk_usage-773714d42a001a7c75336b072280b450.png"},{"revision":"0caafa10167b650efea400b1aa46ddba","url":"assets/images/Dora-67a1e54f9f13a472b7173ed2b1ac73b9.png"},{"revision":"6dde2592011dafd00dea727a0e1d30d5","url":"assets/images/Firewall-47ee633533b09162d89becea33f4d978.png"},{"revision":"4b5fe89d949b71e2480f5b09d15ab9eb","url":"assets/images/Format_ExFAT-30d42c25bc240178fb1826d93ec60f92.png"},{"revision":"aa49f60770292ce3a83f6dc1e3cf9321","url":"assets/images/hans-e5d1dfbf086641404eb3e7442cf50f67.jpg"},{"revision":"5ac8d5be7b0c4b5428f3df3eaf36d669","url":"assets/images/hexchat-6d570501c8c1b09203bc41e2d6c7d5f6.png"},{"revision":"961eff939cdf710a7f95f20997ab1111","url":"assets/images/ipaddr-47a5cc3ce0ae05429175f7e220aed449.png"},{"revision":"c82442c506ac918278f7ef03d21dff02","url":"assets/images/ipaddr2-90ab0adf6ac42bdab8d637aa4f241ce7.png"},{"revision":"fcea0f5e3d10bf1835b0ab717e7e585b","url":"assets/images/iptables1-c85eba8bf6b7d8c106363a7955c86c47.png"},{"revision":"363ba5b9df4300fea029f10b2dd010ec","url":"assets/images/iptables2-df32a8daf66f54f862ce1faab696e855.png"},{"revision":"f99993171ec32a52ded28e1a707b8e94","url":"assets/images/JasonCarman-62b72df6c15f0bd02b87e18d0499c822.jpg"},{"revision":"68579db0a1d1f325c8e3b37b1fc01a75","url":"assets/images/labenv-9cdc9ec6c2df7d751f585f8f64b73929.png"},{"revision":"f5945c4de8270ea397b02d5f1777eb71","url":"assets/images/Lbreakout2-781121048be19c8e23859aef95b630b8.png"},{"revision":"e5388c515a603469a87818309d456f33","url":"assets/images/lbreakout2run-a5feb22773d7727ee131c7004244f182.png"},{"revision":"52a7d5976b572c873d9460de88219ccd","url":"assets/images/lbreakoutsrc-5337c4fba60d6599e8cb77141c52527f.png"},{"revision":"6d4391ff200176b4d0179094a397ede1","url":"assets/images/libvirtdstatus-e31bc28a98e564cc0920ff28b4560a48.png"},{"revision":"467c6aab04d4864be20e5a98b230a360","url":"assets/images/memcpu-82e2f90ad23c0b4d3b31a6bfce82dd58.png"},{"revision":"e8a1e3dc158b8bda4acef059b80f3b01","url":"assets/images/Mount-62e8a23f5188445a30063dbb135125dd.png"},{"revision":"7ee830ad8b76f4ac7c8f010cb4cc85b2","url":"assets/images/My-network-6dda78825fb0ed51c882ba6656cea939.png"},{"revision":"f8e258c79f50c2c8fb818ffff9a43e16","url":"assets/images/Network-config-centos-c8e0040e6fbd2d2e62cd38095c78725b.png"},{"revision":"e72c221078d8590b0b60f5b3e0e99e11","url":"assets/images/Network-scripts-72748ca439071c0bea894422f987f8cb.png"},{"revision":"3c11e3b84d60ad50d5bbdbc111fb013e","url":"assets/images/New-network-config-2a93dc2496fd116ff7b7d3a48ced7968.png"},{"revision":"88713f2b177634edf59be6854098c87d","url":"assets/images/Passwd-file-1daf9dfed5c1484a9966af672d2a99cf.png"},{"revision":"6106d5abc8e83a777cd3f1ad7948facb","url":"assets/images/scale-b0a1316b41c50f8715e7546801182f25.png"},{"revision":"454cd9ec39d5a57ea4a8ac222b4b6912","url":"assets/images/searchperms-9f89a5fa7839f7f5d7677fa74346cee2.png"},{"revision":"40ba61071a3292f3b91b4b244fdc1988","url":"assets/images/single-0e6933c8c35a91e4164395b882786d60.png"},{"revision":"fb2b828e2f0d77b740901108e9cb0ce7","url":"assets/images/softsel-4b046cb044747458f1516b57f78638c6.png"},{"revision":"6afb740c9fe0bdf084b2f90002d9c009","url":"assets/images/softsel2-237b4c394227f0547a770cab6b79d7c4.png"},{"revision":"d181eb061fcf8ac87e9ae62d277a9b6e","url":"assets/images/Software-ad583618dfc81275bab4da7518b86eb8.png"},{"revision":"b1d193f44c2add93418aa94b1a31cc27","url":"assets/images/Spoof-33a214307013854d9d325b6da862c8c2.png"},{"revision":"bc19732a7bfacba678a2a1d41fa57acc","url":"assets/images/Ssm-b324e192cc2f91a9ed6c88a8f6cc0803.png"},{"revision":"a60a866f006535c0266b57cbb59677a6","url":"assets/images/tasksel-8338116af69996ab5dda8eb90e8b36b8.png"},{"revision":"b18cf70d21eabbd45664757a8aae804e","url":"assets/images/Tunel-gedit-2a25774ddccb5f1d6776e9d42f2c4ab3.png"},{"revision":"a6e10e4a57ca3deea7c3a725898e2992","url":"assets/images/vboxprefs-1f242d29d4497f54ecb4862cdf4116bf.png"},{"revision":"ae8d6367194c2dd1ce8d22c5aa0554ec","url":"assets/images/vmbackup-3bccd0c117ba1826e789bd908c880016.png"},{"revision":"15e551008cab97b38d1e2fb07500a50a","url":"assets/images/vmsource-63351551fd812f36ad9774343f09e5c1.png"},{"revision":"09a357b3e74f2ec00c686bc06a440ec3","url":"assets/images/vmware1-76f2b7987cc363e4a3bd9aad416d1d85.png"},{"revision":"ddabbb8a678f31e0a6c1acee1b9361d4","url":"assets/images/vmware2-55a801354084b7dd7e84c802e369d37a.png"},{"revision":"128635393c7175a81b24a933a60d2ebd","url":"assets/images/vmware3-cb7362a9c94d2836c79184cbb659aadb.png"},{"revision":"08dafba3546de1cc4f7198d4baae5b30","url":"assets/images/vmware5-5b1767b66cc3f82297f82365149b6db2.png"},{"revision":"65d41dc3cbd43ec156f4da1db50b657f","url":"assets/images/vmware6-11f0689f5057d6ed817991373026ef0d.png"},{"revision":"d710471700766a0a27fe0577e10a7df8","url":"img/Andrew.jpg"},{"revision":"f7cbd8988d6b1a8303bb0fffb57499c7","url":"img/ansible-sample-report.png"},{"revision":"c74c206538eae814ebdc9bd4485caf1f","url":"img/Ataur-RTN.jpg"},{"revision":"7843e5ea6990222327f842c71f52ebeb","url":"img/bgray.png"},{"revision":"b1f473bb93daae30550f6f3ae3f44768","url":"img/caution.png"},{"revision":"cf5d8d13f8f7d0a37ef76d8ea74d4571","url":"img/Chains.png"},{"revision":"e63f4b9f1dbcbf243dfe822efefbc804","url":"img/Crontab.png"},{"revision":"1c5a7b01d097ccc00e03bf145641849b","url":"img/deb1groups1.png"},{"revision":"d4105241616028c481a53dee64ca3c9b","url":"img/deb1groups2.png"},{"revision":"7ee1c02a4926527bd891716ec5969977","url":"img/deb1groups3.png"},{"revision":"41497f3345ed6631622446cefffdb53c","url":"img/deb1groups4.png"},{"revision":"3fd25ae10ea25ae2325a147bf77ff183","url":"img/deb1groups5.png"},{"revision":"95bc38cfd41b75440b3f49907bb42ca3","url":"img/deb1grub.png"},{"revision":"0b20bec90ef3277616c1ac3ca0c5595d","url":"img/deb1grub2.png"},{"revision":"288cff0f05faf7c57cbc06b093aed4c1","url":"img/deb1grub3.png"},{"revision":"d31d508519a9ad1ecc076787b17f879b","url":"img/deb1grubinit.png"},{"revision":"bb22770aff2333a38a51f4705ba0c6e0","url":"img/deb1grubsingle.png"},{"revision":"4973f1f92bcde23e79d07f28dbea5b05","url":"img/deb1home1.png"},{"revision":"b2c21cf10c758c8990561abeb2d3d8fb","url":"img/deb1home2.png"},{"revision":"4adca846c7229368fd3b7078186d0070","url":"img/deb1home3.png"},{"revision":"d2698347da714bec15dca770e6f38a25","url":"img/deb1init1.png"},{"revision":"6fc6f9beab41e4f4f596a1e2d36dc120","url":"img/deb1journal.png"},{"revision":"c2563bd47caf00900a38e16218488bc6","url":"img/deb1login.png"},{"revision":"6c7d14b79f00dffbebb6ef38950d433e","url":"img/deb1part.png"},{"revision":"98e710a89292e5f0ec3699c467ff64a1","url":"img/deb1shadow1.png"},{"revision":"e99abaf2da343943a2be37539c4ad587","url":"img/deb1skel1.png"},{"revision":"7f7867c9f7e9c6a64204249dbb93e571","url":"img/deb1status.png"},{"revision":"59ec4d1934b1c4171e450ae1f4e334a5","url":"img/deb1sudo1.png"},{"revision":"5fb52cffd15a86e157f3167968754ede","url":"img/deb1systemd.png"},{"revision":"9222c62c98624617f142a00c8b25e072","url":"img/deb1tty.png"},{"revision":"0a8cce4d45d7fefeba55dbc724d6928c","url":"img/deb1users1.png"},{"revision":"a423905c09e07c431fea2fe1e9089d75","url":"img/deb1users2.png"},{"revision":"252bc8189d4b24dbb82e959e667a0f3e","url":"img/deb2part.png"},{"revision":"91df8b8546e557e018ec70bb66bbaee2","url":"img/deb3boot.png"},{"revision":"6747442a5a9b8a985d4cee8cc57b80a0","url":"img/deb3tty.png"},{"revision":"5c92ca285aa1731240a0400f015a6474","url":"img/debgpt.png"},{"revision":"57b640470b4af4e45b050750e1f01b1e","url":"img/debgptlvm-10.png"},{"revision":"ec7ff67256e650afe8497d9f71031aa0","url":"img/debinst.png"},{"revision":"5991a5dfd86c896c7317970a621ee1b3","url":"img/debinstfb.png"},{"revision":"592c3b27a55c3678150ef76288ce0b5c","url":"img/deblvm1.png"},{"revision":"1268fb010585ffc4e04110c999f3a9ff","url":"img/debpower.png"},{"revision":"d6f7a711530831fde73bea6a8fc91707","url":"img/debsettings.png"},{"revision":"70922632d765e1d46f94765a20d16ac8","url":"img/debsettings2.png"},{"revision":"0f8fbf94cd991b46ba5a7928be9bc925","url":"img/debswitch.png"},{"revision":"9f3cf4ee692f03d01a1a146bef9ebc53","url":"img/Desk_flip.png"},{"revision":"893fa21cf917cd058d39a629d5cf09af","url":"img/df.png"},{"revision":"b76426be5dc9a9d42ea459e686454489","url":"img/Dhcp-config.png"},{"revision":"ebc24e8de480873fbedeb7df626a6334","url":"img/Dhcp-pic.png"},{"revision":"aba75460b59fbe11656f5faa667e7936","url":"img/Disk_usage.png"},{"revision":"7fa1a026116afe175cae818030d4ffc4","url":"img/docusaurus.png"},{"revision":"0caafa10167b650efea400b1aa46ddba","url":"img/Dora.png"},{"revision":"ef2266bfb84465c731756b58cde0afb8","url":"img/favicon.ico"},{"revision":"6dde2592011dafd00dea727a0e1d30d5","url":"img/Firewall.png"},{"revision":"4b5fe89d949b71e2480f5b09d15ab9eb","url":"img/Format_ExFAT.png"},{"revision":"41ee72e40a868b1f563a3dea8643527d","url":"img/Group-add.png"},{"revision":"500ff8235a8ae6b46097121c3145fd1d","url":"img/Grub1.png"},{"revision":"07fff2f39bc8d41d0ba8bebffd8c7ed3","url":"img/Grub2_1.png"},{"revision":"3404b63d4d85cad893529a2416a6557f","url":"img/Grub2_3.png"},{"revision":"aa49f60770292ce3a83f6dc1e3cf9321","url":"img/hans.jpg"},{"revision":"5ac8d5be7b0c4b5428f3df3eaf36d669","url":"img/hexchat.png"},{"revision":"961eff939cdf710a7f95f20997ab1111","url":"img/ipaddr.png"},{"revision":"c82442c506ac918278f7ef03d21dff02","url":"img/ipaddr2.png"},{"revision":"fcea0f5e3d10bf1835b0ab717e7e585b","url":"img/iptables1.png"},{"revision":"363ba5b9df4300fea029f10b2dd010ec","url":"img/iptables2.png"},{"revision":"f99993171ec32a52ded28e1a707b8e94","url":"img/JasonCarman.jpg"},{"revision":"6674102f2b6632cbc67cc100aaa67029","url":"img/Kvm-warning.jpg"},{"revision":"68579db0a1d1f325c8e3b37b1fc01a75","url":"img/labenv.png"},{"revision":"f5945c4de8270ea397b02d5f1777eb71","url":"img/Lbreakout2.png"},{"revision":"e5388c515a603469a87818309d456f33","url":"img/lbreakout2run.png"},{"revision":"52a7d5976b572c873d9460de88219ccd","url":"img/lbreakoutsrc.png"},{"revision":"6d4391ff200176b4d0179094a397ede1","url":"img/libvirtdstatus.png"},{"revision":"22c6eb8088b86099d5a78b5a13f7b24d","url":"img/logo-dark.svg"},{"revision":"8817e00103e8837d17c2758b0ce25c41","url":"img/logo.svg"},{"revision":"2f7fec674a94e64ed6f99d7862dd6b87","url":"img/Manage-service.png"},{"revision":"467c6aab04d4864be20e5a98b230a360","url":"img/memcpu.png"},{"revision":"e8a1e3dc158b8bda4acef059b80f3b01","url":"img/Mount.png"},{"revision":"7ee830ad8b76f4ac7c8f010cb4cc85b2","url":"img/My-network.png"},{"revision":"f8e258c79f50c2c8fb818ffff9a43e16","url":"img/Network-config-centos.png"},{"revision":"e72c221078d8590b0b60f5b3e0e99e11","url":"img/Network-scripts.png"},{"revision":"3c11e3b84d60ad50d5bbdbc111fb013e","url":"img/New-network-config.png"},{"revision":"88713f2b177634edf59be6854098c87d","url":"img/Passwd-file.png"},{"revision":"0020d25f88161f6378144e7a0b53cfdc","url":"img/Petercallaghan.jpg"},{"revision":"2e1cb1ba37fc5ae886ea57248bdb60bd","url":"img/pwa/icon-192x192.png"},{"revision":"a0f8ed72d3d3489353a57a03aeac9b0d","url":"img/pwa/icon-256x256.png"},{"revision":"ab9ed19e2716b5c233d6132d66204d53","url":"img/pwa/icon-384x384.png"},{"revision":"b71acc5b894ccfac0c22eb39a590f2a0","url":"img/pwa/icon-512x512.png"},{"revision":"6106d5abc8e83a777cd3f1ad7948facb","url":"img/scale.png"},{"revision":"454cd9ec39d5a57ea4a8ac222b4b6912","url":"img/searchperms.png"},{"revision":"40ba61071a3292f3b91b4b244fdc1988","url":"img/single.png"},{"revision":"fb2b828e2f0d77b740901108e9cb0ce7","url":"img/softsel.png"},{"revision":"6afb740c9fe0bdf084b2f90002d9c009","url":"img/softsel2.png"},{"revision":"d181eb061fcf8ac87e9ae62d277a9b6e","url":"img/Software.png"},{"revision":"b1d193f44c2add93418aa94b1a31cc27","url":"img/Spoof.png"},{"revision":"bc19732a7bfacba678a2a1d41fa57acc","url":"img/Ssm.png"},{"revision":"7d6952fe3f7f5b25926d1997c1d572e6","url":"img/Taskbar.png"},{"revision":"a60a866f006535c0266b57cbb59677a6","url":"img/tasksel.png"},{"revision":"b18cf70d21eabbd45664757a8aae804e","url":"img/Tunel-gedit.png"},{"revision":"b9d9189ed8f8dd58e70d9f8b3f693b3e","url":"img/tutorial/docsVersionDropdown.png"},{"revision":"c14bff79aafafca0957ccc34ee026e2c","url":"img/tutorial/localeDropdown.png"},{"revision":"8d04d316f4d1777793ee773fcbf16cea","url":"img/undraw_docusaurus_mountain.svg"},{"revision":"3d3d63efa464a74e2befd1569465ed21","url":"img/undraw_docusaurus_react.svg"},{"revision":"932b535fc71feb29877bc4b9d708b1d0","url":"img/undraw_docusaurus_tree.svg"},{"revision":"423a919aa294d2642ef9ca44c3884175","url":"img/User-management.png"},{"revision":"a6e10e4a57ca3deea7c3a725898e2992","url":"img/vboxprefs.png"},{"revision":"cb518e611140f509f2aadb51f85d4360","url":"img/virsh1.png"},{"revision":"5e3b37d5ff458e097eaa0e45fe921c39","url":"img/virtview.png"},{"revision":"ae8d6367194c2dd1ce8d22c5aa0554ec","url":"img/vmbackup.png"},{"revision":"15e551008cab97b38d1e2fb07500a50a","url":"img/vmsource.png"},{"revision":"09a357b3e74f2ec00c686bc06a440ec3","url":"img/vmware1.png"},{"revision":"ddabbb8a678f31e0a6c1acee1b9361d4","url":"img/vmware2.png"},{"revision":"128635393c7175a81b24a933a60d2ebd","url":"img/vmware3.png"},{"revision":"394348157ebec32542aa1e32c4c44a1d","url":"img/vmware4.png"},{"revision":"08dafba3546de1cc4f7198d4baae5b30","url":"img/vmware5.png"},{"revision":"65d41dc3cbd43ec156f4da1db50b657f","url":"img/vmware6.png"}],s=new v({fallbackToNetwork:!0});e.offlineMode&&(s.addToCacheList(t),e.debug&&console.log("[Docusaurus-PWA][SW]: addToCacheList",{precacheManifest:t})),await async function(e){}(),self.addEventListener("install",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: install event",{event:t}),t.waitUntil(s.install(t))})),self.addEventListener("activate",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: activate event",{event:t}),t.waitUntil(s.activate(t))})),self.addEventListener("fetch",(async t=>{if(e.offlineMode){const a=t.request.url,n=function(e){const t=new URL(e,self.location.href);return t.origin!==self.location.origin?[]:(t.search="",t.hash="",[t.href,`${t.href}${t.pathname.endsWith("/")?"":"/"}index.html`])}(a);for(const i of n){const r=s.getCacheKeyForURL(i);if(r){const s=caches.match(r);e.debug&&console.log("[Docusaurus-PWA][SW]: serving cached asset",{requestURL:a,possibleURL:i,possibleURLs:n,cacheKey:r,cachedResponse:s}),t.respondWith(s);break}}}})),self.addEventListener("message",(async t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: message event",{event:t});const s=t.data?.type;"SKIP_WAITING"===s&&self.skipWaiting()}))})()})()})();