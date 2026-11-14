(() => {
'use strict';
const hungerUrl='https://hungerstation.com/sa-ar/restaurants/regions/الرياض/الروضة/لحمة-عوافي-54059';
const currencyIcon='<img class="currency-icon" src="رمز-الريال-متجاوب.svg" alt="ريال سعودي">';
const products=[
{id:'chicken-sandwich',name:'عوافي دجاج بالصمون العراقي',english:'Awafi Chicken Iraqi Samoon',price:14,category:'main',image:'دجاج-عوافي.webp'},
{id:'chicken-sajiya-small',name:'صاجية دجاج - صغير',english:'Chicken Sajiya · Small',price:12,calories:183,category:'main',image:'صاجية عوافي دجاج صغير - Awafi small chicken sajiya.webp'},
{id:'chicken-sajiya-large',name:'صاجية دجاج - كبير',english:'Chicken Sajiya · Large',price:18,calories:792,category:'main',image:'صاجية عوافي دجاج كبير - Awafi Big chicken sajiya.webp'},
{id:'hashi-sajiya-small',name:'صاجية حاشي - صغير',english:'Hashi Sajiya · Small',price:14,calories:300,category:'main',image:'صاجية عوافي حاشي صغير - Sajiya Awafi, small Hashi.webp'},
{id:'hashi-sajiya-large',name:'صاجية حاشي - كبير',english:'Hashi Sajiya · Large',price:28,calories:792,category:'main',image:'صاجية عوافي حاشي كبير - Sajiya Awafi, Big Hashi.webp'},
{id:'arabic-shawarma-box',name:'بوكس الشاورما العربي المتنوع',english:'Mixed Arabic Shawarma Box',price:98,category:'main'},
{id:'gathering-box',name:'بوكس الجمعات شاورما حاشي ودجاج',english:'Hashi & Chicken Gathering Box',price:98,category:'main'},
{id:'sambosa-box',name:'بوكس سنموسه متنوع شاورما حاشي وعجل ودجاج',english:'Mixed Shawarma Sambosa Box',price:36,category:'main'},
{id:'awafi-hashi',name:'عوافي حاشي',english:'Awafi Hashi',price:19,category:'main',image:'حاشي-عوافي.webp'},
{id:'chicken-cake',name:'كعكة دجاج',english:'Chicken Cake',price:18,category:'main'},
{id:'hashi-cake',name:'كعكة حاشي',english:'Hashi Cake',price:22,category:'main'},
{id:'chicken-plate',name:'طبق دجاج',english:'Chicken Plate',price:44,category:'main'},
{id:'hashi-plate',name:'طبق حاشي',english:'Hashi Plate',price:65,category:'main'},
{id:'arabic-hashi',name:'عربي حاشي',english:'Arabic Hashi',price:48,category:'main'},
{id:'arabic-chicken',name:'عربي دجاج',english:'Arabic Chicken',price:33,category:'main'},
{id:'baby-mix',name:'بيبي شاورما مشكل',english:'Mixed Baby Shawarma',price:44,category:'main'},
{id:'special-hashi-cake',name:'كعكة خاصة حاشي',english:'Special Hashi Cake',price:46,category:'main'},
{id:'special-chicken-cake',name:'كعكة خاصة دجاج',english:'Special Chicken Cake',price:42,category:'main'},
{id:'hashi-hummus',name:'حمص حاشي',english:'Hashi Hummus',price:22,category:'sides'},
{id:'chicken-hummus',name:'حمص دجاج',english:'Chicken Hummus',price:20,category:'sides'},
{id:'plain-hummus',name:'حمص سادة',english:'Plain Hummus',price:15,category:'sides'},
{id:'shawarma-sambosa',name:'سنبوسه شاورما حاشي ودجاج',english:'Hashi & Chicken Shawarma Sambosa',price:5,calories:10,category:'sides'},
{id:'caramel-cream',name:'كريمة كراميل اللذيذة',english:'Delicious Creme Caramel',price:12,category:'sides'},
{id:'blonde-chili',name:'شطة شقراء',english:'Blonde Chili Sauce',price:6,category:'sauces'},
{id:'tahini',name:'طحينة',english:'Tahini',price:5,calories:90,category:'sauces'},
{id:'cocktail-juice',name:'عصير كوكتيل',english:'Cocktail Juice',price:15,category:'drinks'},
{id:'pomegranate-juice',name:'عصير رمان',english:'Pomegranate Juice',price:15,category:'drinks'},
{id:'cola',name:'كولا',english:'Cola',price:5,calories:133,category:'drinks'},
{id:'sprite',name:'سبرايت',english:'Sprite',price:5,calories:190,category:'drinks'},
{id:'water',name:'ماء',english:'Water',price:2,calories:1,category:'drinks'}
];
const money=value=>new Intl.NumberFormat('ar-SA',{maximumFractionDigits:0}).format(value);
const safeText=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const imageMarkup=product=>product.image?'<img src="'+encodeURI(product.image)+'" alt="'+safeText(product.name)+'" loading="lazy">':'<div class="product-placeholder" aria-hidden="true"><i class="fa-solid fa-utensils"></i><span>لحمة عوافي</span></div>';
const grid=document.getElementById('menu-grid'),empty=document.getElementById('menu-empty'),search=document.getElementById('menu-search');
if(!grid||!empty||!search)return;
let activeFilter='all',toastTimer=0,lastFocusedElement=null;
const cart=Object.create(null);
function renderMenu(){
const query=search.value.trim().toLocaleLowerCase('ar');
const shown=products.filter(p=>(activeFilter==='all'||p.category===activeFilter)&&(p.name.toLocaleLowerCase('ar').includes(query)||p.english.toLowerCase().includes(query)));
grid.innerHTML=shown.map((p,i)=>'<article class="menu-card reveal visible"><div class="menu-card-image">'+imageMarkup(p)+'<span class="menu-number">'+String(i+1).padStart(2,'0')+' / '+String(shown.length).padStart(2,'0')+'</span></div><div class="menu-card-body"><div class="menu-card-title-row"><div><h3>'+safeText(p.name)+'</h3><p class="english-name">'+safeText(p.english)+'</p>'+(p.calories?'<p class="product-calories">'+p.calories+' سعرة حرارية</p>':'')+'</div></div><div class="menu-card-bottom"><span class="price"><span>'+money(p.price)+'</span>'+currencyIcon+'</span><button class="add-to-cart" type="button" data-add="'+p.id+'" aria-label="أضف '+safeText(p.name)+' إلى السلة"><i class="fa-solid fa-plus"></i></button></div></div></article>').join('');
grid.querySelectorAll('.menu-card-image img').forEach(img=>img.addEventListener('error',()=>{const f=document.createElement('div');f.className='product-placeholder';f.setAttribute('aria-hidden','true');f.innerHTML='<i class="fa-solid fa-utensils"></i><span>لحمة عوافي</span>';img.replaceWith(f);},{once:true}));
empty.hidden=shown.length!==0;grid.hidden=shown.length===0;
}
function showToast(message){const toast=document.getElementById('toast');if(!toast)return;toast.textContent=message;toast.classList.add('show');window.clearTimeout(toastTimer);toastTimer=window.setTimeout(()=>toast.classList.remove('show'),2200);}
function cartQuantity(){return Object.values(cart).reduce((sum,item)=>sum+item.qty,0);}
function updateCart(){
const count=cartQuantity();document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=money(count));
const entries=Object.values(cart),total=entries.reduce((sum,item)=>sum+item.product.price*item.qty,0);
const cartEmpty=document.getElementById('cart-empty'),cartFooter=document.getElementById('cart-footer'),cartTotal=document.getElementById('cart-total'),cartItems=document.getElementById('cart-items');
if(cartEmpty)cartEmpty.hidden=entries.length>0;if(cartFooter)cartFooter.hidden=entries.length===0;if(cartTotal)cartTotal.innerHTML=money(total)+' '+currencyIcon;
if(cartItems){cartItems.innerHTML=entries.map(({product:p,qty})=>'<article class="cart-item">'+imageMarkup(p)+'<div><h3>'+safeText(p.name)+'</h3><p><span>'+money(p.price)+'</span> '+currencyIcon+'</p><div class="quantity-control"><button type="button" data-qty="'+p.id+'" data-delta="-1" aria-label="تقليل الكمية">−</button><span>'+qty+'</span><button type="button" data-qty="'+p.id+'" data-delta="1" aria-label="زيادة الكمية">+</button></div></div><strong class="cart-item-price"><span>'+money(p.price*qty)+'</span>'+currencyIcon+'</strong></article>').join('');cartItems.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>img.remove(),{once:true}));}
document.querySelectorAll('.floating-cart').forEach(el=>el.setAttribute('aria-label','فتح السلة، '+count+' أصناف'));
}
function openCart(){const drawer=document.getElementById('cart-drawer');if(!drawer)return;lastFocusedElement=document.activeElement;drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');document.querySelectorAll('.cart-backdrop').forEach(el=>el.hidden=false);document.body.classList.add('cart-open');const close=drawer.querySelector('button');if(close)close.focus();}
function closeCart(){const drawer=document.getElementById('cart-drawer');if(!drawer)return;drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.querySelectorAll('.cart-backdrop').forEach(el=>el.hidden=true);document.body.classList.remove('cart-open');if(lastFocusedElement&&typeof lastFocusedElement.focus==='function')lastFocusedElement.focus();}
grid.addEventListener('click',event=>{const button=event.target.closest('[data-add]');if(!button)return;const product=products.find(p=>p.id===button.dataset.add);if(!product)return;if(!cart[product.id])cart[product.id]={product,qty:0};cart[product.id].qty++;updateCart();showToast('تمت إضافة '+product.name+' إلى سلتك');});
const cartItems=document.getElementById('cart-items');if(cartItems)cartItems.addEventListener('click',event=>{const button=event.target.closest('[data-qty]');if(!button)return;const item=cart[button.dataset.qty];if(!item)return;item.qty+=Number(button.dataset.delta);if(item.qty<=0)delete cart[button.dataset.qty];updateCart();});
document.querySelectorAll('[data-open-cart]').forEach(el=>el.addEventListener('click',openCart));document.querySelectorAll('[data-close-cart]').forEach(el=>el.addEventListener('click',closeCart));document.addEventListener('keydown',event=>{if(event.key==='Escape')closeCart();});
const emptyLink=document.querySelector('.cart-empty .text-link');if(emptyLink)emptyLink.addEventListener('click',closeCart);
document.querySelectorAll('.category-tab').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter||'all';document.querySelectorAll('.category-tab').forEach(tab=>{const active=tab===button;tab.classList.toggle('active',active);tab.setAttribute('aria-pressed',String(active));});renderMenu();}));
search.addEventListener('input',renderMenu);
const menuToggle=document.querySelector('.mobile-menu-toggle'),mobileNav=document.getElementById('mobile-menu');
function closeMobileMenu(){if(!mobileNav||!menuToggle)return;mobileNav.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','فتح القائمة');}
if(menuToggle&&mobileNav){menuToggle.addEventListener('click',()=>{const opening=menuToggle.getAttribute('aria-expanded')!=='true';mobileNav.hidden=!opening;menuToggle.setAttribute('aria-expanded',String(opening));menuToggle.setAttribute('aria-label',opening?'إغلاق القائمة':'فتح القائمة');});mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMobileMenu));document.addEventListener('click',event=>{if(!mobileNav.hidden&&!mobileNav.contains(event.target)&&!menuToggle.contains(event.target))closeMobileMenu();});}
document.querySelectorAll('a[href*="hungerstation.com"]').forEach(link=>{link.href=hungerUrl;link.target='_blank';link.rel='noopener noreferrer';});
const header=document.querySelector('.site-header');if(header)window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>12),{passive:true});
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -25px 0px'});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
const year=document.getElementById('current-year');if(year)year.textContent=new Date().getFullYear();
renderMenu();updateCart();
})();