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
const money=value=>new Intl.NumberFormat('ar-SA-u-nu-arab',{maximumFractionDigits:0}).format(value);
const safeText=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const imageMarkup=product=>product.image?'<img src="'+encodeURI(product.image)+'" alt="'+safeText(product.name)+'" loading="lazy">':'<div class="product-placeholder" aria-hidden="true"><i class="fa-solid fa-utensils"></i><span>لحمة عوافي</span></div>';
const grid=document.getElementById('menu-grid'),empty=document.getElementById('menu-empty'),search=document.getElementById('menu-search');
if(!grid||!empty||!search)return;
let activeFilter='main',expandedMenu=false,toastTimer=0,lastFocusedElement=null;
const cart=Object.create(null);
function renderMenu(){
const query=search.value.trim().toLocaleLowerCase('ar');
const shown=products.filter(p=>p.category===activeFilter&&(p.name.toLocaleLowerCase('ar').includes(query)||p.english.toLowerCase().includes(query)));
const visible=expandedMenu?shown:shown.slice(0,6);
grid.innerHTML=visible.map((p,i)=>'<article class="menu-card reveal visible"><div class="menu-card-image">'+imageMarkup(p)+'<span class="menu-number">'+String(i+1).padStart(2,'0')+' / '+String(shown.length).padStart(2,'0')+'</span></div><div class="menu-card-body"><div class="menu-card-title-row"><div><h3>'+safeText(p.name)+'</h3><p class="english-name">'+safeText(p.english)+'</p>'+(p.description?'<p class="product-description">'+safeText(p.description)+'</p>':'')+(p.calories?'<p class="product-calories">'+p.calories+' سعرة حرارية</p>':'')+'</div></div><div class="menu-card-bottom"><span class="price"><span>'+money(p.price)+'</span>'+currencyIcon+'</span></div></div></article>').join('');
grid.querySelectorAll('.menu-card-image img').forEach(img=>img.addEventListener('error',()=>{const f=document.createElement('div');f.className='product-placeholder';f.setAttribute('aria-hidden','true');f.innerHTML='<i class="fa-solid fa-utensils"></i><span>لحمة عوافي</span>';img.replaceWith(f);},{once:true}));
empty.hidden=shown.length!==0;grid.hidden=shown.length===0;
const expand=document.getElementById('menu-expand');
if(expand){expand.hidden=shown.length<=6;expand.setAttribute('aria-expanded',String(expandedMenu));expand.innerHTML=expandedMenu?'عرض أصناف أقل <i class="fa-solid fa-chevron-up"></i>':'عرض القائمة كاملة ('+money(shown.length)+') <i class="fa-solid fa-chevron-down"></i>';}
}
function showToast(message){const toast=document.getElementById('toast');if(!toast)return;toast.textContent=message;toast.classList.add('show');window.clearTimeout(toastTimer);toastTimer=window.setTimeout(()=>toast.classList.remove('show'),2200);}
function cartQuantity(){return Object.values(cart).reduce((sum,item)=>sum+item.qty,0);}
function updateCart(){
const count=cartQuantity();document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=money(count));
const entries=Object.values(cart),total=entries.reduce((sum,item)=>sum+item.product.price*item.qty,0);
const cartEmpty=document.getElementById('cart-empty'),cartFooter=document.getElementById('cart-footer'),cartTotal=document.getElementById('cart-total'),cartItems=document.getElementById('cart-items');
if(cartEmpty){cartEmpty.hidden=entries.length>0;cartEmpty.style.display=entries.length>0?'none':'';}if(cartFooter){cartFooter.hidden=entries.length===0;cartFooter.style.display=entries.length===0?'none':'';}if(cartTotal)cartTotal.innerHTML=money(total)+' '+currencyIcon;
if(cartItems){cartItems.hidden=entries.length===0;cartItems.innerHTML=entries.map(({product:p,qty})=>'<article class="cart-item">'+imageMarkup(p)+'<div><h3>'+safeText(p.name)+'</h3><p><span>'+money(p.price)+'</span> '+currencyIcon+'</p><div class="quantity-control"><button type="button" data-qty="'+p.id+'" data-delta="-1" aria-label="تقليل الكمية">−</button><span>'+qty+'</span><button type="button" data-qty="'+p.id+'" data-delta="1" aria-label="زيادة الكمية">+</button></div></div><strong class="cart-item-price"><span>'+money(p.price*qty)+'</span>'+currencyIcon+'</strong></article>').join('');cartItems.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>img.remove(),{once:true}));}
document.querySelectorAll('.floating-cart').forEach(el=>el.setAttribute('aria-label','فتح السلة، '+count+' أصناف'));
}
function openCart(){const drawer=document.getElementById('cart-drawer');if(!drawer)return;lastFocusedElement=document.activeElement;drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');document.querySelectorAll('.cart-backdrop').forEach(el=>el.hidden=false);document.body.classList.add('cart-open');const close=drawer.querySelector('button');if(close)close.focus();}
function closeCart(){const drawer=document.getElementById('cart-drawer');if(!drawer)return;drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.querySelectorAll('.cart-backdrop').forEach(el=>el.hidden=true);document.body.classList.remove('cart-open');if(lastFocusedElement&&typeof lastFocusedElement.focus==='function')lastFocusedElement.focus();}
document.querySelectorAll('.category-tab').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter||'all';expandedMenu=false;document.querySelectorAll('.category-tab').forEach(tab=>{const active=tab===button;tab.classList.toggle('active',active);tab.setAttribute('aria-pressed',String(active));});renderMenu();}));
search.addEventListener('input',()=>{expandedMenu=false;renderMenu();});
const menuExpand=document.getElementById('menu-expand');if(menuExpand)menuExpand.addEventListener('click',()=>{expandedMenu=!expandedMenu;renderMenu();});
const menuToggle=document.querySelector('.mobile-menu-toggle'),mobileNav=document.getElementById('mobile-menu');
function closeMobileMenu(){if(!mobileNav||!menuToggle)return;mobileNav.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','فتح القائمة');}
if(menuToggle&&mobileNav){menuToggle.addEventListener('click',()=>{const opening=menuToggle.getAttribute('aria-expanded')!=='true';mobileNav.hidden=!opening;menuToggle.setAttribute('aria-expanded',String(opening));menuToggle.setAttribute('aria-label',opening?'إغلاق القائمة':'فتح القائمة');});mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMobileMenu));document.addEventListener('click',event=>{if(!mobileNav.hidden&&!mobileNav.contains(event.target)&&!menuToggle.contains(event.target))closeMobileMenu();});}
document.querySelectorAll('a[href*="hungerstation.com"]').forEach(link=>{link.href='#delivery-options';link.removeAttribute('target');link.removeAttribute('rel');link.dataset.openDelivery='true';});
const deliveryModal=document.getElementById('delivery-modal');
function openDelivery(){if(!deliveryModal)return;deliveryModal.hidden=false;document.body.classList.add('delivery-open');const first=deliveryModal.querySelector('a[href]');if(first)first.focus();}
function closeDelivery(){if(!deliveryModal)return;deliveryModal.hidden=true;document.body.classList.remove('delivery-open');}
document.addEventListener('click',event=>{const trigger=event.target.closest('[data-open-delivery]');if(trigger){event.preventDefault();openDelivery();return;}if(event.target.closest('[data-close-delivery]'))closeDelivery();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&deliveryModal&&!deliveryModal.hidden)closeDelivery();});
const header=document.querySelector('.site-header');if(header)window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>12),{passive:true});
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -25px 0px'});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
const year=document.getElementById('current-year');if(year)year.textContent=new Date().getFullYear();

