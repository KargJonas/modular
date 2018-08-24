!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=1)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};n.err=function(e){if(!Modular.data.errors)return"Error";var n=Modular.data.errors[e],t="["+n[0]+"]";n.shift();var r=n.length>1?"\n@ Modular."+n.pop()+"()\n":"";return"🚨 (Modular): "+t+"\n"+n.map(function(e){return"\n--\x3e "+e+"\n"}).join("")+r},n.getAttr=function(e){var n={};return Array.from(e).map(function(e){n[e.name]=e.value}),n},n.getHtml=function(e){if((e=e||"")instanceof Element)return e;if(e.constructor===Function)return Modular.core.getHtml(e());if(e.constructor===Array){if(!e.length)return Modular.core.getHtml("");var n=document.createElement("div");return e.map(function(e){return n.appendChild(Modular.core.getHtml(e))}),n}if(e.constructor===String||e.constructor===Number)return document.createTextNode(e);if(e.constructor===Object){if(e.__config__&&"modular-element"!==e.__config__.type)throw Modular.core.err(2);return e.__config__.render()}throw Modular.core.err(3)},n.getStyle=function(e){var n=e;if("function"==typeof n&&(n=n()),"object"===(void 0===n?"undefined":r(n))){var t=document.createElement("div");Object.assign(t.style,n),n=t.getAttribute("style")}return"string"!=typeof n&&Modular.data.errors&&console.warn(Modular.core.err(6)),n},n.makeEl=function(e,n,t){var r=document.createElement(e);return n&&n.style&&(n.style=Modular.core.getStyle(n.style)),Object.assign(r,n),t&&r.appendChild(t),r}},function(e,n,t){"use strict";var r=t(0),o=t(2),i=u(t(3)),a=u(t(4));function u(e){return e&&e.__esModule?e:{default:e}}var d={data:{bindings:{},renderedEvent:new Event("prerender"),onRender:new Event("postrender")},core:{getAttr:r.getAttr,getHtml:r.getHtml,getStyle:r.getStyle,makeEl:r.makeEl},getBinding:o.getBinding,setBinding:o.setBinding,listenBinding:o.listenBinding,scan:o.scan,el:i.default,render:o.render,router:a.default};Object.defineProperty(window,"Modular",{value:d,writable:!1,enumerable:!0,configurable:!1}),d.data.errors&&console.warn(d.core.err(0))},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.getBinding=function(e){if(Modular.data.bindings[e])return Modular.data.bindings[e].value},n.setBinding=function(e,n){Modular.data.bindings[e]||(Modular.data.bindings[e]={elements:[],lastValue:void 0,value:void 0,listeners:[]}),Modular.data.bindings[e].lastValue=Modular.data.bindings[e].value,Modular.data.bindings[e].value=n,Modular.data.bindings[e].elements.map(function(n){n.element[n.value]=Modular.data.bindings[e].value})},n.listenBinding=function(e,n){Modular.data.bindings[e]||Modular.setBinding(e,void 0),Modular.data.bindings[e].listeners.push(n)},n.scan=function(e){if("string"!=typeof e)throw new Error(Modular.core.err(4));var n=document.createElement("div");return n.innerHTML=e.trim(),Array.from(n.childNodes).map(function(e){return e instanceof Element?Modular.el(e.tagName,Modular.core.getAttr(e.attributes),Modular.scan(e.innerHTML)):e.textContent})},n.render=function(e,n){if(window.dispatchEvent(Modular.data.onRender),!e||!n)throw new Error(Modular.core.err(7));var t=void 0;if(!((t="string"==typeof n?document.querySelector(n):n)instanceof Element))throw Modular.core.err(8);t.innerHTML="",t.appendChild(Modular.core.getHtml(e)),window.dispatchEvent(Modular.data.renderedEvent)}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};n.default=function(){var e=Array.from(arguments),n=e[0].toLowerCase(),t=e[1]||{};if(e.splice(0,2),1===e.length&&(e=e[0]),"string"!=typeof n)throw new Error(Modular.core.err(5));if(void 0!==t.__config__)throw Error(Modular.core.err(1));return t.__config__={type:"modular-element",tag:n,content:e,bindings:t.$bind,element:null},t.__config__.render=function(){var e={};return Object.assign(e,t||{}),delete e.__config__,delete e.$bind,t.__config__.element=Modular.core.makeEl(t.__config__.tag,e,Modular.core.getHtml(t.__config__.content)),"object"===r(t.__config__.bindings)&&(t.__config__.change=function(){Object.entries(t.__config__.bindings).map(function(e){var n=t.__config__.element[e[0]];"true"==n?n=!0:"false"==n&&(n=!1),Modular.setBinding(e[1],n),Modular.data.bindings[e[1]].value===Modular.data.bindings[e[1]].lastValue&&"object"!==r(Modular.data.bindings[e[1]].value)&&"array"!=typeof Modular.data.bindings[e[1]].value||Modular.data.bindings[e[1]].listeners.map(function(n){n(Modular.getBinding(e[1]))})})},Object.entries(t.__config__.bindings).map(function(e){Modular.data.bindings[e[1]]||(Modular.data.bindings[e[1]]={elements:[],lastValue:void 0,value:void 0,listeners:[]}),Modular.data.bindings[e[1]].elements.push({element:t.__config__.element,value:e[0]})}),t.__config__.element.addEventListener("mouseover",function(e){return t.__config__.change(e)}),t.__config__.element.addEventListener("mouseout",function(e){return t.__config__.change(e)}),t.__config__.element.addEventListener("click",function(e){return t.__config__.change(e)}),t.__config__.element.addEventListener("change",function(e){return t.__config__.change(e)}),t.__config__.element.addEventListener("keyup",function(e){return t.__config__.change(e)}),t.__config__.element.addEventListener("keydown",function(e){return t.__config__.change(e)}),t.__config__.element.addEventListener("scroll",function(e){return t.__config__.change(e)}),t.__config__.element.addEventListener("contextmenu",function(e){return t.__config__.change(e)}),t.__config__.change()),t.__config__.element},t}},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t(0),o={newRouteEvent:new Event("newroute"),routes:void 0,page:void 0,getRoute:function(e){var n=e;return n=(n=n.replace(/(^\/+|\/+$)/g,"")).split("/")},routeChange:function(){if(o.routes){if(o.routes.constructor!==Object)throw(0,r.err)(9);for(var e=o.getRoute(window.location.pathname),n=Object.entries(o.routes),t=0;t<n.length;t++){for(var i=o.getRoute(n[t][0]),a=!0,u=0;u<i.length;u++)if(void 0===e[u]||"**"!==i[u]&&i[t]!==e[t]){a=!1;break}if(a)return o.page=n[t][1],void window.dispatchEvent(o.newRouteEvent)}}},init:function(){window.addEventListener("popstate",o.routeChange),o.routeChange()},navigate:function(e){window.history.pushState(null,e,e),o.routeChange()}};n.default=o}]);