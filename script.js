{\rtf1\ansi\ansicpg1251\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // \uc0\u1044 \u1072 \u1085 \u1085 \u1099 \u1077  \u1090 \u1086 \u1074 \u1072 \u1088 \u1086 \u1074 \
const PRODUCTS = [\
  \{\
    id: "vanilla-tobacco",\
    name: "\uc0\u1042 \u1072 \u1085 \u1080 \u1083 \u1100  \u1080  \u1090 \u1072 \u1073 \u1072 \u1082 ",\
    note: "\uc0\u1058 \u1105 \u1087 \u1083 \u1099 \u1081 , \u1091 \u1102 \u1090 \u1085 \u1099 \u1081 ",\
    price: 850,\
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop"\
  \},\
  \{\
    id: "orange",\
    name: "\uc0\u1040 \u1087 \u1077 \u1083 \u1100 \u1089 \u1080 \u1085 ",\
    note: "\uc0\u1057 \u1074 \u1077 \u1078 \u1080 \u1081 , \u1094 \u1080 \u1090 \u1088 \u1091 \u1089 \u1086 \u1074 \u1099 \u1081 ",\
    price: 790,\
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop"\
  \},\
  \{\
    id: "pine",\
    name: "\uc0\u1061 \u1074 \u1086 \u1103 ",\
    note: "\uc0\u1051 \u1077 \u1089 \u1085 \u1086 \u1081 , \u1073 \u1086 \u1076 \u1088 \u1103 \u1097 \u1080 \u1081 ",\
    price: 820,\
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop"\
  \},\
  \{\
    id: "cinnamon",\
    name: "\uc0\u1050 \u1086 \u1088 \u1080 \u1094 \u1072 ",\
    note: "\uc0\u1055 \u1088 \u1103 \u1085 \u1099 \u1081 , \u1089 \u1086 \u1075 \u1088 \u1077 \u1074 \u1072 \u1102 \u1097 \u1080 \u1081 ",\
    price: 790,\
    img: "https://images.unsplash.com/photo-1516594915697-87eb3b1c2a87?q=80&w=1000&auto=format&fit=crop"\
  \}\
];\
\
const formatPrice = n => `$\{n.toLocaleString("ru-RU")\} \uc0\u8381 `;\
\
const grid = document.getElementById("productGrid");\
const cartBtn = document.getElementById("openCart");\
const cartModal = document.getElementById("cartModal");\
const closeCart = document.getElementById("closeCart");\
const closeCartBtn = document.getElementById("closeCartBtn");\
const cartCount = document.getElementById("cartCount");\
const cartItems = document.getElementById("cartItems");\
const cartTotal = document.getElementById("cartTotal");\
const clearCartBtn = document.getElementById("clearCart");\
const checkoutForm = document.getElementById("checkoutForm");\
const yearEl = document.getElementById("year");\
const contactForm = document.getElementById("contactForm");\
\
yearEl.textContent = new Date().getFullYear();\
\
// \uc0\u1056 \u1077 \u1085 \u1076 \u1077 \u1088  \u1082 \u1072 \u1090 \u1072 \u1083 \u1086 \u1075 \u1072 \
function renderCatalog()\{\
  grid.innerHTML = PRODUCTS.map(p => `\
    <article class="card">\
      <img src="$\{p.img\}" alt="\uc0\u1057 \u1074 \u1077 \u1095 \u1072  $\{p.name\}">\
      <div class="card-body">\
        <h3>\uc0\u1057 \u1074 \u1077 \u1095 \u1072  \'ab$\{p.name\}\'bb</h3>\
        <p class="note">$\{p.note\}</p>\
        <div class="price">$\{formatPrice(p.price)\}</div>\
        <div class="actions">\
          <button class="btn" data-add="$\{p.id\}">\uc0\u1042  \u1082 \u1086 \u1088 \u1079 \u1080 \u1085 \u1091 </button>\
          <button class="btn btn-secondary" data-buy="$\{p.id\}">\uc0\u1050 \u1091 \u1087 \u1080 \u1090 \u1100 </button>\
        </div>\
      </div>\
    </article>\
  `).join("");\
\}\
renderCatalog();\
\
// \uc0\u1050 \u1086 \u1088 \u1079 \u1080 \u1085 \u1072 \
let CART = JSON.parse(localStorage.getItem("a-candles-cart") || "\{\}");\
\
function saveCart()\{ localStorage.setItem("a-candles-cart", JSON.stringify(CART)); \}\
function countCart()\{\
  const n = Object.values(CART).reduce((s,i)=>s+i.qty,0);\
  cartCount.textContent = n;\
\}\
function cartSum()\{\
  return Object.entries(CART).reduce((sum, [id, item])=>\{\
    const p = PRODUCTS.find(x=>x.id===id);\
    return sum + (p ? p.price * item.qty : 0);\
  \},0);\
\}\
function renderCart()\{\
  if(Object.keys(CART).length===0)\{\
    cartItems.innerHTML = `<p>\uc0\u1042 \u1072 \u1096 \u1072  \u1082 \u1086 \u1088 \u1079 \u1080 \u1085 \u1072  \u1087 \u1091 \u1089 \u1090 \u1072 .</p>`;\
    cartTotal.textContent = formatPrice(0);\
    return;\
  \}\
  cartItems.innerHTML = Object.entries(CART).map(([id, item])=>\{\
    const p = PRODUCTS.find(x=>x.id===id);\
    if(!p) return "";\
    return `\
      <div class="cart-item">\
        <img src="$\{p.img\}" alt="$\{p.name\}">\
        <div>\
          <h4>\uc0\u1057 \u1074 \u1077 \u1095 \u1072  \'ab$\{p.name\}\'bb</h4>\
          <div class="note">$\{p.note\}</div>\
          <div class="price">$\{formatPrice(p.price)\}</div>\
        </div>\
        <div class="cart-qty">\
          <button class="qty-btn" data-dec="$\{id\}">\uc0\u8722 </button>\
          <span>$\{item.qty\}</span>\
          <button class="qty-btn" data-inc="$\{id\}">+</button>\
        </div>\
      </div>\
    `;\
  \}).join("");\
  cartTotal.textContent = formatPrice(cartSum());\
\}\
function addToCart(id, qty=1)\{\
  CART[id] = CART[id] || \{ qty:0 \};\
  CART[id].qty += qty;\
  if (CART[id].qty < 1) delete CART[id];\
  saveCart(); countCart(); renderCart();\
\}\
\
grid.addEventListener("click", (e)=>\{\
  const add = e.target.closest("[data-add]");\
  const buy = e.target.closest("[data-buy]");\
  if(add)\{\
    addToCart(add.getAttribute("data-add"), 1);\
  \}\
  if(buy)\{\
    addToCart(buy.getAttribute("data-buy"), 1);\
    openCartModal();\
  \}\
\});\
\
function openCartModal()\{\
  renderCart(); cartModal.classList.add("show");\
  cartModal.setAttribute("aria-hidden","false");\
\}\
function closeCartModal()\{\
  cartModal.classList.remove("show");\
  cartModal.setAttribute("aria-hidden","true");\
\}\
cartBtn.addEventListener("click", openCartModal);\
closeCart.addEventListener("click", closeCartModal);\
closeCartBtn.addEventListener("click", closeCartModal);\
\
cartItems.addEventListener("click",(e)=>\{\
  const inc = e.target.closest("[data-inc]");\
  const dec = e.target.closest("[data-dec]");\
  if(inc) addToCart(inc.getAttribute("data-inc"), 1);\
  if(dec) addToCart(dec.getAttribute("data-dec"), -1);\
\});\
clearCartBtn.addEventListener("click", ()=>\{\
  CART = \{\}; saveCart(); countCart(); renderCart();\
\});\
\
// Checkout \'97 \uc0\u1092 \u1086 \u1088 \u1084 \u1080 \u1088 \u1091 \u1077 \u1084  \u1087 \u1080 \u1089 \u1100 \u1084 \u1086  \u1080  \u1087 \u1086 \u1076 \u1089 \u1082 \u1072 \u1079 \u1082 \u1091  \u1087 \u1086  \u1057 \u1041 \u1055 \
checkoutForm.addEventListener("submit",(e)=>\{\
  e.preventDefault();\
  if(Object.keys(CART).length===0)\{ alert("\uc0\u1044 \u1086 \u1073 \u1072 \u1074 \u1100 \u1090 \u1077  \u1090 \u1086 \u1074 \u1072 \u1088  \u1074  \u1082 \u1086 \u1088 \u1079 \u1080 \u1085 \u1091 "); return; \}\
  const name = document.getElementById("custName").value.trim();\
  const contact = document.getElementById("custContact").value.trim();\
  const notes = document.getElementById("custNotes").value.trim();\
  const lines = ["\uc0\u1047 \u1072 \u1082 \u1072 \u1079  \u1040 \u1088 \u1086 \u1084 \u1072  \u1043 \u1072 \u1088 \u1086 \u1084 \u1085 \u1080 \u1103 ", "", "\u1055 \u1086 \u1079 \u1080 \u1094 \u1080 \u1080 :"];\
  for(const [id, item] of Object.entries(CART))\{\
    const p = PRODUCTS.find(x=>x.id===id);\
    if(p) lines.push(`- $\{p.name\} \'d7 $\{item.qty\} = $\{p.price*item.qty\} \uc0\u8381 `);\
  \}\
  lines.push("", `\uc0\u1048 \u1090 \u1086 \u1075 \u1086 : $\{cartSum()\} \u8381 `);\
  lines.push(`\uc0\u1048 \u1084 \u1103 : $\{name\}`);\
  lines.push(`\uc0\u1050 \u1086 \u1085 \u1090 \u1072 \u1082 \u1090 : $\{contact\}`);\
  if(notes) lines.push(`\uc0\u1050 \u1086 \u1084 \u1084 \u1077 \u1085 \u1090 \u1072 \u1088 \u1080 \u1081 : $\{notes\}`);\
  lines.push("", "\uc0\u1054 \u1087 \u1083 \u1072 \u1090 \u1072 : \u1057 \u1041 \u1055 . \u1055 \u1088 \u1086 \u1089 \u1100 \u1073 \u1072  \u1074 \u1099 \u1089 \u1083 \u1072 \u1090 \u1100  QR \u1076 \u1083 \u1103  \u1086 \u1087 \u1083 \u1072 \u1090 \u1099 .");\
\
  const body = encodeURIComponent(lines.join("\\n"));\
  const mailto = `mailto:dan182003@yandex.ru?subject=$\{encodeURIComponent("\uc0\u1047 \u1072 \u1082 \u1072 \u1079  \u1089  \u1089 \u1072 \u1081 \u1090 \u1072  \'97 \u1040 \u1088 \u1086 \u1084 \u1072  \u1043 \u1072 \u1088 \u1086 \u1084 \u1085 \u1080 \u1103 ")\}&body=$\{body\}`;\
  window.location.href = mailto;\
\
  alert("\uc0\u1052 \u1099  \u1089 \u1092 \u1086 \u1088 \u1084 \u1080 \u1088 \u1086 \u1074 \u1072 \u1083 \u1080  \u1087 \u1080 \u1089 \u1100 \u1084 \u1086  \u1089  \u1079 \u1072 \u1082 \u1072 \u1079 \u1086 \u1084 . \u1055 \u1086 \u1089 \u1083 \u1077  \u1086 \u1090 \u1087 \u1088 \u1072 \u1074 \u1082 \u1080  \u1084 \u1099  \u1087 \u1088 \u1080 \u1096 \u1083 \u1105 \u1084  QR \u1087 \u1086  \u1057 \u1041 \u1055  \u1085 \u1072  \u1091 \u1082 \u1072 \u1079 \u1072 \u1085 \u1085 \u1099 \u1081  \u1082 \u1086 \u1085 \u1090 \u1072 \u1082 \u1090 .");\
\});\
\
// Contact form => mailto\
if(contactForm)\{\
  contactForm.addEventListener("submit",(e)=>\{\
    e.preventDefault();\
    const fd = new FormData(contactForm);\
    const body = encodeURIComponent(\
      `\uc0\u1048 \u1084 \u1103 : $\{fd.get("name")\}\\nEmail: $\{fd.get("email")\}\\n\\n\u1057 \u1086 \u1086 \u1073 \u1097 \u1077 \u1085 \u1080 \u1077 :\\n$\{fd.get("message")\}`\
    );\
    window.location.href = `mailto:dan182003@yandex.ru?subject=$\{encodeURIComponent("\uc0\u1057 \u1086 \u1086 \u1073 \u1097 \u1077 \u1085 \u1080 \u1077  \u1089  \u1089 \u1072 \u1081 \u1090 \u1072  \'97 \u1040 \u1088 \u1086 \u1084 \u1072  \u1043 \u1072 \u1088 \u1086 \u1084 \u1085 \u1080 \u1103 ")\}&body=$\{body\}`;\
  \});\
\}\
\
// \uc0\u1048 \u1085 \u1080 \u1094 \u1080 \u1072 \u1083 \u1080 \u1079 \u1072 \u1094 \u1080 \u1103 \
countCart();}