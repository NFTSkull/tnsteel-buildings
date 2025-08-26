(()=>{document.addEventListener("DOMContentLoaded",function(){console.log("DOM fully loaded"),F(),X(),$(),V(),W(),G(),H(),D(),U(),_(),setTimeout(()=>{A()},100),Q()});function F(){const t=document.getElementById("header-principal")||document.getElementById("header");let e=0;t&&window.addEventListener("scroll",function(){const n=window.pageYOffset||document.documentElement.scrollTop;n>50?t.classList.add("scrolled"):t.classList.remove("scrolled"),n>e&&n>200?t.style.transform="translateY(-100%)":t.style.transform="translateY(0)",e=n})}function X(){const t=document.querySelector(".mobile-menu-toggle"),e=document.getElementById("mobile-drawer"),n=document.getElementById("mobile-drawer-overlay"),i=document.querySelector(".mobile-drawer-close");if(!t||!e||!n){console.log("Mobile drawer elements not found");return}console.log("Mobile drawer initialized");let a=[],o=null,l=null;const s=()=>{a=e.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'),o=a[0],l=a[a.length-1]},r=f=>{f?(t.setAttribute("aria-expanded","true"),e.setAttribute("aria-hidden","false"),n.setAttribute("aria-hidden","false"),e.classList.add("open"),n.classList.add("open"),document.body.style.overflow="hidden",s(),o&&setTimeout(()=>o.focus(),100),document.addEventListener("keydown",u),n.addEventListener("click",d)):(t.setAttribute("aria-expanded","false"),e.setAttribute("aria-hidden","true"),n.setAttribute("aria-hidden","true"),e.classList.remove("open"),n.classList.remove("open"),document.body.style.overflow="",t.focus(),document.removeEventListener("keydown",u),n.removeEventListener("click",d))},u=f=>{if(f.key==="Escape"){r(!1);return}f.key==="Tab"&&(f.shiftKey?document.activeElement===o&&(f.preventDefault(),l.focus()):document.activeElement===l&&(f.preventDefault(),o.focus()))},d=()=>{r(!1)},m=f=>{const b=f.target.closest("a");b&&b.getAttribute("href")!=="#"&&r(!1)};t.addEventListener("click",()=>{const f=t.getAttribute("aria-expanded")==="true";r(!f)}),i&&i.addEventListener("click",()=>r(!1)),e.addEventListener("click",m),window.addEventListener("resize",()=>{window.innerWidth>=1024&&r(!1)}),window.toggleDrawer=r}function $(){const t=document.getElementById("reviewsSlider"),e=document.querySelectorAll(".review-slide"),n=document.getElementById("prevBtn"),i=document.getElementById("nextBtn"),a=document.querySelectorAll(".dot");if(!t||e.length===0)return;let o=0;const l=e.length;function s(d){e.forEach(m=>m.classList.remove("active")),a.forEach(m=>m.classList.remove("active")),e[d].classList.add("active"),a[d].classList.add("active"),o=d}function r(){const d=(o+1)%l;s(d)}function u(){const d=(o-1+l)%l;s(d)}i&&i.addEventListener("click",r),n&&n.addEventListener("click",u),a.forEach((d,m)=>{d.addEventListener("click",function(){s(m)})}),setInterval(r,5e3),document.addEventListener("keydown",function(d){d.key==="ArrowLeft"&&u(),d.key==="ArrowRight"&&r()})}function V(){const t=document.querySelectorAll(".filter-btn"),e=document.querySelectorAll(".gallery-item");!document.querySelector(".gallery-grid")||t.length===0||(t.forEach(i=>{i.addEventListener("click",function(){const a=this.getAttribute("data-filter");t.forEach(o=>o.classList.remove("active")),this.classList.add("active"),e.forEach(o=>{const l=o.getAttribute("data-category");a==="all"||l===a?(o.style.display="block",setTimeout(()=>{o.style.opacity="1",o.style.transform="scale(1)"},50)):(o.style.opacity="0",o.style.transform="scale(0.8)",setTimeout(()=>{o.style.display="none"},300))})})}),e.forEach(i=>{i.addEventListener("click",function(){const a=this.querySelector("img"),o=this.querySelector(".gallery-overlay");a&&openModal(a.src,o?o.querySelector("h4").textContent:"")})}))}function W(){const t=document.getElementById("galleryModal"),e=document.getElementById("modalImage"),n=document.getElementById("modalCaption"),i=document.getElementById("modalClose");if(!t)return;function a(){t.style.display="none",document.body.style.overflow="auto"}i&&i.addEventListener("click",a),t.addEventListener("click",function(o){o.target===t&&a()}),document.addEventListener("keydown",function(o){o.key==="Escape"&&t.style.display==="block"&&a()}),window.openModal=function(o,l){e&&n&&(e.src=o,n.textContent=l,t.style.display="block",document.body.style.overflow="hidden")}}function G(){const t=document.getElementById("quoteForm");if(!t)return;t.addEventListener("submit",function(n){n.preventDefault();const i=new FormData(t),a={};if(i.forEach((o,l)=>{a[l]=o}),z(a)){const o=t.querySelector('button[type="submit"]'),l=o.textContent;o.textContent="Sending...",o.disabled=!0,setTimeout(()=>{O("Thank you! Your quote request has been submitted. We'll contact you soon.","success"),t.reset(),o.textContent=l,o.disabled=!1},2e3)}}),t.querySelectorAll("input, select, textarea").forEach(n=>{n.addEventListener("blur",function(){q(this)}),n.addEventListener("input",function(){T(this)})})}function z(t){let e=!0;const n=document.getElementById("quoteForm");n.querySelectorAll(".error").forEach(a=>a.remove()),(!t.name||t.name.trim().length<2)&&(S(n.querySelector('[name="name"]'),"Please enter a valid name"),e=!1);const i=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;return(!t.email||!i.test(t.email))&&(S(n.querySelector('[name="email"]'),"Please enter a valid email address"),e=!1),(!t.location||t.location.trim().length<2)&&(S(n.querySelector('[name="location"]'),"Please enter your location"),e=!1),t["building-type"]||(S(n.querySelector('[name="building-type"]'),"Please select a building type"),e=!1),e}function q(t){const e=t.value.trim(),n=t.name;switch(T(t),n){case"name":if(e.length<2)return S(t,"Please enter a valid name"),!1;break;case"email":if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))return S(t,"Please enter a valid email address"),!1;break;case"location":if(e.length<2)return S(t,"Please enter your location"),!1;break;case"building-type":if(!e)return S(t,"Please select a building type"),!1;break}return!0}function S(t,e){T(t);const n=document.createElement("div");n.className="error",n.style.color="#E10600",n.style.fontSize="0.9rem",n.style.marginTop="5px",n.textContent=e,t.parentNode.appendChild(n),t.style.borderColor="#E10600"}function T(t){const e=t.parentNode.querySelector(".error");e&&e.remove(),t.style.borderColor="rgba(255, 255, 255, 0.3)"}function O(t,e="info"){const n=document.createElement("div");n.className=`notification ${e}`,n.textContent=t,n.style.cssText=`
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${e==="success"?"#4CAF50":e==="error"?"#E10600":"#333"};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `,document.body.appendChild(n),setTimeout(()=>{n.style.transform="translateX(0)"},100),setTimeout(()=>{n.style.transform="translateX(100%)",setTimeout(()=>{document.body.removeChild(n)},300)},5e3)}function H(){const t=document.querySelectorAll('img[loading="lazy"]');if("IntersectionObserver"in window){const e=new IntersectionObserver((n,i)=>{n.forEach(a=>{if(a.isIntersecting){const o=a.target;o.classList.add("loaded"),i.unobserve(o)}})});t.forEach(n=>{e.observe(n)})}else t.forEach(e=>{e.classList.add("loaded")})}function D(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(n){n.preventDefault();const i=this.getAttribute("href"),a=document.querySelector(i);if(a){const l=a.offsetTop-110;window.scrollTo({top:l,behavior:"smooth"});const s=document.querySelector(".nav-principal.active"),r=document.querySelector(".mobile-menu-toggle.active");s&&r&&(s.classList.remove("active"),r.classList.remove("active"),r.querySelectorAll("span").forEach(d=>d.classList.remove("active")),document.body.style.overflow="auto")}})})}document.addEventListener("DOMContentLoaded",function(){D()});function U(){const t=document.querySelectorAll(".feature-card, .building-card, .gallery-item, .rto-step");if("IntersectionObserver"in window){const e=new IntersectionObserver(n=>{n.forEach(i=>{i.isIntersecting&&i.target.classList.add("fade-in-up")})},{threshold:.1,rootMargin:"0px 0px -100px 0px"});t.forEach(n=>{e.observe(n)})}}function j(t,e){let n;return function(...a){const o=()=>{clearTimeout(n),t(...a)};clearTimeout(n),n=setTimeout(o,e)}}function K(t,e){let n;return function(){const i=arguments,a=this;n||(t.apply(a,i),n=!0,setTimeout(()=>n=!1,e))}}window.addEventListener("load",function(){console.log("Window fully loaded"),document.body.classList.remove("loading"),Y(),setTimeout(()=>{window.rtoCalculatorInitialized||(console.log("Re-initializing RTO Calculator after window load"),A())},200)});function Y(){console.log("Website fully loaded and initialized")}window.addEventListener("error",function(t){console.error("JavaScript error:",t.error)});function Z(){document.querySelectorAll(".filter-btn, .slider-btn, .dot").forEach(e=>{e.addEventListener("keydown",function(n){(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),this.click())})})}document.addEventListener("DOMContentLoaded",Z);function A(){console.log("=== INITIALIZING RTO CALCULATOR ===");const t={carport:[{size:"12x20",display:"12' x 20' - Single Car",price:1495},{size:"18x20",display:"18' x 20' - 1.5 Car",price:1795},{size:"20x20",display:"20' x 20' - Double Car",price:1995},{size:"24x24",display:"24' x 24' - Large Double",price:2495},{size:"30x20",display:"30' x 20' - Triple Car",price:2995},{size:"36x20",display:"36' x 20' - RV/Boat",price:3495},{size:"40x20",display:"40' x 20' - Commercial",price:3995}],garage:[{size:"12x20",display:"12' x 20' - Single Car",price:2995},{size:"18x20",display:"18' x 20' - 1.5 Car",price:3795},{size:"20x20",display:"20' x 20' - Double Car",price:4295},{size:"24x24",display:"24' x 24' - Large Double",price:5495},{size:"30x20",display:"30' x 20' - Triple Car",price:6495},{size:"36x20",display:"36' x 20' - Workshop",price:7995},{size:"40x20",display:"40' x 20' - Commercial",price:8995}],barn:[{size:"30x40",display:"30' x 40' - Small Barn",price:7995},{size:"36x40",display:"36' x 40' - Medium Barn",price:9495},{size:"40x60",display:"40' x 60' - Large Barn",price:14995},{size:"50x60",display:"50' x 60' - XL Barn",price:18995},{size:"60x80",display:"60' x 80' - Horse Barn",price:28995},{size:"60x100",display:"60' x 100' - Agricultural",price:35995},{size:"80x100",display:"80' x 100' - Commercial",price:47995}],commercial:[{size:"40x60",display:"40' x 60' - Small Commercial",price:19995},{size:"50x80",display:"50' x 80' - Medium Commercial",price:29995},{size:"60x100",display:"60' x 100' - Large Commercial",price:44995},{size:"80x100",display:"80' x 100' - Warehouse",price:59995},{size:"100x120",display:"100' x 120' - Industrial",price:89995},{size:"120x150",display:"120' x 150' - Distribution",price:134995}]},e=document.getElementById("building-type"),n=document.getElementById("building-size"),i=document.getElementById("calculate-btn"),a=document.getElementById("calculator-results");if(console.log("Found elements:",{buildingType:!!e,buildingSize:!!n,calculateBtn:!!i,resultsDiv:!!a}),!e||!n||!i||!a){console.error("Missing required elements!");return}e.onchange=function(){const o=this.value;console.log("Building type selected:",o),n.innerHTML='<option value="">Choose Size</option>',o&&t[o]?(n.disabled=!1,n.style.opacity="1",t[o].forEach(l=>{const s=document.createElement("option");s.value=l.size,s.textContent=l.display,s.dataset.price=l.price,n.appendChild(s)}),console.log("Added",t[o].length,"size options")):(n.disabled=!0,n.style.opacity="0.5",n.innerHTML='<option value="">Select building type first</option>'),a.classList.remove("show")},i.onclick=function(){console.log("=== CALCULATE BUTTON CLICKED ===");const o=e.value,l=n.value,s=document.getElementById("roof-style").value,r=parseInt(document.getElementById("term-length").value),u=parseFloat(document.getElementById("down-payment").value)||0;if(console.log("Form values:",{buildingType:o,buildingSize:l,roofStyle:s,termLength:r,downPayment:u}),!o){alert("Please select a building type");return}if(!l){alert("Please select a building size");return}const d=n.querySelector(`option[value="${l}"]`);if(!d){alert("Invalid building size selected");return}const m=parseFloat(d.dataset.price);if(console.log("Base price:",m),!m||m===0){alert("Please contact us for custom pricing on this size");return}const f=Math.round(m*.2+500),b=s==="vertical"?300:0,p=m+f+b,y=Math.max(0,p-u),x=y*({12:1.35,24:1.55,36:1.75,48:1.95,60:2.15}[r]||1.75),L=x/r;document.getElementById("base-cost").textContent=`$${m.toLocaleString()}`,document.getElementById("delivery-cost").textContent=`$${f.toLocaleString()}`,document.getElementById("roof-cost").textContent=`$${b.toLocaleString()}`,document.getElementById("down-payment-display").textContent=`$${u.toLocaleString()}`,document.getElementById("total-financed").textContent=`$${Math.round(y).toLocaleString()}`,document.getElementById("monthly-payment").textContent=`$${Math.round(L).toLocaleString()}`,document.getElementById("total-payments").textContent=`$${Math.round(x).toLocaleString()}`,a.classList.add("show"),setTimeout(()=>{a.scrollIntoView({behavior:"smooth",block:"start"})},300),console.log("Results displayed successfully")},console.log("RTO Calculator initialized successfully"),window.testRTOCalculator=function(){console.log("=== TESTING RTO CALCULATOR ==="),console.log("Building type element:",document.getElementById("building-type")),console.log("Building size element:",document.getElementById("building-size")),console.log("Calculate button:",document.getElementById("calculate-btn")),console.log("Results div:",document.getElementById("calculator-results"));const o=document.getElementById("building-type");o&&(o.value="garage",o.onchange())}}typeof module!="undefined"&&module.exports&&(module.exports={validateForm:z,validateField:q,showNotification:O,debounce:j,throttle:K,initializeRTOCalculator:A});function J(){const t=document.getElementById("heroVideo");if(t){const e=()=>{t.play().catch(n=>{console.log("Video autoplay failed:",n),document.addEventListener("touchstart",()=>{t.play().catch(i=>console.log("Video play failed:",i))},{once:!0})})};e(),window.addEventListener("load",e),document.addEventListener("touchstart",e,{once:!0}),document.addEventListener("click",e,{once:!0}),t.muted=!0,t.loop=!0,t.playsInline=!0}}J();function R(){document.querySelectorAll(".carousel-container").forEach((e,n)=>{const i=e.querySelector(".carousel-track"),a=e.querySelectorAll(".carousel-slide"),o=e.querySelector('.carousel-btn[data-direction="prev"]'),l=e.querySelector('.carousel-btn[data-direction="next"]'),s=e.querySelectorAll(".carousel-indicator");let r=0;const u=a.length;s.length>0&&s[0].classList.add("active");function d(){const v=-r*100;i.style.transform=`translateX(${v}%)`,s.forEach((w,E)=>{w.classList.toggle("active",E===r)}),o&&(o.disabled=r===0),l&&(l.disabled=r===u-1)}function m(c){r=Math.max(0,Math.min(c,u-1)),d()}function f(){r<u-1&&(r++,d())}function b(){r>0&&(r--,d())}o&&o.addEventListener("click",b),l&&l.addEventListener("click",f),s.forEach((c,v)=>{c.addEventListener("click",()=>m(v))});let p;function y(){p=setInterval(()=>{r<u-1?f():m(0)},5e3)}function h(){p&&clearInterval(p)}y(),e.addEventListener("mouseenter",h),e.addEventListener("mouseleave",y);let x=0,L=0;e.addEventListener("touchstart",c=>{x=c.touches[0].clientX,h()}),e.addEventListener("touchend",c=>{L=c.changedTouches[0].clientX;const v=x-L;Math.abs(v)>50&&(v>0?f():b()),y()}),e.addEventListener("keydown",c=>{c.key==="ArrowLeft"?b():c.key==="ArrowRight"&&f()}),d()})}document.addEventListener("DOMContentLoaded",()=>{R()});typeof window!="undefined"&&(window.initializeProductCarousels=R);function P(){const t=document.querySelector(".gallery-carousel-container"),e=document.getElementById("galleryModal"),n=document.getElementById("galleryModalImage"),i=document.getElementById("galleryModalClose");if(!t)return;const a=t.querySelector(".gallery-carousel-track"),o=t.querySelectorAll(".gallery-carousel-slide"),l=t.querySelector('.gallery-carousel-btn[data-direction="prev"]'),s=t.querySelector('.gallery-carousel-btn[data-direction="next"]'),r=t.querySelectorAll(".gallery-carousel-indicator");let u=0;const d=o.length;r.length>0&&r[0].classList.add("active");function m(){const k=-u*100;a.style.transform=`translateX(${k}%)`,r.forEach((I,N)=>{I.classList.toggle("active",N===u)}),l&&(l.disabled=u===0),s&&(s.disabled=u===d-1)}function f(g){u=Math.max(0,Math.min(g,d-1)),m()}function b(){u<d-1&&(u++,m())}function p(){u>0&&(u--,m())}l&&l.addEventListener("click",p),s&&s.addEventListener("click",b),r.forEach((g,k)=>{g.addEventListener("click",()=>f(k))}),o.forEach((g,k)=>{g.addEventListener("click",()=>{const I=g.querySelector(".gallery-carousel-image");I&&(n.src=I.src,n.alt=I.alt,e.classList.add("active"),document.body.style.overflow="hidden")})});function y(){e.classList.remove("active"),document.body.style.overflow=""}i&&i.addEventListener("click",y),e.addEventListener("click",g=>{g.target===e&&y()});const h=e.querySelector('.gallery-modal-btn[data-direction="prev"]'),x=e.querySelector('.gallery-modal-btn[data-direction="next"]');function L(){const g=o[u].querySelector(".gallery-carousel-image");g&&(n.src=g.src,n.alt=g.alt)}h&&h.addEventListener("click",()=>{p(),L()}),x&&x.addEventListener("click",()=>{b(),L()}),document.addEventListener("keydown",g=>{e.classList.contains("active")&&(g.key==="Escape"?y():g.key==="ArrowLeft"?(p(),L()):g.key==="ArrowRight"&&(b(),L()))});let c;function v(){c&&clearInterval(c),c=setInterval(()=>{u<d-1?b():f(0)},4e3),console.log("Gallery auto-play started - changing slides every 4 seconds")}function w(){c&&clearInterval(c)}v(),setTimeout(()=>{v()},1e3),t.addEventListener("mouseenter",w),t.addEventListener("mouseleave",v);let E=0,C=0;t.addEventListener("touchstart",g=>{E=g.touches[0].clientX,w()}),t.addEventListener("touchend",g=>{C=g.changedTouches[0].clientX;const k=E-C;Math.abs(k)>50&&(k>0?b():p()),v()}),m()}document.addEventListener("DOMContentLoaded",()=>{P()});typeof window!="undefined"&&(window.initializeGalleryCarousel=P);function Q(){const t=document.querySelector(".product-showcase .carousel-container");if(!t)return;const e=t.querySelector(".carousel-track"),n=e.querySelectorAll(".carousel-slide"),i=t.querySelectorAll(".carousel-indicator"),a=t.querySelector('[data-direction="prev"]'),o=t.querySelector('[data-direction="next"]');let l=0,s=!1;function r(){if(s)return;const p=-l*100;e.style.transform=`translateX(${p}%)`,i.forEach((y,h)=>{y.classList.toggle("active",h===l)}),a&&(a.disabled=l===0),o&&(o.disabled=l===n.length-1)}function u(p){p<0||p>=n.length||s||(s=!0,l=p,r(),setTimeout(()=>{s=!1},300))}function d(){u(l+1)}function m(){u(l-1)}a&&a.addEventListener("click",m),o&&o.addEventListener("click",d),i.forEach((p,y)=>{p.addEventListener("click",()=>u(y))}),document.addEventListener("keydown",p=>{p.key==="ArrowLeft"?m():p.key==="ArrowRight"&&d()});let f=0,b=0;e.addEventListener("touchstart",p=>{f=p.touches[0].clientX}),e.addEventListener("touchend",p=>{b=p.changedTouches[0].clientX;const y=f-b;Math.abs(y)>50&&(y>0?d():m())}),r()}function _(){document.body.insertAdjacentHTML("beforeend",`
        <div id="lightbox-overlay" class="lightbox-overlay" role="dialog" aria-modal="true" aria-label="Image viewer">
            <button class="lightbox-close" aria-label="Close image viewer">&times;</button>
            <button class="lightbox-prev" aria-label="Previous image">\u2039</button>
            <button class="lightbox-next" aria-label="Next image">\u203A</button>
            <div class="lightbox-content">
                <img class="lightbox-image" alt="">
                <div class="lightbox-counter"></div>
            </div>
        </div>
    `);const e=document.getElementById("lightbox-overlay"),n=e.querySelector(".lightbox-image"),i=e.querySelector(".lightbox-counter"),a=e.querySelector(".lightbox-close"),o=e.querySelector(".lightbox-prev"),l=e.querySelector(".lightbox-next");let s=[],r=0,u=0,d=0,m=null;const f=[".gallery img",".grid img","figure img",".building-style-card img",".style-image",".gallery-item img",".product-image img",".benefits-image img",".work-with-us-image img"];document.querySelectorAll(f.join(", ")).forEach((c,v)=>{c.style.cursor="pointer",c.setAttribute("tabindex","0"),c.setAttribute("role","button"),c.setAttribute("aria-label","Open image in viewer");const w=E=>{E.preventDefault(),E.stopPropagation(),m=c;const C=c.closest(".gallery, .grid, .building-styles-grid, section");C?s=Array.from(C.querySelectorAll("img")):s=[c],r=s.indexOf(c),r===-1&&(r=0),p(),e.classList.add("active"),document.body.style.overflow="hidden",setTimeout(()=>a.focus(),100)};c.addEventListener("click",w),c.addEventListener("keydown",E=>{(E.key==="Enter"||E.key===" ")&&(E.preventDefault(),w(E))})});function p(){if(s.length===0)return;const c=s[r],v=c.dataset.full||c.src;n.src=v,n.alt=c.alt||"Gallery image",s.length>1?(i.textContent=`${r+1} / ${s.length}`,i.style.display="block",o.style.display="block",l.style.display="block"):(i.style.display="none",o.style.display="none",l.style.display="none"),o.disabled=r===0,l.disabled=r===s.length-1}function y(){r<s.length-1&&(r++,p())}function h(){r>0&&(r--,p())}function x(){e.classList.remove("active"),document.body.style.overflow="",m&&(m.focus(),m=null)}a.addEventListener("click",x),o.addEventListener("click",h),l.addEventListener("click",y),e.addEventListener("click",c=>{(c.target===e||c.target===e.querySelector(".lightbox-content"))&&x()}),document.addEventListener("keydown",c=>{if(e.classList.contains("active"))switch(c.key){case"Escape":x();break;case"ArrowLeft":h();break;case"ArrowRight":y();break}}),e.addEventListener("touchstart",c=>{u=c.changedTouches[0].screenX}),e.addEventListener("touchend",c=>{d=c.changedTouches[0].screenX,L()});function L(){const v=u-d;Math.abs(v)>50&&(v>0?y():h())}}function B(){const t=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768,e=window.innerWidth>768;if(console.log("\u{1F4F1} Mobile detected:",t),console.log("\u{1F4BB} Desktop detected:",e),console.log("\u{1F4CF} Screen width:",window.innerWidth),e){document.querySelectorAll(".mobile-menu-toggle, .FORCED-MOBILE-BTN").forEach(i=>{i.style.display="none !important",i.style.visibility="hidden !important",i.style.opacity="0 !important"}),console.log("\u{1F4BB} DESKTOP: Botones m\xF3viles ocultados");return}if(t){console.log("\u{1F525} FORZANDO MEN\xDA M\xD3VIL...");const n=document.querySelector(".site-header .mainbar-inner")||document.querySelector(".mainbar-inner")||document.querySelector(".site-header");if(!n){console.log("\u274C No se encontr\xF3 header");return}let i=n.querySelector(".mobile-menu-toggle");if(i)console.log("\u{1F50D} Bot\xF3n existente encontrado, forzando visibilidad..."),i.style.cssText=`
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: relative !important;
                z-index: 99999 !important;
                width: 50px !important;
                height: 50px !important;
                background: #f8f9fa !important;
                border: 2px solid #333 !important;
                border-radius: 8px !important;
                margin-left: auto !important;
                flex-direction: column !important;
                justify-content: center !important;
                align-items: center !important;
                cursor: pointer !important;
            `,i.querySelectorAll(".hamburger-line, span").forEach((l,s)=>{l.style.cssText=`
                    display: block !important;
                    width: 20px !important;
                    height: 3px !important;
                    background: #333 !important;
                    margin: 2px 0 !important;
                    border-radius: 1px !important;
                `});else{console.log("\u2795 Creando bot\xF3n hamburguesa desde cero...");const o=document.createElement("button");o.className="mobile-menu-toggle FORCED-MOBILE-BTN",o.setAttribute("aria-label","Open menu"),o.setAttribute("aria-expanded","false"),o.setAttribute("aria-controls","mobile-drawer"),o.style.cssText=`
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: relative !important;
                z-index: 99999 !important;
                width: 45px !important;
                height: 45px !important;
                background: #ffffff !important;
                border: 2px solid #333333 !important;
                border-radius: 8px !important;
                margin-left: auto !important;
                flex-direction: column !important;
                justify-content: center !important;
                align-items: center !important;
                cursor: pointer !important;
                order: 999 !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
            `;for(let l=0;l<3;l++){const s=document.createElement("span");s.className="hamburger-line",s.style.cssText=`
                    display: block !important;
                    width: 22px !important;
                    height: 2px !important;
                    background: #333333 !important;
                    margin: 2.5px 0 !important;
                    border-radius: 1px !important;
                    transition: all 0.3s ease !important;
                `,o.appendChild(s)}n.appendChild(o),console.log("\u2705 Bot\xF3n hamburguesa creado y agregado!")}document.querySelectorAll(".desktop-nav, .desktop-actions").forEach(o=>{o.style.display="none !important"}),n.style&&(n.style.display="flex !important",n.style.justifyContent="space-between !important",n.style.alignItems="center !important"),console.log("\u2705 MEN\xDA M\xD3VIL ACTIVADO CORRECTAMENTE")}}document.addEventListener("DOMContentLoaded",function(){B()});window.addEventListener("resize",function(){B()});setTimeout(B,100);setTimeout(B,500);setTimeout(B,1e3);function M(){const t=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768;console.log("\u{1F489} Verificando necesidad de CSS m\xF3vil...",{isMobile:t,width:window.innerWidth});let e=document.getElementById("forced-mobile-css");e||(e=document.createElement("style"),e.id="forced-mobile-css",document.head.appendChild(e)),e.textContent=`
        /* DESKTOP: ASEGURAR que hamburguesa est\xE9 OCULTA */
        @media screen and (min-width: 769px) {
            .mobile-menu-toggle,
            .FORCED-MOBILE-BTN,
            button.mobile-menu-toggle {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }
        }
        
        /* M\xD3VIL: Mostrar hamburguesa solo en pantallas peque\xF1as */
        @media screen and (max-width: 768px) {
            /* FORZAR BOT\xD3N HAMBURGUESA - Solo en m\xF3vil */
            .mobile-menu-toggle,
            .FORCED-MOBILE-BTN,
            button.mobile-menu-toggle {
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
                pointer-events: auto !important;
                position: relative !important;
                z-index: 999999 !important;
                width: 44px !important;
                height: 44px !important;
                background: #ffffff !important;
                border: 2px solid #333333 !important;
                border-radius: 8px !important;
                margin-left: auto !important;
                margin-right: 15px !important;
                flex-direction: column !important;
                justify-content: center !important;
                align-items: center !important;
                cursor: pointer !important;
                order: 999 !important;
                flex-shrink: 0 !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
            }
            
            /* L\xCDNEAS DEL HAMBURGUESA */
            .mobile-menu-toggle .hamburger-line,
            .mobile-menu-toggle span,
            .FORCED-MOBILE-BTN .hamburger-line {
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                width: 20px !important;
                height: 2px !important;
                background: #333333 !important;
                margin: 2.5px 0 !important;
                border-radius: 1px !important;
                transition: all 0.3s ease !important;
            }
            
            /* OCULTAR DESKTOP NAV EN M\xD3VIL */
            .desktop-nav,
            .desktop-actions,
            .main-nav.desktop-nav,
            .cta-group.desktop-actions {
                display: none !important;
                visibility: hidden !important;
            }
            
            /* HEADER FLEX EN M\xD3VIL */
            .mainbar-inner {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                gap: 15px !important;
                padding: 12px 20px !important;
            }
            
            /* LOGO VISIBLE EN M\xD3VIL */
            .logo-box {
                display: flex !important;
                align-items: center !important;
            }
        }
    `,console.log("\u2705 CSS m\xF3vil mejorado inyectado!")}document.addEventListener("DOMContentLoaded",M);setTimeout(M,50);setTimeout(M,200);})();
