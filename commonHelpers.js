import{a as p,i as l,S as f}from"./assets/vendor-0Fq3u7cb.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const m="45130160-d43b37f420c01d8101f282345",h="https://pixabay.com/api/";async function u(n,s=1){return(await p.get(h,{params:{key:m,q:n,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:s}})).data}function y(n){const s=document.querySelector(".gallery"),o=n.map(t=>`
      
        <a href="${t.largeImageURL}">

        <div class="photo-card">
          <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" />

        <div class="info">
          <p class="info-item">
            Likes <span>${t.likes}</span>
          </p>
          <p class="info-item">
            Views <span>${t.views}</span>
          </p>
          <p class="info-item">
            Comments<span>${t.comments}</span>
          </p>
          <p class="info-item">
            Downloads <span>${t.downloads}</span>
          </p>
        </div>
      </div>
    </a>`).join("");s.insertAdjacentHTML("beforeend",o)}function g(){const n=document.querySelector(".gallery");n.innerHTML=""}document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector(".form"),s=n.querySelector('input[name="query"]'),o=document.querySelector(".loader"),t=document.querySelector(".load");let e=1,r="",a=0,d=null;n.addEventListener("submit",async c=>{if(c.preventDefault(),r=s.value.trim(),e=1,!r){l.error({title:"Error",message:"Please enter a search query!"});return}g(),o.style.display="block",t.style.display="none";try{const i=await u(r,e);o.style.display="none",a=i.totalHits,i.hits.length===0?l.error({title:"Error",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}):(y(i.hits),t.style.display="block",d?d.refresh():d=new f(".gallery a",{}),e*15>=a&&(t.style.display="none",l.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})))}catch{o.style.display="none",l.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{s.value=""}}),t.addEventListener("click",async()=>{e+=1,o.style.display="block";try{const c=await u(r,e);if(o.style.display="none",c.hits.length>0){y(c.hits),d.refresh();const{height:i}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"}),e*15>=a&&(t.style.display="none",l.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}}catch{o.style.display="none",l.error({title:"Error",message:"Something went wrong. Please try again later."})}})});
//# sourceMappingURL=commonHelpers.js.map