const STORAGE_KEY='awafi-site-edits-v1',HERO_KEY='awafi-hero-slides-v1',ADMIN_PIN='12366';
let siteEdits={};
try{siteEdits=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')||{};}catch(_){siteEdits={};}
const savedProducts=siteEdits.products;
if(Array.isArray(savedProducts)&&savedProducts.length){products.splice(0,products.length,...savedProducts);}
function persistProducts(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({products}));}catch(_){showToast('تعذر الحفظ؛ حجم الصور كبير على مساحة المتصفح');}}
function heroDefaults(){return ['صورة-الفرع.jpg','1016586.webp','ف582d65c-5636-4939-a2d3-80d118d80fcb.webp'.replace('ف','f')];}
let heroSlides=[];try{const stored=JSON.parse(localStorage.getItem(HERO_KEY)||'null');heroSlides=Array.isArray(stored)&&stored.length?stored:heroDefaults();}catch(_){heroSlides=heroDefaults();}
let heroIndex=0,heroTimer=0;
const heroNode=document.getElementById('hero-image'),heroDots=document.getElementById('hero-dots');
function paintHero(){if(!heroNode||!heroSlides.length)return;heroNode.classList.add('is-changing');window.setTimeout(()=>{heroNode.style.backgroundImage='url("'+heroSlides[heroIndex]+'")';heroNode.classList.remove('is-changing');},250);if(heroDots){heroDots.innerHTML=heroSlides.map((_,i)=>'<button class="hero-dot '+(i===heroIndex?'active':'')+'" type="button" data-hero-index="'+i+'" aria-label="الصورة '+(i+1)+'"></button>').join('');}}
function startHero(){window.clearInterval(heroTimer);paintHero();heroTimer=window.setInterval(()=>{heroIndex=(heroIndex+1)%heroSlides.length;paintHero();},5500);}
if(heroDots)heroDots.addEventListener('click',e=>{const b=e.target.closest('[data-hero-index]');if(!b)return;heroIndex=Number(b.dataset.heroIndex);startHero();});
startHero();
const reviewsTrack=document.querySelector('.reviews-grid');
if(reviewsTrack){const cards=[...reviewsTrack.querySelectorAll('.review-card')];let reviewIndex=0,reviewTimer=0;function advanceReviews(){if(cards.length<2)return;reviewIndex=(reviewIndex+1)%cards.length;const target=cards[reviewIndex];const rtl=getComputedStyle(reviewsTrack).direction==='rtl';const left=rtl?target.offsetLeft+target.offsetWidth-reviewsTrack.clientWidth:target.offsetLeft;reviewsTrack.scrollTo({left,behavior:'smooth'});}function startReviewLoop(){window.clearInterval(reviewTimer);reviewTimer=window.setInterval(advanceReviews,4200);}startReviewLoop();reviewsTrack.addEventListener('mouseenter',()=>window.clearInterval(reviewTimer));reviewsTrack.addEventListener('mouseleave',startReviewLoop);reviewsTrack.addEventListener('focusin',()=>window.clearInterval(reviewTimer));reviewsTrack.addEventListener('focusout',startReviewLoop);window.addEventListener('resize',()=>{reviewIndex=0;});}


