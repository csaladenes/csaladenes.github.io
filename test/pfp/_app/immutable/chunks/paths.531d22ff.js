import{E as b,s as g}from"./index.d91ec36b.js";const e=[];function x(i,a=b){let n;const o=new Set;function r(t){if(g(i,t)&&(i=t,n)){const c=!e.length;for(const s of o)s[1](),e.push(s,i);if(c){for(let s=0;s<e.length;s+=2)e[s][0](e[s+1]);e.length=0}}}function l(t){r(t(i))}function _(t,c=b){const s=[t,c];return o.add(s),o.size===1&&(n=a(r)||b),t(i),()=>{o.delete(s),o.size===0&&n&&(n(),n=null)}}return{set:r,update:l,subscribe:_}}var f;const h=((f=globalThis.__sveltekit_1gjcxx9)==null?void 0:f.base)??"";var u;const d=((u=globalThis.__sveltekit_1gjcxx9)==null?void 0:u.assets)??h;export{d as a,h as b,x as w};