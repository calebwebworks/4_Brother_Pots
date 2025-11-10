/*
  script.js
  - Smooth scrolling for nav links
  - Simple DOM helper to generate product placeholders (for concept)
  - Toggle to quickly remove animations if desired (adds `no-animations` to body)
  - Comments explain where to hook real dynamic code or CMS integration
*/

// Quick helper - enable/disable animations programmatically
function disableAnimations(){
  document.body.classList.add('no-animations');
}
function enableAnimations(){
  document.body.classList.remove('no-animations');
}

// If you want animations disabled by default, uncomment the next line:
// disableAnimations();

// Smooth scroll for internal links (modern browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// ------------------------------------------------------------------
// Product placeholders generation (for the concept only)
// Replace with dynamic rendering that fetches from your backend (Firebase/Strapi/etc.)
// ------------------------------------------------------------------
(function generatePlaceholders(){
  // The script only inserts one set if the HTML already contains cards.
  const grid = document.getElementById('productGrid');
  if(!grid) return;

  // If you already have cards in HTML, skip creation. This prevents duplicates.
  const existing = grid.querySelectorAll('.product-card');
  if(existing.length > 2) return; // keep the placeholder set in HTML

  // Example data for placeholders (you can remove this block later)
  const products = [
    {title:'Handmade Terracotta Planter', meta:'1L — indoor', price:'$45', img:'https://via.placeholder.com/540x360.png?text=Pot+1', sale:false},
    {title:'Glazed Planter — Forest Hue', meta:'Medium indoor/outdoor', price:'$60', img:'https://via.placeholder.com/540x360.png?text=Pot+2', sale:false},
    {title:'Large Outdoor Planter', meta:'Durable, frost-resistant', price:'$96', img:'https://via.placeholder.com/540x360.png?text=Pot+3', sale:true, oldPrice:'$120'}
  ];

  // Clear current grid to re-render from JS (comment this out to keep HTML placeholders)
  // grid.innerHTML = '';

  products.forEach(p => {
    const article = document.createElement('article');
    article.className = 'product-card';
    article.innerHTML = `\
      <div class="product-image-wrap">\
        ${p.sale ? '<div class="sale-badge">Sale</div>' : ''}\
        <img src="${p.img}" alt="${p.title}" class="product-image">\
      </div>\
      <div class="product-body">\
        <h3 class="product-title">${p.title}</h3>\
        <p class="product-meta">${p.meta}</p>\
        <div class="product-footer">\
          <div class="price">${p.sale ? `<span class=\"old-price\">${p.oldPrice}</span> ${p.price}` : p.price}</div>\
          <a href="#contact" class="btn btn-sm">Get a Quote</a>\
        </div>\
      </div>`;
    grid.appendChild(article);
  });
})();

// Simple accessibility enhancement: announce when images fail to load (placeholder behaviour)
window.addEventListener('error', function(e){
  if(e.target && e.target.tagName === 'IMG'){
    e.target.style.opacity = '0.6';
  }
}, true);

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const closeBtn = document.getElementById('closeBtn');

// Open mobile nav
hamburger.addEventListener('click', () => {
  mobileNav.style.display = 'flex';
});

// Close mobile nav
closeBtn.addEventListener('click', () => {
  mobileNav.style.display = 'none';
});




// End of script.js