let qualityImages=['صورة-الفرع.jpg','f582d65c-5636-4939-a2d3-80d118d80fcb.webp'];
try{const q=JSON.parse(localStorage.getItem('awafi-quality-images-v1')||'null');if(Array.isArray(q)&&q.length)qualityImages=q;}catch(_){}
function renderQualityImages(){const list=document.getElementById('admin-quality-list');if(!list)return;list.innerHTML=qualityImages.map((src,i)=>'<div class="admin-hero-item"><img src="'+src+'" alt="صورة قسم الجودة"><button type="button" data-remove-quality="'+i+'" aria-label="حذف الصورة"><i class="fa-solid fa-xmark"></i></button></div>').join('');const main=document.getElementById('quality-main-image'),small=document.getElementById('quality-small-image');if(main&&qualityImages[0])main.src=qualityImages[0];if(small&&qualityImages[1])small.src=qualityImages[1];}
const qUpload=document.getElementById('admin-quality-upload');let pendingQuality=[];
if(qUpload)qUpload.addEventListener('change',()=>{pendingQuality=[];const files=Array.from(qUpload.files||[]);if(files.length>8){showToast('يمكن اختيار 8 صور كحد أقصى');return;}let remaining=files.length;files.forEach(file=>{if(file.size>3*1024*1024){remaining--;showToast('حجم الصورة يجب ألا يتجاوز 3 ميجابايت');return;}const reader=new FileReader();reader.onload=()=>{pendingQuality.push(String(reader.result));if(!--remaining)renderQualityPending();};reader.onerror=()=>{if(!--remaining)renderQualityPending();};reader.readAsDataURL(file);});});
function renderQualityPending(){const list=document.getElementById('admin-quality-list');if(!list)return;list.innerHTML=[...qualityImages,...pendingQuality].map((src,i)=>'<div class="admin-hero-item"><img src="'+src+'" alt="صورة قسم الجودة"><button type="button" data-remove-quality="'+i+'" aria-label="حذف الصورة"><i class="fa-solid fa-xmark"></i></button></div>').join('');}
const qList=document.getElementById('admin-quality-list');if(qList)qList.addEventListener('click',e=>{const b=e.target.closest('[data-remove-quality]');if(!b)return;const i=Number(b.dataset.removeQuality);if(i<qualityImages.length)qualityImages.splice(i,1);else pendingQuality.splice(i-qualityImages.length,1);renderQualityPending();});
const qSave=document.getElementById('admin-save-quality');if(qSave)qSave.addEventListener('click',()=>{qualityImages=[...qualityImages,...pendingQuality];if(!qualityImages.length){showToast('أضف صورة واحدة على الأقل');return;}try{localStorage.setItem('awafi-quality-images-v1',JSON.stringify(qualityImages));pendingQuality=[];renderQualityImages();showToast('تم حفظ صور قسم الجودة على هذا المتصفح');}catch(_){showToast('مساحة التخزين غير كافية للصور');}});
renderQualityImages();
const adminModal=document.getElementById('admin-modal'),adminLaunch=document.getElementById('admin-launch'),adminLogin=document.getElementById('admin-login'),adminWorkspace=document.getElementById('admin-workspace'),pinForm=document.getElementById('admin-pin-form'),pinInput=document.getElementById('admin-pin'),pinError=document.getElementById('admin-pin-error');
let adminUnlocked=false,editingProductId=null,pendingProductImage='',pendingHeroImages=[];
function openAdmin(){if(!adminModal)return;adminModal.hidden=false;document.body.classList.add('admin-open');if(adminUnlocked){adminLogin.hidden=true;adminWorkspace.hidden=false;}else{adminLogin.hidden=false;adminWorkspace.hidden=true;window.setTimeout(()=>pinInput&&pinInput.focus(),80);}}
function closeAdmin(){if(!adminModal)return;adminModal.hidden=true;document.body.classList.remove('admin-open');}
if(adminLaunch)adminLaunch.addEventListener('click',openAdmin);
document.querySelectorAll('[data-admin-close]').forEach(el=>el.addEventListener('click',closeAdmin));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&adminModal&&!adminModal.hidden)closeAdmin();});
if(pinForm)pinForm.addEventListener('submit',e=>{e.preventDefault();if(pinInput.value===ADMIN_PIN){adminUnlocked=true;pinError.textContent='';adminLogin.hidden=true;adminWorkspace.hidden=false;loadAdminProducts();renderAdminHero();}else{pinError.textContent='رمز الوصول غير صحيح';pinInput.value='';pinInput.focus();}});
function productField(id){return document.getElementById('admin-'+id);}
function loadAdminProducts(selectId){const select=productField('product-select');if(!select)return;select.innerHTML=products.map(p=>'<option value="'+safeText(p.id)+'">'+safeText(p.name)+'</option>').join('');const chosen=products.find(p=>p.id===(selectId||editingProductId))||products[0];if(!chosen)return;editingProductId=chosen.id;select.value=chosen.id;productField('name').value=chosen.name||'';productField('english').value=chosen.english||'';productField('price').value=chosen.price??0;productField('calories').value=chosen.calories??'';productField('description').value=chosen.description||'';productField('category').value=chosen.category||'main';pendingProductImage=chosen.image||'';productField('product-image').value='';const preview=productField('product-preview');preview.innerHTML=(pendingProductImage?'<img src="'+encodeURI(pendingProductImage)+'" alt="">':'<span>لا توجد صورة</span>')+'<span>الصورة الحالية للمنتج</span>';}
const productSelect=productField('product-select');if(productSelect)productSelect.addEventListener('change',()=>loadAdminProducts(productSelect.value));
const productUpload=productField('product-image');if(productUpload)productUpload.addEventListener('change',()=>{const file=productUpload.files&&productUpload.files[0];if(!file)return;if(file.size>3*1024*1024){showToast('اختر صورة أقل من 3 ميجابايت');productUpload.value='';return;}const reader=new FileReader();reader.onload=()=>{pendingProductImage=String(reader.result);productField('product-preview').innerHTML='<img src="'+pendingProductImage+'" alt=""><span>الصورة الجديدة</span>';};reader.readAsDataURL(file);});
const saveProduct=document.getElementById('admin-save-product');if(saveProduct)saveProduct.addEventListener('click',()=>{const item=products.find(p=>p.id===editingProductId);if(!item)return;const name=productField('name').value.trim(),price=Number(productField('price').value);if(!name||!Number.isFinite(price)||price<0){showToast('تحقق من اسم المنتج والسعر');return;}item.name=name;item.english=productField('english').value.trim();item.price=price;item.calories=productField('calories').value===''?null:Number(productField('calories').value);item.description=productField('description').value.trim();item.category=productField('category').value;if(pendingProductImage)item.image=pendingProductImage;persistProducts();renderMenu();loadAdminProducts(item.id);showToast('تم حفظ بيانات المنتج على هذا المتصفح');});
const addProduct=document.getElementById('admin-add-product');if(addProduct)addProduct.addEventListener('click',()=>{const id='custom-'+Date.now();products.push({id,name:'منتج جديد',english:'New item',price:0,category:'main',description:'',image:''});editingProductId=id;persistProducts();loadAdminProducts(id);});
const deleteProduct=document.getElementById('admin-delete-product');if(deleteProduct)deleteProduct.addEventListener('click',()=>{if(!editingProductId||!window.confirm('هل تريد حذف هذا المنتج؟'))return;const index=products.findIndex(p=>p.id===editingProductId);if(index>=0)products.splice(index,1);editingProductId=products[0]?.id||null;persistProducts();renderMenu();loadAdminProducts();showToast('تم حذف المنتج');});
document.querySelectorAll('[data-admin-tab]').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('[data-admin-tab]').forEach(x=>x.classList.toggle('active',x===tab));document.getElementById('admin-products-pane').hidden=tab.dataset.adminTab!=='products';document.getElementById('admin-hero-pane').hidden=tab.dataset.adminTab!=='hero';const qp=document.getElementById('admin-quality-pane');if(qp)qp.hidden=tab.dataset.adminTab!=='quality';if(tab.dataset.adminTab==='quality')renderQualityImages();}));
const heroUpload=document.getElementById('admin-hero-upload');
if(heroUpload)heroUpload.addEventListener('change',()=>{const files=Array.from(heroUpload.files||[]);if(files.length>6){showToast('يمكن رفع 6 صور في المرة الواحدة');return;}let pending=files.length;pendingHeroImages=[];files.forEach(file=>{if(file.size>2*1024*1024){pending--;showToast('تجاهلنا صورة أكبر من 2 ميجابايت');return;}const reader=new FileReader();reader.onload=()=>{pendingHeroImages.push(String(reader.result));pending--;if(!pending)renderAdminHero();};reader.onerror=()=>{pending--;};reader.readAsDataURL(file);});});
function renderAdminHero(){const list=document.getElementById('admin-hero-list');if(!list)return;list.innerHTML=heroSlides.map((src,i)=>'<div class="admin-hero-item"><img src="'+src+'" alt="صورة الواجهة '+(i+1)+'"><button type="button" data-remove-hero="'+i+'" aria-label="حذف الصورة"><i class="fa-solid fa-xmark"></i></button></div>').join('');}
const heroList=document.getElementById('admin-hero-list');if(heroList)heroList.addEventListener('click',e=>{const b=e.target.closest('[data-remove-hero]');if(!b)return;heroSlides.splice(Number(b.dataset.removeHero),1);renderAdminHero();});
const saveHero=document.getElementById('admin-save-hero');if(saveHero)saveHero.addEventListener('click',()=>{if(pendingHeroImages.length)heroSlides.push(...pendingHeroImages);if(!heroSlides.length){showToast('أضف صورة واحدة على الأقل');return;}try{localStorage.setItem(HERO_KEY,JSON.stringify(heroSlides));heroIndex=0;startHero();pendingHeroImages=[];heroUpload.value='';renderAdminHero();showToast('تم حفظ صور الواجهة على هذا المتصفح');}catch(_){showToast('حجم الصور أكبر من مساحة التخزين المتاحة');}});

renderMenu();updateCart();
})();