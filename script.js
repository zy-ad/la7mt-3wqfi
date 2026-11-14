(() => {
  'use strict';
  const hungerUrl = 'https://hungerstation.com/sa-ar/restaurants/regions/%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6/%D8%A7%D9%84%D8%AD%D9%85%D8%B1%D8%A7%D8%A1/%d9%84%d8%ad%d9%85%d8%a9-%d8%b9%d9%88%d8%a7%d9%81%d9%8a-54059';
  const products = [
    {id:'hashi',name:'حاشي عوافي',english:'Hashi Awafi',price:17,image:'حاشي-عوافي.webp',category:'shawarma'},
    {id:'meat',name:'لحمة عوافي',english:'Awafi Meat',price:15,image:'لحمة-عوافي.webp',category:'shawarma'},
    {id:'chicken',name:'دجاج عوافي',english:'Awafi Chicken',price:11,image:'دجاج-عوافي.webp',category:'shawarma'},
    {id:'chicken-small',name:'صاجية عوافي دجاج صغير',english:'Awafi Small Chicken Sajiya',price:8,image:'صاجية عوافي دجاج صغير - Awafi small chicken sajiya.webp',category:'sajiya'},
    {id:'chicken-large',name:'صاجية عوافي دجاج كبير',english:'Awafi Big Chicken Sajiya',price:17,image:'صاجية عوافي دجاج كبير - Awafi Big chicken sajiya.webp',category:'sajiya'},
    {id:'hashi-small',name:'صاجية عوافي حاشي صغير',english:'Sajiya Awafi Small Hashi',price:12,image:'صاجية عوافي حاشي صغير - Sajiya Awafi, small Hashi.webp',category:'sajiya'},
    {id:'hashi-large',name:'صاجية عوافي حاشي كبير',english:'Sajiya Awafi Big Hashi',price:24,image:'صاجية عوافي حاشي كبير - Sajiya Awafi, Big Hashi.webp',category:'sajiya'},
    {id:'calf-small',name:'صاجية عوافي عجل صغير',english:'Awafi Calf Sajiya Small',price:11,image:'صاجية عوافي عجل صغير - Awafi calf sajiya ، small.webp',category:'sajiya'},
    {id:'calf-large',name:'صاجية عوافي عجل كبير',english:'Awafi Calf Sajiya Big',price:22,image:'صاجية عوافي عجل كبير - Awafi calf sajiya ، Big.webp',category:'sajiya'}
  ];
  const money = n => new Intl.NumberFormat('ar-SA',{maximumFractionDigits:0}).format(n);
  const grid = document.getElementById('menu-grid');
  const empty = document.getElementById('menu-empty');
  const search = document.getElementById('menu-search');
  let activeFilter = 'all';
  let cart = {};
  let toastTimer;
  const safeText = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  function renderMenu(){
    const query = (search.value || '').trim().toLocaleLowerCase('ar');
    const shown = products.filter(p => (activeFilter === 'all' || p.category === activeFilter) && (p.name.toLocaleLowerCase('ar').includes(query) || p.english.toLowerCase().includes(query)));
    grid.innerHTML = shown.map((p,index) => `
      <article class="menu-card reveal visible">
        <div class="menu-card-image"><img src="${encodeURI(p.image)}" alt="${safeText(p.name)}" loading="lazy"><span class="menu-number">${String(index+1).padStart(2,'0')} / 09</span></div>
        <div class="menu-card-body"><div class="menu-card-title-row"><div><h3>${safeText(p.name)}</h3><p class="english-name">${safeText(p.english)}</p></div></div>
        <div class="menu-card-bottom"><span class="price">${money(p.price)} <small>ر.س</small></span><button class="add-to-cart" type="button" data-add="${p.id}" aria-label="أضف ${safeText(p.name)} إلى السلة"><i class="fa-solid fa-plus"></i></button></div></div>
      </article>`).join('');
    empty.hidden = shown.length !== 0;
    grid.hidden = shown.length === 0;
  }
  function showToast(message){
    const toast=document.getElementById('toast');
    toast.textContent=message;toast.classList.add('show');
    clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200);
  }
  function cartQty(){return Object.values(cart).reduce((sum,item)=>sum+item.qty,0)}
  function updateCart(){
    const count=cartQty();
    document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=money(count));
    const entries=Object.values(cart);
    const total=entries.reduce((sum,item)=>sum+item.product.price*item.qty,0);
    document.getElementById('cart-empty').hidden=entries.length>0;
    document.getElementById('cart-footer').hidden=entries.length===0;
    document.getElementById('cart-total').innerHTML=money(total)+' <small>ر.س</small>';
    document.getElementById('cart-items').innerHTML=entries.map(({product:p,qty})=>`
      <article class="cart-item"><img src="${encodeURI(p.image)}" alt=""><div><h3>${safeText(p.name)}</h3><p>${money(p.price)} ر.س</p><div class="quantity-control"><button type="button" data-qty="${p.id}" data-delta="-1" aria-label="تقليل الكمية">−</button><span>${qty}</span><button type="button" data-qty="${p.id}" data-delta="1" aria-label="زيادة الكمية">+</button></div></div><strong class="cart-item-price">${money(p.price*qty)}</strong></article>`).join('');
    document.querySelectorAll('.floating-cart').forEach(el=>el.setAttribute('aria-label','فتح السلة، '+count+' أصناف'));
  }
  function openCart(){
    const drawer=document.getElementById('cart-drawer');
    drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');
    document.querySelectorAll('[data-close-cart]').forEach(el=>{if(el.classList.contains('cart-backdrop'))el.hidden=false});
    document.body.classList.add('cart-open');
    drawer.querySelector('button').focus();
  }
  function closeCart(){
    document.getElementById('cart-drawer').classList.remove('open');
    document.getElementById('cart-drawer').setAttribute('aria-hidden','true');
    document.querySelectorAll('.cart-backdrop').forEach(el=>el.hidden=true);
    document.body.classList.remove('cart-open');
  }
  grid.addEventListener('click',event=>{
    const button=event.target.closest('[data-add]');if(!button)return;
    const product=products.find(p=>p.id===button.dataset.add);if(!product)return;
    if(!cart[product.id])cart[product.id]={product,qty:0};
    cart[product.id].qty++;updateCart();showToast('تمت إضافة '+product.name+' إلى سلتك');
  });
  document.getElementById('cart-items').addEventListener('click',event=>{
    const button=event.target.closest('[data-qty]');if(!button)return;
    const id=button.dataset.qty;if(!cart[id])return;
    cart[id].qty+=Number(button.dataset.delta);
    if(cart[id].qty<=0)delete cart[id];
    updateCart();
  });
  document.querySelectorAll('[data-open-cart]').forEach(el=>el.addEventListener('click',openCart));
  document.querySelectorAll('[data-close-cart]').forEach(el=>el.addEventListener('click',closeCart));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeCart()});
  document.querySelector('.cart-empty .text-link').addEventListener('click',closeCart);
  document.querySelectorAll('.category-tab').forEach(button=>button.addEventListener('click',()=>{
    activeFilter=button.dataset.filter;
    document.querySelectorAll('.category-tab').forEach(tab=>{const active=tab===button;tab.classList.toggle('active',active);tab.setAttribute('aria-pressed',String(active))});
    renderMenu();
  }));
  search.addEventListener('input',renderMenu);
  const menuToggle=document.querySelector('.mobile-menu-toggle');
  const mobileNav=document.getElementById('mobile-menu');
  function closeMobileMenu(){mobileNav.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','فتح القائمة')}
  menuToggle.addEventListener('click',()=>{
    const opening=menuToggle.getAttribute('aria-expanded')!=='true';
    mobileNav.hidden=!opening;menuToggle.setAttribute('aria-expanded',String(opening));menuToggle.setAttribute('aria-label',opening?'إغلاق القائمة':'فتح القائمة');
  });
  mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMobileMenu));
  document.addEventListener('click',event=>{if(!mobileNav.hidden&&!mobileNav.contains(event.target)&&!menuToggle.contains(event.target))closeMobileMenu()});
  const header=document.querySelector('.site-header');
  window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>12),{passive:true});
  const revealObserver= 'IntersectionObserver' in window ? new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -25px 0px'}) : null;
  if(revealObserver)document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
  else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
  document.getElementById('current-year').textContent=new Date().getFullYear();
  renderMenu();updateCart();
})();