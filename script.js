const products = [
    { id: 1, name: "Samsung Galaxy S24 Ultra", cat: "Mobile", desc: "Titanium Gray, 1 TB (12 GB RAM)", img: "https://s7d1.scene7.com/is/image/dmqualcommprod/galaxy-s24ultra-titaniumgray-device-spen-front?$QC_Responsive$&fmt=png-alpha", price: 149999, stars: 5 },
    { id: 2, name: "Lenovo LOQ Intel Core i5 13th Gen 13450HX", cat: "Laptop", desc: "16 GB/512 GB SSD/Windows 11 Home/6 GB Graphics/NVIDIA GeForce RTX 4050", img: "https://p4-ofp.static.pub//fes/cms/2024/05/20/d6onrgwtki5a57q687ztkqftuog5mf017643.png", price: 86990, stars: 4 },
    { id: 3, name: "boAt Stone 358 Bluetooth Speaker", cat: "Audio", desc: "10W, IPX7 Water Resistance, Stereo Sound, Black", img: "https://m.media-amazon.com/images/I/81Dl7qzd40L.jpg", price: 1399, stars: 4 },
    { id: 4, name: "Boat Rockerz 425", cat: "Audio", desc: "Bluetooth Wireless Over Ear Headphones with Mic Signature Sound, Beast Mode for Gaming, Enx Tech, ASAP Charge, 25H Playtime, Bluetooth V5.2", img: "https://m.media-amazon.com/images/I/61XvYOrqVeL.jpg", price: 1499, stars: 5 },
    { id: 5, name: "Apple Watch Series 10", cat: "Wearable", desc: "(GPS, 42mm) Silver Aluminium Case with Denim Sport Band", img: "https://www.designinfo.in/wp-content/uploads/2024/11/Apple-Watch-Series-10-GPS-Cellular-42mm-Jet-Black-Aluminium-Case-with-Black-Sport-Band-ML-2-1.webp", price: 32999, stars: 4 },
    { id: 6, name: "PlayStation®5", cat: "Gaming", desc: "SONY PlayStation 5 1TB SSD Digital Slim Gaming Console With COD (White)", img: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Gaming/Gaming%20Consoles/Images/316950_0_zbxarl.png?updatedAt=1752661693734", price: 54999, stars: 5 },
    { id: 7, name: "Samsung Galaxy Tab S10 Ultra", cat: "Tablet", desc: "256GB Moonstone Grey and keyboard with trackpad", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTohi76z4jxTRNTdb9fZT5kHbmVZiOhIwD86A&s", price: 319999, stars: 4 },
    { id: 8, name: "Smart TV 50in", cat: "TV", desc: "4K HDR, Android OS, 50” immersive display.", img: "https://www.jiomart.com/images/product/original/492579418/onida-139-7-cm-55-inch-ultra-hd-4k-led-smart-tv-55uiv-s-digital-o492579418-p591004127-3-202206212136.jpeg?im=Resize=(420,420)", price: 40999, stars: 5 },
    { id: 9, name: "Sony Alpha 7 IV", cat: "Camera", desc: "Full-frame Mirrorless Interchangeable Lens Camera with 28-70mm Zoom Lens Kit", img: "https://images-cdn.ubuy.co.in/65f314399d244b6db90b1676-sony-alpha-a7-iv-full-frame-mirrorless.jpg", price: 485000, stars: 4 },
    { id: 10, name: "boAt EnergyShroom PB435", cat: "Accessories", desc: "Turbo 20000 mAh Power Bank (Black)", img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=1080/da/cms-assets/cms/product/5824ada5-acaf-4ddc-877c-f34c9cbc61f0.png", price: 1599, stars: 5 },
    { id: 11, name: "Fitness Tracker Lite", cat: "Wearable", desc: "Heart Rate Fitness Watch Black Heart Rate Monitor Fitbit Charge Blood Pressure Fitbit Charge", img: "https://m.media-amazon.com/images/I/61AeGQhwjxL.jpg", price: 2699, stars: 3 },
    { id: 12, name: "USB-C Hub 6in1", cat: "Accessories", desc: "HDMI, 3xUSB, SD reader, ultra-portable.", img: "https://baseusindiaofficial.com/cdn/shop/files/dc964d_9eca34c59cdf46fab27be83b16621fd7mv2.jpg?v=1712573944", price: 1599, stars: 4 }
];

let wishlist = [];
let cart = [];
const filters = { price: 500000, sort: 'relevance', cat: 'All', search: '' };

let carouselIx = 0;
const featuredProducts = [2, 1, 8, 6];

function renderCarousel() {
    const cp = document.getElementById('carouselProduct');
    const prod = products.find(p => p.id === featuredProducts[carouselIx]);
    cp.innerHTML = `
        <div class="carousel-product" role="article" aria-label="${escapeHtml(prod.name)}">
          <img src="${prod.img}" alt="${escapeHtml(prod.name)}">
          <h3>${escapeHtml(prod.name)}</h3>
          <div class="stars" aria-hidden="true">${'★'.repeat(prod.stars)}${'☆'.repeat(5 - prod.stars)}</div>
          <div style="margin-bottom:9px;color:var(--accent);font-weight:700;">&#8377;${prod.price}</div>
          <p>${escapeHtml(prod.desc)}</p>
          <button class="shopbtn" onclick="viewProduct(${prod.id})">View</button>
        </div>
      `;
}

function slideCarousel(delta) {
    carouselIx = (carouselIx + delta + featuredProducts.length) % featuredProducts.length;
    renderCarousel();
}

let carouselTimer = setInterval(() => slideCarousel(1), 6000);
document.getElementById('carousel')?.addEventListener('mouseover', () => clearInterval(carouselTimer));
document.getElementById('carousel')?.addEventListener('mouseleave', () => { carouselTimer = setInterval(() => slideCarousel(1), 6000); });

const categories = ["All", ...new Set(products.map(p => p.cat))];

function renderCategories() {
    const bar = document.getElementById('categoryBar');
    bar.innerHTML = categories.map(c => {
        const active = (filters.cat === c) ? ' active' : '';
        return `<button class="${active}" onclick="filterByCategory('${c}')">${escapeHtml(c)}</button>`;
    }).join('');
}

function filterByCategory(cat) {
    filters.cat = cat;
    renderCategories();
    renderProducts();
}

function searchProducts() {
    filters.search = document.getElementById('searchInput').value.trim().toLowerCase();
    renderProducts();
}
function sortProducts(val) { filters.sort = val; renderProducts(); }
function filterByPrice(val) {
    filters.price = Number(val);
    document.getElementById('priceRangeVal').textContent = val;
    renderProducts();
}

function renderProducts() {
    let list = products.filter(p =>
        (filters.cat === "All" || p.cat === filters.cat) &&
        (filters.search === "" || p.name.toLowerCase().includes(filters.search) || p.desc.toLowerCase().includes(filters.search)) &&
        p.price <= filters.price
    );

    if (filters.sort !== 'relevance') {
        list = list.slice().sort((a, b) => filters.sort === 'lowhigh' ? a.price - b.price : b.price - a.price);
    }

    const grid = document.getElementById('productGrid');
    if (list.length === 0) {
        grid.innerHTML = `<div style="margin:30px auto;font-size:1.12rem;color:var(--muted)">No products found.</div>`;
        return;
    }

    grid.innerHTML = '';
    list.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('role', 'listitem');
        card.innerHTML = `
          <button class="wishlist-btn ${wishlist.includes(prod.id) ? 'active' : ''}" onclick="toggleWishlist(event, ${prod.id})" title="Add to wishlist" aria-pressed="${wishlist.includes(prod.id)}">&#10084;</button>
          <img src="${prod.img}" alt="${escapeHtml(prod.name)}">
          <h3>${escapeHtml(prod.name)}</h3>
          <div class="category">${escapeHtml(prod.cat)}</div>
          <div class="stars" aria-hidden="true">${'★'.repeat(prod.stars)}${'☆'.repeat(5 - prod.stars)}</div>
          <p>${escapeHtml(prod.desc)}</p>
          <div class="price">&#8377; ${prod.price}</div>
          <div class="actions">
            <button class="shopbtn secondary" onclick="viewProduct(${prod.id})">View</button>
            <button class="shopbtn" onclick="animAddToCart(this); addToCart(${prod.id})">Add to Cart</button>
          </div>
        `;
        grid.appendChild(card);
    });
}

function toggleWishlist(ev, id) {
    ev.stopPropagation();
    if (wishlist.includes(id)) wishlist = wishlist.filter(x => x !== id);
    else wishlist.push(id);
    renderProducts();
}

function animAddToCart(btn) {
    btn.classList.add('added-anim');
    setTimeout(() => btn.classList.remove('added-anim'), 650);
}

function addToCart(id) {
    cart.push(id);
    updateCartCount();
    showToast("Added to cart");
}

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

function viewProduct(id) {
    const prod = products.find(p => p.id === id);
    const modal = document.getElementById('productModal');
    const details = document.getElementById('modalDetails');
    details.innerHTML = `
        <img src="${prod.img}" alt="${escapeHtml(prod.name)}" style="width:92%;height:170px;object-fit:cover;border-radius:8px;"><br>
        <h3 id="productTitle">${escapeHtml(prod.name)}</h3>
        <div style="color:#68a668;font-size:.98em;margin-bottom:6px">${escapeHtml(prod.cat)}</div>
        <div class="stars" aria-hidden="true">${'★'.repeat(prod.stars)}${'☆'.repeat(5 - prod.stars)}</div>
        <p>${escapeHtml(prod.desc)}</p>
        <div>Price: <strong style="color:var(--accent);">&#8377;${prod.price}</strong></div>
        <div style="margin-top:12px;">
          <button class="shopbtn" onclick="addToCart(${id}); closeModal('productModal');">Add to Cart</button>
        </div>
      `;
    openModal('productModal');
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    let total = 0;
    cartItems.innerHTML = '';

    if (!cart.length) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.innerHTML = '';
        document.getElementById('checkoutBtn').style.display = 'none';
        return;
    }

    const uniq = [...new Set(cart)];
    uniq.forEach(id => {
        const prod = products.find(p => p.id === id);
        const qty = cart.filter(i => i === id).length;
        total += prod.price * qty;

        const div = document.createElement('div');
        div.innerHTML = `
          <div style="display:flex;align-items:center;gap:10px;">
            <img src="${prod.img}" alt="${escapeHtml(prod.name)}">
            <div style="flex:1;">
              <div style="font-weight:600;">${escapeHtml(prod.name)} x ${qty}</div>
              <div style="font-size:.92rem;color:var(--muted);">₹${prod.price} each</div>
            </div>
            <div>
              <button onclick="removeFromCart(${id})" style="background:#e54141;color:#fff;padding:6px 8px;border-radius:6px;border:none;cursor:pointer;">Remove</button>
            </div>
          </div>
          <div style="margin-top:8px;font-weight:bold;">Price: &#8377;${prod.price * qty}</div>
          <hr style="border:none;border-top:1px solid #eee;margin:12px 0;">
        `;
        cartItems.appendChild(div);
    });

    cartTotal.innerHTML = `<strong>Total: &#8377;${total}</strong>`;
    document.getElementById('checkoutBtn').style.display = 'inline-block';
}

