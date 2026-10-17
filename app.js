/* NovaCart demo storefront — no framework or build step required. */
"use strict";
const products = [
  {id:1,name:"Studio Wireless Headphones",category:"Tech",price:3499,oldPrice:4299,rating:4.9,reviews:128,tag:"BESTSELLER",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=650&q=78",alt:"Wireless over-ear headphones",color:"#e7eadf"},
  {id:2,name:"Everyday Carry Bottle",category:"Lifestyle",price:899,oldPrice:1199,rating:4.8,reviews:86,tag:"POPULAR",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=650&q=78",alt:"Reusable stainless steel water bottle"},
  {id:3,name:"Soft Glow Table Lamp",category:"Home",price:2199,oldPrice:2599,rating:4.7,reviews:54,tag:"NEW",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=650&q=78",alt:"Minimal modern table lamp"},
  {id:4,name:"Minimal Desk Clock",category:"Home",price:1299,oldPrice:1599,rating:4.6,reviews:42,tag:"",image:"https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=650&q=78",alt:"Minimal clock for a desk"},
  {id:5,name:"Everyday Crossbody Bag",category:"Lifestyle",price:1899,oldPrice:2299,rating:4.8,reviews:73,tag:"STAFF PICK",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=650&q=78",alt:"Modern everyday backpack and carry bag"},
  {id:6,name:"Compact Bluetooth Speaker",category:"Tech",price:2799,oldPrice:3299,rating:4.9,reviews:102,tag:"TOP RATED",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=650&q=78",alt:"Compact portable Bluetooth speaker"},
  {id:7,name:"Ceramic Coffee Set",category:"Home",price:1499,oldPrice:1799,rating:4.7,reviews:61,tag:"",image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=650&q=78",alt:"Ceramic coffee cups and tableware"},
  {id:8,name:"Smart Fitness Watch",category:"Tech",price:4999,oldPrice:5999,rating:4.6,reviews:91,tag:"JUST IN",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=650&q=78",alt:"Modern wristwatch with a dark strap"}
];
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const formatPrice = value => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
const state = {category:"All",query:"",sort:"featured",cart:new Map(),favorites:new Set()};
const grid=$("#product-grid"), searchInput=$("#search-input"), drawer=$("#cart-drawer"), scrim=$("#scrim");
let toastTimer;
function showToast(message){
  const toast=$("#toast"); toast.textContent=message; toast.classList.add("show");
  window.clearTimeout(toastTimer); toastTimer=window.setTimeout(()=>toast.classList.remove("show"),2200);
}
function filteredProducts(){
  let list=products.filter(p=>(state.category==="All"||p.category===state.category)&&`${p.name} ${p.category} ${p.tag}`.toLowerCase().includes(state.query.toLowerCase()));
  if(state.sort==="price-low") list.sort((a,b)=>a.price-b.price);
  if(state.sort==="price-high") list.sort((a,b)=>b.price-a.price);
  if(state.sort==="rating") list.sort((a,b)=>b.rating-a.rating);
  return list;
}
function renderProducts(){
  const list=filteredProducts();
  $("#results-count").textContent=`Showing ${list.length} of ${products.length} products`;
  $("#empty-state").hidden=list.length!==0;
  grid.hidden=list.length===0;
  grid.innerHTML=list.map(p=>`<article class="product-card">
    <div class="product-visual" style="background:${p.color||"#edf0e8"}">
      <img src="${p.image}" alt="${p.alt}" loading="lazy" decoding="async" width="650" height="715">
      ${p.tag?`<span class="product-tag">${p.tag}</span>`:""}
      <button class="favorite-button" data-favorite="${p.id}" aria-label="${state.favorites.has(p.id)?"Remove":"Add"} ${p.name} ${state.favorites.has(p.id)?"from":"to"} favourites" aria-pressed="${state.favorites.has(p.id)}">♡</button>
    </div>
    <div class="product-info"><div class="product-meta"><span>${p.category}</span><span class="rating">★ ${p.rating} <span>(${p.reviews})</span></span></div>
      <h3>${p.name}</h3><div class="product-bottom"><div class="price">${formatPrice(p.price)} <span class="old-price">${formatPrice(p.oldPrice)}</span></div><button class="add-button" data-add="${p.id}">+ Add to bag</button></div>
    </div></article>`).join("");
}
function addToCart(id){
  const current=state.cart.get(id)||0; state.cart.set(id,current+1); renderCart(); showToast(`${products.find(p=>p.id===id).name} added to bag`);
}
function renderCart(){
  const entries=[...state.cart.entries()];
  const count=entries.reduce((sum,[,qty])=>sum+qty,0);
  const subtotal=entries.reduce((sum,[id,qty])=>sum+products.find(p=>p.id===id).price*qty,0);
  $("#cart-count").textContent=count; $("#drawer-count").textContent=`(${count})`; $("#cart-subtotal").textContent=formatPrice(subtotal);
  $("#cart-empty").hidden=count>0; $("#drawer-footer").hidden=count===0;
  $("#cart-items").innerHTML=entries.map(([id,qty])=>{
    const p=products.find(item=>item.id===id);
    return `<div class="cart-line"><img src="${p.image}" alt="" width="76" height="84"><div><h3>${p.name}</h3><span class="line-price">${formatPrice(p.price)}</span><div class="quantity-control"><button data-qty="${id}" data-delta="-1" aria-label="Decrease ${p.name} quantity">−</button><span>${qty}</span><button data-qty="${id}" data-delta="1" aria-label="Increase ${p.name} quantity">+</button></div><button class="remove-line" data-remove="${id}">Remove</button></div><strong class="line-price">${formatPrice(p.price*qty)}</strong></div>`;
  }).join("");
}
function openCart(){
  drawer.classList.add("open"); drawer.setAttribute("aria-hidden","false"); scrim.hidden=false; document.body.classList.add("no-scroll"); $("#cart-close").focus();
}
function closeCart(){
  drawer.classList.remove("open"); drawer.setAttribute("aria-hidden","true"); scrim.hidden=true; document.body.classList.remove("no-scroll"); $("#cart-open").focus();
}
$("#category-list").addEventListener("click",event=>{
  const button=event.target.closest("[data-category]"); if(!button)return;
  state.category=button.dataset.category;
  $$(".category-chip").forEach(chip=>chip.classList.toggle("active",chip===button));
  renderProducts();
});
grid.addEventListener("click",event=>{
  const add=event.target.closest("[data-add]"); if(add){addToCart(Number(add.dataset.add));return;}
  const favorite=event.target.closest("[data-favorite]"); if(favorite){
    const id=Number(favorite.dataset.favorite);
    state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id);
    renderProducts(); showToast(state.favorites.has(id)?"Added to favourites":"Removed from favourites");
  }
});
$("#search-form").addEventListener("submit",event=>{event.preventDefault();state.query=searchInput.value.trim();renderProducts();$("#shop").scrollIntoView({behavior:"smooth"});});
searchInput.addEventListener("input",()=>{state.query=searchInput.value.trim();renderProducts();});
$("#sort-select").addEventListener("change",event=>{state.sort=event.target.value;renderProducts();});
$("#clear-filters").addEventListener("click",()=>{state.category="All";state.query="";state.sort="featured";searchInput.value="";$("#sort-select").value="featured";$$(".category-chip").forEach(chip=>chip.classList.toggle("active",chip.dataset.category==="All"));renderProducts();});
$("#cart-open").addEventListener("click",openCart); $("#cart-close").addEventListener("click",closeCart); scrim.addEventListener("click",closeCart);
$("#continue-shopping").addEventListener("click",closeCart);
$("#cart-items").addEventListener("click",event=>{
  const qty=event.target.closest("[data-qty]"), remove=event.target.closest("[data-remove]");
  if(qty){const id=Number(qty.dataset.qty),next=(state.cart.get(id)||0)+Number(qty.dataset.delta);next<=0?state.cart.delete(id):state.cart.set(id,next);renderCart();}
  if(remove){state.cart.delete(Number(remove.dataset.remove));renderCart();}
});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&drawer.classList.contains("open"))closeCart();});
$("#checkout-button").addEventListener("click",()=>showToast("Demo only — checkout and payment are not connected."));
$("#newsletter-form").addEventListener("submit",event=>{
  event.preventDefault(); const email=$("#email-input").value.trim();
  if(!email)return;
  $("#newsletter-message").textContent="Thanks for joining! This demo does not send or store emails.";
  $("#email-input").value=""; showToast("Thanks for subscribing!");
});
$("#year").textContent=new Date().getFullYear();
renderProducts(); renderCart();
