function z(){}function Z(t,e){for(const n in e)t[n]=e[n];return t}function J(t){return t()}function W(){return Object.create(null)}function w(t){t.forEach(J)}function K(t){return typeof t=="function"}function gt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let E;function xt(t,e){return E||(E=document.createElement("a")),E.href=e,t===E.href}function tt(t){return Object.keys(t).length===0}function bt(t,e,n,i){if(t){const r=Q(t,e,n,i);return t[0](r)}}function Q(t,e,n,i){return t[1]&&i?Z(n.ctx.slice(),t[1](i(e))):n.ctx}function $t(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const a=[],l=Math.max(e.dirty.length,r.length);for(let s=0;s<l;s+=1)a[s]=e.dirty[s]|r[s];return a}return e.dirty|r}return e.dirty}function wt(t,e,n,i,r,a){if(r){const l=Q(e,n,i,a);t.p(l,r)}}function kt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function vt(t){return t&&K(t.destroy)?t.destroy:z}let N=!1;function et(){N=!0}function nt(){N=!1}function it(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function ct(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let o=0;o<e.length;o++){const f=e[o];f.claim_order!==void 0&&c.push(f)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let c=0;c<e.length;c++){const o=e[c].claim_order,f=(r>0&&e[n[r]].claim_order<=o?r+1:it(1,r,d=>e[n[d]].claim_order,o))-1;i[c]=n[f]+1;const _=f+1;n[_]=c,r=Math.max(_,r)}const a=[],l=[];let s=e.length-1;for(let c=n[r]+1;c!=0;c=i[c-1]){for(a.push(e[c-1]);s>=c;s--)l.push(e[s]);s--}for(;s>=0;s--)l.push(e[s]);a.reverse(),l.sort((c,o)=>c.claim_order-o.claim_order);for(let c=0,o=0;c<l.length;c++){for(;o<a.length&&l[c].claim_order>=a[o].claim_order;)o++;const f=o<a.length?a[o]:null;t.insertBefore(l[c],f)}}function rt(t,e){if(N){for(ct(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Et(t,e,n){N&&!n?rt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function lt(t){t.parentNode.removeChild(t)}function St(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function st(t){return document.createElement(t)}function F(t){return document.createTextNode(t)}function At(){return F(" ")}function jt(){return F("")}function Nt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Ct(t){return function(e){return e.preventDefault(),t.call(this,e)}}function Mt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ot(t){return Array.from(t.childNodes)}function at(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function R(t,e,n,i,r=!1){at(t);const a=(()=>{for(let l=t.claim_info.last_index;l<t.length;l++){const s=t[l];if(e(s)){const c=n(s);return c===void 0?t.splice(l,1):t[l]=c,r||(t.claim_info.last_index=l),s}}for(let l=t.claim_info.last_index-1;l>=0;l--){const s=t[l];if(e(s)){const c=n(s);return c===void 0?t.splice(l,1):t[l]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=l,s}}return i()})();return a.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,a}function ut(t,e,n,i){return R(t,r=>r.nodeName===e,r=>{const a=[];for(let l=0;l<r.attributes.length;l++){const s=r.attributes[l];n[s.name]||a.push(s.name)}a.forEach(l=>r.removeAttribute(l))},()=>i(e))}function qt(t,e,n){return ut(t,e,n,st)}function ft(t,e){return R(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>F(e),!0)}function Lt(t){return ft(t," ")}function Tt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Bt(t,e){t.value=e==null?"":e}function Dt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Ot(t,e,n){t.classList[n?"add":"remove"](e)}function dt(t,e,n=!1){const i=document.createEvent("CustomEvent");return i.initCustomEvent(t,n,!1,e),i}function Pt(t,e=document.body){return Array.from(e.querySelectorAll(t))}let $;function b(t){$=t}function C(){if(!$)throw new Error("Function called outside component initialization");return $}function zt(t){C().$$.on_mount.push(t)}function Ft(t){C().$$.after_update.push(t)}function Ht(){const t=C();return(e,n)=>{const i=t.$$.callbacks[e];if(i){const r=dt(e,n);i.slice().forEach(a=>{a.call(t,r)})}}}function It(t,e){C().$$.context.set(t,e)}function Wt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const x=[],G=[],A=[],D=[],U=Promise.resolve();let O=!1;function V(){O||(O=!0,U.then(X))}function Gt(){return V(),U}function P(t){A.push(t)}function Jt(t){D.push(t)}const B=new Set;let S=0;function X(){const t=$;do{for(;S<x.length;){const e=x[S];S++,b(e),_t(e.$$)}for(b(null),x.length=0,S=0;G.length;)G.pop()();for(let e=0;e<A.length;e+=1){const n=A[e];B.has(n)||(B.add(n),n())}A.length=0}while(x.length);for(;D.length;)D.pop()();O=!1,B.clear(),b(t)}function _t(t){if(t.fragment!==null){t.update(),w(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(P)}}const j=new Set;let g;function Kt(){g={r:0,c:[],p:g}}function Qt(){g.r||w(g.c),g=g.p}function Y(t,e){t&&t.i&&(j.delete(t),t.i(e))}function ht(t,e,n,i){if(t&&t.o){if(j.has(t))return;j.add(t),g.c.push(()=>{j.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}}function Rt(t,e){ht(t,1,1,()=>{e.delete(t.key)})}function Ut(t,e,n,i,r,a,l,s,c,o,f,_){let d=t.length,m=a.length,h=d;const M={};for(;h--;)M[t[h].key]=h;const k=[],q=new Map,L=new Map;for(h=m;h--;){const u=_(r,a,h),y=n(u);let p=l.get(y);p?i&&p.p(u,e):(p=o(y,u),p.c()),q.set(y,k[h]=p),y in M&&L.set(y,Math.abs(h-M[y]))}const H=new Set,I=new Set;function T(u){Y(u,1),u.m(s,f),l.set(u.key,u),f=u.first,m--}for(;d&&m;){const u=k[m-1],y=t[d-1],p=u.key,v=y.key;u===y?(f=u.first,d--,m--):q.has(v)?!l.has(p)||H.has(p)?T(u):I.has(v)?d--:L.get(p)>L.get(v)?(I.add(p),T(u)):(H.add(v),d--):(c(y,l),d--)}for(;d--;){const u=t[d];q.has(u.key)||c(u,l)}for(;m;)T(k[m-1]);return k}function Vt(t,e){const n={},i={},r={$$scope:1};let a=t.length;for(;a--;){const l=t[a],s=e[a];if(s){for(const c in l)c in s||(i[c]=1);for(const c in s)r[c]||(n[c]=s[c],r[c]=1);t[a]=s}else for(const c in l)r[c]=1}for(const l in i)l in n||(n[l]=void 0);return n}function Xt(t){return typeof t=="object"&&t!==null?t:{}}function Yt(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Zt(t){t&&t.c()}function te(t,e){t&&t.l(e)}function mt(t,e,n,i){const{fragment:r,on_mount:a,on_destroy:l,after_update:s}=t.$$;r&&r.m(e,n),i||P(()=>{const c=a.map(J).filter(K);l?l.push(...c):w(c),t.$$.on_mount=[]}),s.forEach(P)}function yt(t,e){const n=t.$$;n.fragment!==null&&(w(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function pt(t,e){t.$$.dirty[0]===-1&&(x.push(t),V(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ee(t,e,n,i,r,a,l,s=[-1]){const c=$;b(t);const o=t.$$={fragment:null,ctx:null,props:a,update:z,not_equal:r,bound:W(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:W(),dirty:s,skip_bound:!1,root:e.target||c.$$.root};l&&l(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(_,d,...m)=>{const h=m.length?m[0]:d;return o.ctx&&r(o.ctx[_],o.ctx[_]=h)&&(!o.skip_bound&&o.bound[_]&&o.bound[_](h),f&&pt(t,_)),d}):[],o.update(),f=!0,w(o.before_update),o.fragment=i?i(o.ctx):!1,e.target){if(e.hydrate){et();const _=ot(e.target);o.fragment&&o.fragment.l(_),_.forEach(lt)}else o.fragment&&o.fragment.c();e.intro&&Y(t.$$.fragment),mt(t,e.target,e.anchor,e.customElement),nt(),X()}b(c)}class ne{$destroy(){yt(this,1),this.$destroy=z}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!tt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Vt as A,Xt as B,yt as C,Z as D,Gt as E,bt as F,wt as G,kt as H,$t as I,rt as J,xt as K,Nt as L,w as M,Wt as N,Ot as O,vt as P,Ut as Q,Ht as R,ne as S,Rt as T,G as U,Jt as V,Yt as W,Bt as X,Pt as Y,St as Z,Ct as _,ot as a,Mt as b,qt as c,lt as d,st as e,Dt as f,Et as g,ft as h,ee as i,Tt as j,At as k,jt as l,Lt as m,z as n,Kt as o,ht as p,Qt as q,Y as r,gt as s,F as t,It as u,Ft as v,zt as w,Zt as x,te as y,mt as z};