function removeFromCart(id) {
    cart = cart.filter(i => i !== id);
    updateCartCount();
    renderCart();
    showToast("Removed from cart");
}

function checkout() {
    alert("Order placed! (Frontend Demo)");
    cart = [];
    updateCartCount();
    renderCart();
}

function openModal(id) {
    document.getElementById(id).classList.add('show');
    setTimeout(() => {
        const modal = document.getElementById(id);
        modal.querySelector('.modal-content')?.focus?.();
    }, 80);
}
function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

window.addEventListener('click', function (event) {
    const productModal = document.getElementById('productModal');
    const cartModal = document.getElementById('cartModal');
    const aboutModal = document.getElementById('aboutModal');
    if (event.target === productModal) closeModal('productModal');
    if (event.target === cartModal) closeModal('cartModal');
    if (event.target === aboutModal) closeModal('aboutModal');
});

document.getElementById('aboutBtn').onclick = function () { openModal('aboutModal'); };
document.getElementById('cartBtn').onclick = function () { renderCart(); openModal('cartModal'); };

function showToast(msg = '', timeout = 1200) {
    let toast = document.getElementById('__eshop_toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = '__eshop_toast';
        toast.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:26px;background:rgba(0,0,0,0.78);color:#fff;padding:10px 14px;border-radius:10px;z-index:1200;font-weight:600;';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.style.opacity = '0', timeout);
}

function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
        const answer = btn.nextElementSibling;
        const icon = btn.querySelector(".faq-icon");

        document.querySelectorAll(".faq-answer").forEach(a => {
            if (a !== answer) {
                a.style.maxHeight = null;
                a.previousElementSibling.querySelector(".faq-icon").textContent = "+";
            }
        });

        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.textContent = "+";
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.textContent = "–";
        }
    });
});

renderCarousel();
renderCategories();
renderProducts();