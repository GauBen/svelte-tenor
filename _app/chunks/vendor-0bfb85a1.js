function x(){}function tt(t,e){for(const n in e)t[n]=e[n];return t}function K(t){return t()}function G(){return Object.create(null)}function E(t){t.forEach(K)}function Q(t){return typeof t=="function"}function et(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let A;function xt(t,e){return A||(A=document.createElement("a")),A.href=e,t===A.href}function nt(t){return Object.keys(t).length===0}function $t(t,e,n,i){if(t){const r=R(t,e,n,i);return t[0](r)}}function R(t,e,n,i){return t[1]&&i?tt(n.ctx.slice(),t[1](i(e))):n.ctx}function wt(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],s=Math.max(e.dirty.length,r.length);for(let l=0;l<s;l+=1)u[l]=e.dirty[l]|r[l];return u}return e.dirty|r}return e.dirty}function kt(t,e,n,i,r,u){if(r){const s=R(e,n,i,u);t.p(s,r)}}function Et(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function vt(t){return t&&Q(t.destroy)?t.destroy:x}let M=!1;function it(){M=!0}function ct(){M=!1}function rt(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function st(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let o=0;o<e.length;o++){const f=e[o];f.claim_order!==void 0&&c.push(f)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let c=0;c<e.length;c++){const o=e[c].claim_order,f=(r>0&&e[n[r]].claim_order<=o?r+1:rt(1,r,d=>e[n[d]].claim_order,o))-1;i[c]=n[f]+1;const _=f+1;n[_]=c,r=Math.max(_,r)}const u=[],s=[];let l=e.length-1;for(let c=n[r]+1;c!=0;c=i[c-1]){for(u.push(e[c-1]);l>=c;l--)s.push(e[l]);l--}for(;l>=0;l--)s.push(e[l]);u.reverse(),s.sort((c,o)=>c.claim_order-o.claim_order);for(let c=0,o=0;c<s.length;c++){for(;o<u.length&&s[c].claim_order>=u[o].claim_order;)o++;const f=o<u.length?u[o]:null;t.insertBefore(s[c],f)}}function lt(t,e){if(M){for(st(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentElement!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function St(t,e,n){M&&!n?lt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function ot(t){t.parentNode.removeChild(t)}function At(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function ut(t){return document.createElement(t)}function H(t){return document.createTextNode(t)}function jt(){return H(" ")}function Nt(){return H("")}function Ct(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Mt(t){return function(e){return e.preventDefault(),t.call(this,e)}}function qt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function at(t){return Array.from(t.childNodes)}function ft(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function U(t,e,n,i,r=!1){ft(t);const u=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const l=t[s];if(e(l)){const c=n(l);return c===void 0?t.splice(s,1):t[s]=c,r||(t.claim_info.last_index=s),l}}for(let s=t.claim_info.last_index-1;s>=0;s--){const l=t[s];if(e(l)){const c=n(l);return c===void 0?t.splice(s,1):t[s]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,l}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function dt(t,e,n,i){return U(t,r=>r.nodeName===e,r=>{const u=[];for(let s=0;s<r.attributes.length;s++){const l=r.attributes[s];n[l.name]||u.push(l.name)}u.forEach(s=>r.removeAttribute(s))},()=>i(e))}function Lt(t,e,n){return dt(t,e,n,ut)}function _t(t,e){return U(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>H(e),!0)}function Tt(t){return _t(t," ")}function zt(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function Bt(t,e){t.value=e==null?"":e}function Dt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Ot(t,e,n){t.classList[n?"add":"remove"](e)}function ht(t,e,n=!1){const i=document.createEvent("CustomEvent");return i.initCustomEvent(t,n,!1,e),i}function Pt(t,e=document.body){return Array.from(e.querySelectorAll(t))}let k;function w(t){k=t}function q(){if(!k)throw new Error("Function called outside component initialization");return k}function Ft(t){q().$$.on_mount.push(t)}function Ht(t){q().$$.after_update.push(t)}function It(){const t=q();return(e,n)=>{const i=t.$$.callbacks[e];if(i){const r=ht(e,n);i.slice().forEach(u=>{u.call(t,r)})}}}function Wt(t,e){q().$$.context.set(t,e)}function Gt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const $=[],J=[],N=[],O=[],V=Promise.resolve();let P=!1;function X(){P||(P=!0,V.then(Y))}function Jt(){return X(),V}function F(t){N.push(t)}function Kt(t){O.push(t)}const D=new Set;let j=0;function Y(){const t=k;do{for(;j<$.length;){const e=$[j];j++,w(e),mt(e.$$)}for(w(null),$.length=0,j=0;J.length;)J.pop()();for(let e=0;e<N.length;e+=1){const n=N[e];D.has(n)||(D.add(n),n())}N.length=0}while($.length);for(;O.length;)O.pop()();P=!1,D.clear(),w(t)}function mt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(F)}}const C=new Set;let g;function Qt(){g={r:0,c:[],p:g}}function Rt(){g.r||E(g.c),g=g.p}function Z(t,e){t&&t.i&&(C.delete(t),t.i(e))}function yt(t,e,n,i){if(t&&t.o){if(C.has(t))return;C.add(t),g.c.push(()=>{C.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}}function Ut(t,e){yt(t,1,1,()=>{e.delete(t.key)})}function Vt(t,e,n,i,r,u,s,l,c,o,f,_){let d=t.length,m=u.length,h=d;const L={};for(;h--;)L[t[h].key]=h;const v=[],T=new Map,z=new Map;for(h=m;h--;){const a=_(r,u,h),y=n(a);let p=s.get(y);p?i&&p.p(a,e):(p=o(y,a),p.c()),T.set(y,v[h]=p),y in L&&z.set(y,Math.abs(h-L[y]))}const I=new Set,W=new Set;function B(a){Z(a,1),a.m(l,f),s.set(a.key,a),f=a.first,m--}for(;d&&m;){const a=v[m-1],y=t[d-1],p=a.key,S=y.key;a===y?(f=a.first,d--,m--):T.has(S)?!s.has(p)||I.has(p)?B(a):W.has(S)?d--:z.get(p)>z.get(S)?(W.add(p),B(a)):(I.add(S),d--):(c(y,s),d--)}for(;d--;){const a=t[d];T.has(a.key)||c(a,s)}for(;m;)B(v[m-1]);return v}function Xt(t,e){const n={},i={},r={$$scope:1};let u=t.length;for(;u--;){const s=t[u],l=e[u];if(l){for(const c in s)c in l||(i[c]=1);for(const c in l)r[c]||(n[c]=l[c],r[c]=1);t[u]=l}else for(const c in s)r[c]=1}for(const s in i)s in n||(n[s]=void 0);return n}function Yt(t){return typeof t=="object"&&t!==null?t:{}}function Zt(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function te(t){t&&t.c()}function ee(t,e){t&&t.l(e)}function pt(t,e,n,i){const{fragment:r,on_mount:u,on_destroy:s,after_update:l}=t.$$;r&&r.m(e,n),i||F(()=>{const c=u.map(K).filter(Q);s?s.push(...c):E(c),t.$$.on_mount=[]}),l.forEach(F)}function gt(t,e){const n=t.$$;n.fragment!==null&&(E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function bt(t,e){t.$$.dirty[0]===-1&&($.push(t),X(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ne(t,e,n,i,r,u,s,l=[-1]){const c=k;w(t);const o=t.$$={fragment:null,ctx:null,props:u,update:x,not_equal:r,bound:G(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:G(),dirty:l,skip_bound:!1,root:e.target||c.$$.root};s&&s(o.root);let f=!1;if(o.ctx=n?n(t,e.props||{},(_,d,...m)=>{const h=m.length?m[0]:d;return o.ctx&&r(o.ctx[_],o.ctx[_]=h)&&(!o.skip_bound&&o.bound[_]&&o.bound[_](h),f&&bt(t,_)),d}):[],o.update(),f=!0,E(o.before_update),o.fragment=i?i(o.ctx):!1,e.target){if(e.hydrate){it();const _=at(e.target);o.fragment&&o.fragment.l(_),_.forEach(ot)}else o.fragment&&o.fragment.c();e.intro&&Z(t.$$.fragment),pt(t,e.target,e.anchor,e.customElement),ct(),Y()}w(c)}class ie{$destroy(){gt(this,1),this.$destroy=x}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!nt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const b=[];function ce(t,e=x){let n;const i=new Set;function r(l){if(et(t,l)&&(t=l,n)){const c=!b.length;for(const o of i)o[1](),b.push(o,t);if(c){for(let o=0;o<b.length;o+=2)b[o][0](b[o+1]);b.length=0}}}function u(l){r(l(t))}function s(l,c=x){const o=[l,c];return i.add(o),i.size===1&&(n=e(r)||x),l(t),()=>{i.delete(o),i.size===0&&(n(),n=null)}}return{set:r,update:u,subscribe:s}}export{Mt as $,Yt as A,gt as B,tt as C,ce as D,Jt as E,$t as F,kt as G,Et as H,wt as I,lt as J,x as K,xt as L,Ct as M,E as N,Gt as O,Ot as P,vt as Q,Vt as R,ie as S,It as T,Ut as U,J as V,Zt as W,Bt as X,Kt as Y,Pt as Z,At as _,at as a,qt as b,Lt as c,ot as d,ut as e,Dt as f,St as g,_t as h,ne as i,zt as j,jt as k,Nt as l,Tt as m,Qt as n,yt as o,Rt as p,Z as q,Wt as r,et as s,H as t,Ht as u,Ft as v,te as w,ee as x,pt as y,Xt as z};