(function(e){function t(t){for(var r,o,c=t[0],u=t[1],s=t[2],l=0,f=[];l<c.length;l++)o=c[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(t);while(f.length)f.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={app:0},a={app:0},i=[];function c(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-2d2382a4":"2f80bfef","chunk-5052f346":"966e0a6a"}[e]+".js"}function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-5052f346":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d2382a4":"31d6cfe0","chunk-5052f346":"f907bb1d"}[e]+".css",a=u.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var s=i[c],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===a))return t()}var f=document.getElementsByTagName("style");for(c=0;c<f.length;c++){s=f[c],l=s.getAttribute("data-href");if(l===r||l===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],d.parentNode.removeChild(d),n(i)},d.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=i);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,n[1](f)}a[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"139a":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("h3",[n("router-link",{attrs:{to:{name:"Home"}}},[e._v("Hieupham2k1")]),e._v(" | "+e._s(e.$route.name))],1)]),n("router-view")],1)},a=[],i=(n("5c0b"),n("2877")),c={},u=Object(i["a"])(c,o,a,!1,null,null,null),s=u.exports,l=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f")),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("center",{staticClass:"home mb-5"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-md-4 mb-5 mb-md-0"},[n("h5",[e._v("Welcome")]),n("div",[e._v(" My name is "),n("a",{attrs:{href:"https://www.facebook.com/hieupham19072001/",target:"_blank"}},[e._v("Pham Trung Hieu")]),e._v(", i'm looking for a Software Development job."),n("br"),e._v(" If you are wondering am i the one you're looking for, please give me a call ( 0989063201 ) and let me convince you. ")])]),n("div",{staticClass:"col-12 col-md-8"},[n("h5",[e._v("About Me")]),n("div",{staticClass:"text-light"},[e._v(" -I'm studying Computer Enginering at Hanoi University of Science and Technology."),n("br"),e._v(" -I have exprerience in Web Development since March 2020."),n("br"),e._v(" -I can read and use English Technology Documents."),n("br"),e._v(" -I have exprerience in using Linux Ubuntu OS."),n("br"),e._v(" -I have exprerience in working in a team and working for clients."),n("br"),e._v(" -A few of my projects are listed down below."),n("br")])])]),n("h3",[e._v("My Projects")]),n("div",{staticClass:"d-md-flex"},e._l(e.$router.options.routes[e.$router.options.routes.length-1].children,(function(t){return n("div",{key:t.name,staticClass:"card col-4",staticStyle:{"min-height":"100px"}},[n("h3",[n("router-link",{attrs:{to:t.path}},[e._v(e._s(t.name))])],1),n("center",[n("img",{attrs:{src:"/demo/"+t.name+".png"}})])],1)})),0)])},d=[],p={name:"Home"},h=p,m=(n("9e8c"),Object(i["a"])(h,f,d,!1,null,"134b59b4",null)),v=m.exports;r["a"].use(l["a"]);var b=[{path:"/",name:"Home",component:v},{path:"/",name:"Projects",component:function(){return n.e("chunk-2d2382a4").then(n.bind(null,"fde5"))},children:[{path:"/cats",name:"Cats",component:function(){return n.e("chunk-5052f346").then(n.bind(null,"a905"))}}]}],g=new l["a"]({routes:b,mode:"history"}),y=g,_=n("2f62");r["a"].use(_["a"]);var w=new _["a"].Store({state:{},mutations:{},actions:{},modules:{}}),k=n("bc3a"),j=n.n(k);r["a"].config.productionTip=!1,r["a"].prototype.$axios=j.a,new r["a"]({router:y,store:w,render:function(e){return e(s)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"9c0c":function(e,t,n){},"9e8c":function(e,t,n){"use strict";n("139a")}});
//# sourceMappingURL=app.faf6b3b4.js.map