import"./modulepreload-polyfill.b7f2da20.js";import*as a from"https://cdn.skypack.dev/d3@7";let{clientWidth:nt,clientHeight:X}=document.querySelector(".canvas");const n={top:25,right:25,bottom:100,left:100},B=nt-n.left-n.right,_=X-n.top-n.bottom,u=a.scaleTime(),f=a.scaleBand(),ot=a.timeFormat("%Y"),lt=a.timeFormat("%B"),it=a.timeFormat("%b"),y=a.select(".canvas"),w=a.select(".graph");w.append("div").attr("class","tooltip");const h=document.querySelector(".tooltip"),I=[{opacity:1}],j=[{opacity:0}],x={duration:500,fill:"forwards"};w.append("div").attr("class","legend-tooltip");const d=document.querySelector(".legend-tooltip");function v(r){if(isNaN(r)||typeof r!="number")throw`Invalid argument ${r}, typeof ${r}`;return Math.round(r*100)/100}function E(r){console.error("\u274C",r),alert("Something went wrong \u{1F62B} please refresh and try again.")}(async()=>{try{const{baseTemperature:r,monthlyVariance:l}=await a.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"),b=l.length,$=(t,e)=>t.includes(e)?[...t]:[...t,e],K=l.map(t=>t.year).reduce($,[]).length,N=l.map(t=>t.month).reduce($,[]).length,O=Math.ceil(b/K),P=Math.ceil(b/N),L=B/P,V=_/O;l.forEach(t=>{t.year=new Date(t.year,0),t.month--});const[z,M]=a.extent(l,t=>t.year.getFullYear()),G=M-z,J=M-G/2;u.domain(a.extent(l,t=>t.year)),u.range([n.left,n.left+B-L]),f.domain([0,1,2,3,4,5,6,7,8,9,10,11]),f.range([n.top+_,n.top]);const Q=a.axisBottom(u).tickFormat(ot),U=a.axisLeft(f).tickFormat(t=>it(new Date(1970,t))),R=a.scaleLinear(a.extent(l,t=>t.variance),["blue","red"]);y.append("g").attr("class","x-axis").attr("transform",`translate(0, ${n.top+_+5})`).call(Q).append("text").attr("class","axis-title x").text("Year"),y.append("g").attr("class","y-axis").attr("transform",`translate(${n.left-5}, 0)`).call(U).append("text").attr("class","axis-title y").text("Month");let g=!1,H;y.selectAll("rect").data(l).enter().append("rect").attr("x",t=>u(t.year)).attr("y",t=>f(t.month)).attr("width",L).attr("height",V).attr("fill",t=>R(t.variance)).attr("class","monthly-var").on("mouseover",({target:t})=>{try{if(!g){clearTimeout(H);let{variance:e,month:c,year:o}=t.__data__,{x:i,y:s}=t.getBoundingClientRect();o=o.getFullYear(),i+=window.scrollX,s+=window.scrollY;let D=`${lt(new Date(1970,c))} of ${o}.<br><br>Average temperature of ~<strong>${v(r+e)}\xB0C</strong>. ${e===0?"<br>Roughly equal to ":`<br>~<strong>${Math.abs(v(e))}\xB0C</strong> ${e<0?'<span style="color: blue;">colder \u{1F976}</span> than':'<span style="color: red;">hotter \u{1F975}</span> than'}`} 
               the base temperature.`;h.innerHTML=D;const{clientWidth:m,clientHeight:p}=h;h.style.left=`${o<J?i+20:i-m-20}px`,h.style.top=`${c>5?s-30:s-p*2}px`,h.animate(I,x)}}catch(e){E(e)}}).on("mouseout",({toElement:t})=>{t&&!t.classList.contains("monthly-var")&&!g&&(H=setTimeout(()=>{h.animate(j,x)},1e3))}).on("click",t=>{g=!g,document.querySelectorAll(".monthly-var.click-highlight").forEach(e=>e.classList.remove("click-highlight")),g&&t.target.classList.add("click-highlight")});let[S,T]=a.extent(l,t=>t.variance+r);const k=[];for(let t=Math.floor(S);t<Math.ceil(T);t++)k.push({avgTemp:t,range:[t,t+.99]});const C=350,Z=[Math.floor(S),Math.ceil(T)],tt=[n.left,n.left+C],et=Math.ceil(T)-1,F=C/et,A=25,Y=a.scaleLinear(Z,tt),at=a.axisBottom(Y),q=X-35,rt=10-n.left;y.append("g").attr("class","legend-axis").attr("transform",`translate(${rt}, ${q})`).call(at).append("text").attr("class","axis-title legend-title").text("Monthly temperature average (\xB0C)");let W;a.select(".legend-axis").selectAll("rect").data(k).enter().append("rect").attr("class","legend-rect").attr("x",t=>Y(t.avgTemp)).attr("y",-A).attr("width",F).attr("height",A).attr("fill",t=>R(t.avgTemp-r)).on("mouseover",({target:t})=>{clearTimeout(W);let{x:e}=t.getBoundingClientRect(),{avgTemp:c,range:o}=t.__data__;e+=window.scrollX,d.innerHTML=`<strong>${o[0]}\xB0C</strong> - <strong>${o[1]}\xB0C</strong> average temp.`;const{clientWidth:i,clientHeight:s}=d;d.style.left=`${c<8?e:e-i+F}px`,d.style.top=`${q-A-s-3}px`,d.animate(I,x),Array.from(document.querySelectorAll(".monthly-var")).filter(m=>{const p=v(m.__data__.variance+r);return p>=o[0]&&p<=o[1]}).forEach(m=>m.classList.add("highlight"))}).on("mouseout",({toElement:t})=>{Array.from(document.querySelectorAll(".highlight")).forEach(e=>e.classList.remove("highlight")),t&&!t.classList.contains("legend-rect")&&(W=setTimeout(()=>{d.animate(j,x),setTimeout(()=>d.innerHTML="",500)},1e3))}).on("click",({target:t})=>{const e=t,{range:c}=t.__data__;Array.from(document.querySelectorAll(".monthly-var")).filter(i=>{const s=v(i.__data__.variance+r);return s>=c[0]&&s<=c[1]}).forEach(i=>i.classList.toggle("fade")),e.classList.toggle("fade")}),w.append("text").attr("class","footnote").html('*Values rounded to the nearest hundredth. <a target="_blank" href="https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json">Source</a>.')}catch(r){E(r)}})();
