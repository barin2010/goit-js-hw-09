const e=document.querySelector(".form"),t=document.createElement("div");function o(e,t){var s,l;(s=e,l=t,new Promise(((e,t)=>{const o=Math.random()>.3;setTimeout((()=>{o?e({position:s,delay:l}):t({position:s,delay:l})}),l)}))).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`),i(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`),i(`❌ Rejected promise ${e} in ${t}ms`)})).finally((()=>{const e=n.shift();if(e){const{position:t,delay:n}=e;o(t,n)}}))}document.body.appendChild(t),e.addEventListener("submit",(function(e){e.preventDefault();const t=new FormData(e.target),i=Number(t.get("delay")),s=Number(t.get("step")),l=Number(t.get("amount"));n=[];for(let e=0;e<l;e++){const t=e+1,o=i+s*e;n.push({position:t,delay:o})}if(n.length>0){const{position:e,delay:t}=n.shift();o(e,t)}}));let n=[];function i(e){const o=document.createElement("div");o.textContent=e,t.appendChild(o)}
//# sourceMappingURL=03-promises.c2b4fbb6.js.map