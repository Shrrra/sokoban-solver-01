import f from"node:fs";
let E=process.env,I=E.MAKEFUN_INPUT_DIR||"/input",O=E.MAKEFUN_OUTPUT_DIR||"/output",w,L,D,R;
function F(p,B,h){let v=Array(L.length).fill(-1),s=[p];v[p]=p;for(let q of s)for(let k=4;k--;){let y=q+D[k];if(L[y]=="#"||B.includes(y)||v[y]>=0||~~(y/w)==h)continue;v[y]=q;s.push(y)}return v}
function S(bs,pl,ot){
let Q=[[bs,pl,""]],V={},h=0;
for(;h<Q.length;h++){
let[b,p,m]=Q[h];
if(b.every(x=>".*+".includes(L[x])))return[m,p,b];
let v=F(p,ot.concat(b),-1);
for(let i in b)for(let k=4;k--;){
let x=b[i],t=x-D[k],e=x+D[k];
if(v[t]<0||L[e]=="#"||b.includes(e))continue;
let n=[...b];n[i]=e;n.sort((a,c)=>a-c);
if(!".*+".includes(L[e])&&[0,-1,-w,-w-1].some(o=>[e+o,e+o+1,e+o+w,e+o+w+1].every(q=>L[q]=="#"||n.includes(q))))continue;
if(V[n+":"+x])continue;V[n+":"+x]=1;
let s="",q=t;while(q!==p)s="udlr"[D.indexOf(q-v[q])]+s,q=v[q];
Q.push([n,x,m+s+"udlr"[k]])}}
return 0}
function s(t){
w=t.indexOf("\n")+1;L=t;D=[-w,w,-1,1];
let B=[],P=0;
for(let i=0;i<L.length;i++){let C=L[i];if(C=="$"||C=="*")B.push(i);if(C=="@"||C=="+")P=i}
R=~~(P/w);
let o="",A=B.slice();
for(;A.length;){let v=F(A[0],[],R);let bs=A.filter(x=>v[x]>=0);A=A.filter(x=>v[x]<0);
B=B.filter(x=>!bs.includes(x));let z=S(bs,P,B);if(!z)return"";o+=z[0];P=z[1];B.push(...z[2])}
return o}
for(let id of f.readdirSync(I)){let m=s(f.readFileSync(I+"/"+id+"/level.txt","utf8"));f.mkdirSync(O+"/"+id,{recursive:!0});f.writeFileSync(O+"/"+id+"/solution.txt",m)}
