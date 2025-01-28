"use strict";(self.webpackChunkrxdb=self.webpackChunkrxdb||[]).push([[1400],{4228:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>i,toc:()=>m});var n=t(4848),o=t(8453);const s={title:"Lightning-Fast Memory Storage for RxDB",slug:"rx-storage-memory.html",description:"Use Memory RxStorage for a high-performance, JavaScript in-memory database. Built for speed, making it perfect for unit tests and rapid prototyping."},a="Memory RxStorage",i={id:"rx-storage-memory",title:"Lightning-Fast Memory Storage for RxDB",description:"Use Memory RxStorage for a high-performance, JavaScript in-memory database. Built for speed, making it perfect for unit tests and rapid prototyping.",source:"@site/docs/rx-storage-memory.md",sourceDirName:".",slug:"/rx-storage-memory.html",permalink:"/rx-storage-memory.html",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Lightning-Fast Memory Storage for RxDB",slug:"rx-storage-memory.html",description:"Use Memory RxStorage for a high-performance, JavaScript in-memory database. Built for speed, making it perfect for unit tests and rapid prototyping."},sidebar:"tutorialSidebar",previous:{title:"RxDB SQLite RxStorage for Hybrid Apps",permalink:"/rx-storage-sqlite.html"},next:{title:"Lightning-Fast Browser DB - RxDB Dexie RxStorage",permalink:"/rx-storage-dexie.html"}},l={},m=[{value:"Pros",id:"pros",level:3},{value:"Cons",id:"cons",level:3}];function c(e){const r={code:"code",h1:"h1",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{id:"memory-rxstorage",children:"Memory RxStorage"}),"\n",(0,n.jsxs)(r.p,{children:["The Memory ",(0,n.jsx)(r.code,{children:"RxStorage"})," is based on plain in memory arrays and objects. It can be used in all environments and is made for performance.\nUse this storage when you need a really fast database like in your unit tests or when you use RxDB with server side rendering."]}),"\n",(0,n.jsx)(r.h3,{id:"pros",children:"Pros"}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:"Really fast. Uses binary search on all operations."}),"\n",(0,n.jsx)(r.li,{children:"Small build size"}),"\n"]}),"\n",(0,n.jsx)(r.h3,{id:"cons",children:"Cons"}),"\n",(0,n.jsxs)(r.ul,{children:["\n",(0,n.jsx)(r.li,{children:"No persistence"}),"\n"]}),"\n",(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:"language-ts",children:"import {\n    createRxDatabase\n} from 'rxdb';\nimport {\n    getRxStorageMemory\n} from 'rxdb/plugins/storage-memory';\n\nconst db = await createRxDatabase({\n    name: 'exampledb',\n    storage: getRxStorageMemory()\n});\n"})})]})}function d(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},8453:(e,r,t)=>{t.d(r,{R:()=>a,x:()=>i});var n=t(6540);const o={},s=n.createContext(o);function a(e){const r=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function i(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),n.createElement(s.Provider,{value:r},e.children)}}}]);