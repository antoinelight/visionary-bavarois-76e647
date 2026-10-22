/* =====================================================
   Westmoor Saddlery – Easy to Edit
   =====================================================
   TO CHANGE IMAGES: replace files in the "images" folder
   (saddle1.jpg, english1.jpg, etc.)
   ===================================================== */

const Cart = {
  get() {
    return JSON.parse(localStorage.getItem('westmoor_cart') || '[]');
  },
  save(items) {
    localStorage.setItem('westmoor_cart', JSON.stringify(items));
    this.updateCount();
  },
  add(product) {
    const items = this.get();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += product.qty || 1;
    } else {
      items.push({ ...product, qty: product.qty || 1 });
    }
    this.save(items);
    alert('✓ ' + product.name + ' added to cart!');
  },
  remove(id) {
    this.save(this.get().filter(i => i.id !== id));
  },
  updateQty(id, qty) {
    const items = this.get();
    const item = items.find(i => i.id === id);
    if (item) {
      item.qty = Math.max(1, qty);
      this.save(items);
    }
  },
  clear() {
    localStorage.removeItem('westmoor_cart');
    this.updateCount();
  },
  total() {
    return this.get().reduce((sum, i) => sum + i.price * i.qty, 0);
  },
  updateCount() {
    const count = this.get().reduce((sum, i) => sum + i.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  }
};


function toggleMenu() {
  const nav = document.getElementById('navLinks');
  if (!nav) return;
  const open = nav.classList.toggle('open');
  document.body.style.overflow = open ? 'hidden' : '';
  let ov = document.getElementById('navOverlay');
  if (open) {
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'navOverlay';
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:150;';
      ov.onclick = toggleMenu;
      document.body.appendChild(ov);
    }
  } else if (ov) {
    ov.remove();
  }
}

/** Menu category links → shop filtered by category */
function bindMenuCategoryLinks() {
  const nav = document.getElementById('navLinks');
  if (!nav || nav.dataset.menuBound === '1') return;
  nav.dataset.menuBound = '1';
  nav.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (!a || !nav.contains(a)) return;
    let href = a.getAttribute('href');
    if (!href || href === '#' || href.startsWith('javascript:')) return;
    e.preventDefault();
    e.stopPropagation();
    nav.classList.remove('open');
    document.body.style.overflow = '';
    const ov = document.getElementById('navOverlay');
    if (ov) ov.remove();
    try {
      href = new URL(href, window.location.href).href;
    } catch (err) {}
    window.location.href = href;
  }, true);
}
document.addEventListener('DOMContentLoaded', bindMenuCategoryLinks);
if (document.readyState !== 'loading') bindMenuCategoryLinks();

// Close menu on resize to desktop
window.addEventListener('resize', function() {
  if (window.innerWidth > 900) {
    const nav = document.getElementById('navLinks');
    if (nav) nav.classList.remove('open');
    document.body.style.overflow = '';
    const ov = document.getElementById('navOverlay');
    if (ov) ov.remove();
  }
});

// Header solid on scroll
window.addEventListener('scroll', function() {
  const h = document.getElementById('mainHeader') || document.querySelector('.header');
  if (h) h.classList.toggle('scrolled', window.scrollY > 40);
});


document.addEventListener('DOMContentLoaded', () => {
  Cart.updateCount();

  document.querySelectorAll('#newsletterForm, #newsletterForm2').forEach(form => {
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        alert('Thank you! You have been subscribed.');
        form.reset();
      });
    }
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Thank you for your message! We will reply within 24 hours.');
      contactForm.reset();
    });
  }

  // Checkout form is handled on checkout.html (Netlify Forms + payment links)
});

/* =====================================================
   PRODUCTS
   Western + English Saddles
   ===================================================== */
const PRODUCTS = [
  // ===== WESTERN SADDLES =====
  {
    id: 1,
    name: '15.5"–16" Crates Hand-Tooled Ladies Reining Saddle 4517',
    category: 'Western',
    price: 2899,
    oldPrice: null,
    image: 'images/crates-reining-1.jpg',
    badge: 'BEST SELLER',
    rating: 4.9,
    reviews: 8,
    desc: 'Crates hand-tooled Ladies Reiner on Equi-Fit tree. Soft grain-out padded seat, basket tooling, 15.5" or 16" seat. American made, approx. 32 lb.'
  },
  {
    id: 2,
    name: '15"–16" Billy Cook Wade Tree Ranch Saddle 2181',
    category: 'Western',
    price: 2499,
    oldPrice: null,
    image: 'images/billy-cook-wade-1.jpg',
    badge: 'BEST SELLER',
    rating: 4.8,
    reviews: 9,
    desc: 'Billy Cook Wade Tree Ranch Saddle 2181. Rawhide-covered tree, 3/4 basket tooling, post horn, 7/8 flat-plate rigging. Heavy-duty ranch work. American made, approx. 42 lb.'
  },
  {
    id: 3,
    name: '15"–17" South Bend Saddle Co Training Saddle 2387',
    category: 'Western',
    price: 1811,
    oldPrice: null,
    image: 'images/south-bend-training-1.jpg',
    badge: 'BEST SELLER',
    rating: 4.9,
    reviews: 10,
    desc: 'South Bend training saddle for shorter-backed horses. Fiberglass-reinforced wood tree, roughout leather, 7/8 double-dee rigging. Seat 15"–17". Approx. 31 lb. American Made.'
  },
  {
    id: 4,
    name: '15"–17" South Bend Saddle Co Training Saddle 1300',
    category: 'Western',
    price: 1899,
    oldPrice: null,
    image: 'images/south-bend-1300-1.jpg',
    badge: null,
    rating: 4.7,
    reviews: 11,
    desc: 'South Bend Training Saddle 1300. Natural roughout leather, black padded seat, stainless hardware. Seat sizes 15"–17". Built for training and everyday work. American Made.'
  },
  {
    id: 5,
    name: '15"–17" Billy Cook Wade Ranch Saddle 2197',
    category: 'Western',
    price: 3500,
    oldPrice: null,
    image: 'images/billy-cook-2197-1.jpg',
    badge: 'BEST SELLER',
    rating: 4.8,
    reviews: 12,
    desc: 'Billy Cook Wade Ranch 2197 for short-backed working horses. Mother Hubbard skirts, rawhide-covered tree, roughout seat & fenders. Seat 15"–17". Made in Sulphur, OK.'
  },
  {
    id: 6,
    name: '15.5"–18.5" Tucker Equitation Endurance Saddle T49',
    category: 'Western',
    price: 3399,
    oldPrice: null,
    image: 'images/tucker-t49-1.jpg',
    badge: 'BEST SELLER',
    rating: 5.0,
    reviews: 13,
    desc: 'Tucker T49 Equitation Endurance. Gel-Cush™ seat, English rigging, ~20 lb. For English crossover riders seeking balanced seat and trail comfort. Made in USA.'
  },

  // ===== ENGLISH SADDLES =====
  {
    id: 7,
    name: '15"–18" Wintec Pro Endurance HART',
    category: 'English',
    price: 1346,
    oldPrice: null,
    image: 'images/wintec-pro-endurance-2.jpg',
    badge: 'BEST SELLER',
    rating: 4.8,
    reviews: 14,
    desc: 'Wintec Pro Endurance HART – only 14.1 lb. CAIR® panels, EASY-CHANGE gullet, Elastiflex tree. Black or brown. Top pick for endurance riders.'
  },
  {
    id: 8,
    name: '16.5"–18" Arena High Wither All Purpose Saddle',
    category: 'English',
    price: 2199,
    oldPrice: null,
    image: 'images/arena-all-purpose-brown.jpg',
    badge: 'BEST SELLER',
    rating: 4.9,
    reviews: 15,
    desc: 'Arena High Wither All Purpose saddle in European leather. Deep seat, well-padded shorter flaps, designed for high-withered horses. Approx. 15 lb. Seat sizes 16.5"–18".'
  },
  {
    id: 9,
    name: '15"–18" Wintec 500 Dressage HART',
    category: 'English',
    price: 833,
    oldPrice: null,
    image: 'images/wintec-500-dressage-2.jpg',
    badge: null,
    rating: 4.7,
    reviews: 16,
    desc: 'Wintec 500 Dressage HART. CAIR® panels, EASY-CHANGE gullet, Elastiflex tree. Supportive seat, easy-care. Great starter/training dressage saddle. $832.50.'
  },
  {
    id: 10,
    name: 'M. Toulouse Annice Close Contact Saddle 3801',
    category: 'English',
    price: 1574,
    oldPrice: null,
    image: 'images/mt-annice-3801-1.jpg',
    badge: 'BEST SELLER',
    rating: 4.8,
    reviews: 17,
    desc: 'M. Toulouse Annice Close Contact 3801. Comfort Fit foam panels, double leather flaps, Adjusta-block knee blocks. Medium-deep seat. Ideal for Hunters & Equitation. $1,574.10.'
  },
  {
    id: 11,
    name: 'M. Toulouse Aachen Dressage Saddle w/ Genesis Tree 2700',
    category: 'English',
    price: 2299,
    oldPrice: null,
    image: 'images/mt-aachen-2700-1.jpg',
    badge: null,
    rating: 4.6,
    reviews: 18,
    desc: 'M. Toulouse Aachen Dressage with Genesis Adjustable Tree. French calf leather, wool flocked panels, Adjusta-Block knee blocks, deep seat. Adjusts Narrow to Extra-Wide.'
  },
  {
    id: 12,
    name: '15"–18" Wintec 250 All Purpose Saddle Flocked',
    category: 'English',
    price: 626,
    oldPrice: null,
    image: 'images/wintec-250-ap-1.jpg',
    badge: 'BEST SELLER',
    rating: 4.9,
    reviews: 19,
    desc: 'Wintec 250 All Purpose Flocked. Hard-wearing, easy-care. EASY-CHANGE gullet, open seat, soft grippy leather. $625.50. Seat 15"–18".'
  },
  {
    id: 13,
    name: '16.5"–18" Arena Jump Saddle AJCXXXXXXX',
    category: 'English',
    price: 1619,
    oldPrice: null,
    image: 'images/arena-jump-1.jpg',
    badge: 'PREMIUM',
    rating: 5.0,
    reviews: 20,
    desc: 'Arena Jump Saddle for competitive show jumping. Deep seat, forward-flanked panels, shorter flaps. European leather. ~13 lb. $1,619.10.'
  },
  {
    id: 14,
    name: 'Black English Competition Saddle',
    category: 'English',
    price: 2599,
    oldPrice: null,
    image: 'images/english9.jpg',
    badge: 'BEST SELLER',
    rating: 4.9,
    reviews: 21,
    desc: 'Sleek black competition saddle with silver logo plate. Perfect for the show ring.'
  },
  {
    id: 15,
    name: 'Brown English Eventing / All-Purpose',
    category: 'English',
    price: 2399,
    oldPrice: null,
    image: 'images/english10.jpg',
    badge: null,
    rating: 4.7,
    reviews: 22,
    desc: 'Durable brown English saddle ideal for eventing and everyday work.'
  },
  {
    id: 16,
    name: 'Dark Brown English Monoflap Saddle',
    category: 'English',
    price: 2699,
    oldPrice: null,
    image: 'images/english11.jpg',
    badge: 'PREMIUM',
    rating: 4.8,
    reviews: 23,
    desc: 'Modern monoflap design in dark brown leather for closer contact.'
  },

  // ===== USED SADDLES =====
  {
    id: 17,
    name: 'Used Custom Trail Saddle Medium Tree 17.5"',
    category: 'Used',
    price: 550,
    oldPrice: null,
    image: 'images/used-custom-trail-1.jpg',
    badge: 'USED',
    rating: 4.4,
    reviews: 9,
    desc: 'Experienced custom trail saddle. 17.5\" leather seat, Medium Poly Solid tree. Full tooling. Item # usco12657.'
  },
  {
    id: 18,
    name: 'Used Brown Western Saddle with Fleece',
    category: 'Used',
    price: 750,
    oldPrice: 1299,
    image: 'images/used2.jpg',
    badge: 'USED',
    rating: 4.4,
    reviews: 8,
    desc: 'Used brown western saddle with sheepskin underside. Solid everyday saddle.'
  },
  {
    id: 19,
    name: 'Used Simco Trail Saddle Medium Tree 3095',
    category: 'Used',
    price: 550,
    oldPrice: null,
    image: 'images/used-simco-trail-1.jpg',
    badge: 'USED',
    rating: 4.5,
    reviews: 12,
    desc: 'Experienced Simco trail saddle. 15.5\" seat, Medium Ralide tree, suede seat. Normal nicks & wear. Item # ussi12578.'
  },
  {
    id: 20,
    name: 'Used Abetta Cordura Trail Saddle Wide Tree 16"',
    category: 'Used',
    price: 550,
    oldPrice: null,
    image: 'images/used-abetta-cordura-1.jpg',
    badge: 'USED',
    rating: 4.3,
    reviews: 11,
    desc: 'Experienced Abetta Cordura trail saddle. 16\" Accusuede seat, Wide Ralide tree. Lightweight. Item # usbe12623.'
  },
  {
    id: 21,
    name: 'Used Big Horn Endurance Saddle Medium Tree 118 16"',
    category: 'Used',
    price: 650,
    oldPrice: null,
    image: 'images/used-big-horn-endurance-1.jpg',
    badge: 'USED',
    rating: 4.4,
    reviews: 9,
    desc: 'Experienced Big Horn endurance saddle. 16\" leather seat, Medium fiberglass-covered wood tree. Item # usbh12014.'
  },
  {
    id: 22,
    name: 'Used Karl Niedersuss Dressage Saddle 17.5"',
    category: 'Used',
    price: 646,
    oldPrice: null,
    image: 'images/used-karl-niedersuss-1.jpg',
    badge: 'USED',
    rating: 4.4,
    reviews: 8,
    desc: 'Experienced Karl Niedersuss dressage saddle. 17.5\" leather seat, Medium wood tree. Item # uskn10965.'
  },
  {
    id: 23,
    name: 'Used Tex Tan Trail Saddle Medium Tree 15"',
    category: 'Used',
    price: 625,
    oldPrice: null,
    image: 'images/used-tex-tan-1.jpg',
    badge: 'USED',
    rating: 4.5,
    reviews: 10,
    desc: 'Experienced Tex Tan trail saddle. 15\" suede seat, Medium Ralide tree. Full tooling. Item # ustt12128.'
  },
  {
    id: 24,
    name: 'Used Custom Treeless Endurance Saddle Wide 16.5"',
    category: 'Used',
    price: 649,
    oldPrice: null,
    image: 'images/used-treeless-endurance-1.jpg',
    badge: 'USED',
    rating: 4.5,
    reviews: 7,
    desc: 'Experienced custom treeless endurance saddle. 16.5\" suede seat, Wide fit. Lightweight. Item # usco12555.'
  },
  {
    id: 25,
    name: 'Used Smooth Leather Western Saddle',
    category: 'Used',
    price: 550,
    oldPrice: 999,
    image: 'images/used9.jpg',
    badge: 'USED',
    rating: 4.3,
    reviews: 10,
    desc: 'Classic used smooth leather western saddle. Well broken-in and comfortable.'
  },
  {
    id: 26,
    name: 'Used Abetta Cordura Trail Saddle 17"',
    category: 'Used',
    price: 699,
    oldPrice: null,
    image: 'images/used-abetta-cordura-17-1.jpg',
    badge: 'USED',
    rating: 4.5,
    reviews: 8,
    desc: 'Experienced black Abetta Cordura trail saddle. 17\" seat. Lightweight and durable. Item # usbe12648.'
  },

  {
    id: 50,
    name: 'King Series Eclipse Barrel Saddle KS92',
    category: 'Kids',
    price: 198,
    oldPrice: null,
    image: 'images/ks92-black-1.jpg',
    badge: 'KIDS',
    rating: 4.0,
    reviews: 4,
    desc: 'Lightweight King Series Eclipse barrel saddle. Seat sizes 10\"–17\". Multiple colors. Perfect for youth & adult riders.'
  },
  {
    id: 51,
    name: 'King Series Youth Braden Trail Saddle KS2632',
    category: 'Kids',
    price: 270,
    oldPrice: null,
    image: 'images/ks2632-black-1.jpg',
    badge: 'KIDS',
    rating: 4.2,
    reviews: 5,
    desc: 'Youth Braden Trail Saddle. Rawhide-covered tree, Drop D rigging, padded seat. Approx 22 lbs. Item # ks2632.'
  },
  {
    id: 52,
    name: 'Youth Cowboy Roughout with Serpentine Tooling',
    category: 'Kids',
    price: 306,
    oldPrice: null,
    image: 'images/ks1822-roughout-1.jpg',
    badge: 'KIDS',
    rating: 4.1,
    reviews: 4,
    desc: 'Youth Cowboy Roughout with Serpentine Tooling. Rawhide tree, pony bars, Drop D rigging. Item # ks1822-31.'
  },
  {
    id: 53,
    name: 'Royal King Hawley Barrel Saddle 10"-12"',
    category: 'Kids',
    price: 362,
    oldPrice: null,
    image: 'images/rk240-hawley-1.jpg',
    badge: 'KIDS',
    rating: 4.3,
    reviews: 6,
    desc: 'Royal King Hawley Barrel Saddle. Two-tone antiqued floral tooling, deep seat, lightweight fiberglass tree. Item # rk240-rk242.'
  },
  {
    id: 54,
    name: '12" Abetta Original Youth Saddle 20501-Y',
    category: 'Kids',
    price: 374,
    oldPrice: null,
    image: 'images/abetta-20501y-1.jpg',
    badge: 'KIDS',
    rating: 4.2,
    reviews: 5,
    desc: '12" Abetta Original Youth. Poly-Solid tree, nylon construction, only 7 lbs. Item # be20501-Y.'
  },
  {
    id: 55,
    name: 'Double T Youth Hard Seat Barrel – Cactus & Sunflower',
    category: 'Kids',
    price: 378.95,
    oldPrice: null,
    image: 'images/double-t-cactus-1.jpg',
    badge: 'KIDS',
    rating: 4.3,
    reviews: 5,
    desc: 'Double T Youth Hard Seat Barrel with cactus & sunflower beaded accents. Seat 10"-13". Item # sh15862.'
  },
  {
    id: 56,
    name: 'Used Circle Y Barrel Saddle Wide Tree 2201 14"',
    category: 'Used',
    price: 1750,
    oldPrice: null,
    image: 'images/used-circle-y-barrel-2201-1.jpg',
    badge: 'USED',
    rating: 4.0,
    reviews: 0,
    desc: 'Used Circle Y Barrel 2201. Wide Durahide tree, 14" suede seat, in-skirt rigging. Item # uscy12031.'
  },
  {
    id: 57,
    name: 'Wintec Youth Synthetic Western Saddle 12"/13"',
    category: 'Kids',
    price: 424.95,
    oldPrice: null,
    image: 'images/wintec-youth-brown-1.jpg',
    badge: 'KIDS',
    rating: 4.1,
    reviews: 4,
    desc: 'Wintec Youth Synthetic Western. Equi-Suede seat, synthetic leather, seats 12" & 13". Black or Brown. Item # wi2433-JR.'
  },
  {
    id: 58,
    name: 'Professionals Choice Double Weave Navajo Saddle Blanket NB5 32"x64"',
    category: 'Pads',
    price: 34.95,
    oldPrice: null,
    image: 'images/pc-navajo-nb5-brown.jpg',
    badge: 'PAD',
    rating: 4.2,
    reviews: 8,
    desc: 'Professionals Choice Double Weave Navajo NB5. 32" x 64", multiple colors, leather wear leathers. Item # ppcnb5.'
  },
  {
    id: 59,
    name: 'Troxel Dakota Grizzly Brown All-Trails Helmet 04-317',
    category: 'Accessories',
    price: 101.95,
    oldPrice: null,
    image: 'images/troxel-dakota-grizzly-1.jpg',
    badge: 'HELMET',
    rating: 4.4,
    reviews: 6,
    desc: 'Troxel Dakota All-Trails Helmet. Grizzly Brown, SureFit Pro, extended visor, lightweight. Model 04-317.'
  },
  {
    id: 60,
    name: 'IR4G Matte Black Finish Helmet IRH3312',
    category: 'Accessories',
    price: 196.95,
    oldPrice: null,
    image: 'images/ir4g-matte-black-1.jpg',
    badge: 'HELMET',
    rating: 4.3,
    reviews: 4,
    desc: 'IR4G Matte Black Finish with Matte Black Vent. Comfort wrap-around by IRH. Item # hlir3312.'
  },
  {
    id: 61,
    name: 'Troxel Sierra Western Riding Helmet 04-369 Brown',
    category: 'Accessories',
    price: 194.95,
    oldPrice: null,
    image: 'images/troxel-sierra-brown-1.jpg',
    badge: 'HELMET',
    rating: 4.4,
    reviews: 5,
    desc: 'Troxel Sierra Western Helmet 04-369. Brown, ASTM/SEI, GPS III fit, ultra-lightweight. Item # hlsierra-br.'
  },
  {
    id: 62,
    name: 'Weaver Original Adjustable Chin & Throat Snap Halter',
    category: 'Accessories',
    price: 28.95,
    oldPrice: null,
    image: 'images/weaver-halter-pink.jpg',
    badge: 'ACCESSORY',
    rating: 4.9,
    reviews: 8,
    desc: 'Weaver Original Adjustable Chin & Throat Snap Halter. Premium 1" nylon, adjustable chin & crown, solid brass throat snap. Multiple colors. Item # hwv35-7035.'
  },
  {
    id: 63,
    name: '5 Star "The All-Around" Saddle Pad',
    category: 'Pads',
    price: 233.95,
    oldPrice: null,
    image: 'images/5star-allaround-natural.jpg',
    badge: '#1 SELLING',
    rating: 4.9,
    reviews: 9,
    desc: '5 Star The All-Around 30"x30" pure virgin wool pad. French curve & wither slope. Multiple colors & thicknesses (1/2"–1 1/8"). Made in USA. Item # p5s-STD / p5s-FULL.'
  },
  {
    id: 64,
    name: 'Tucker Girth for Enduro Balance Rigging',
    category: 'Accessories',
    price: 89.95,
    oldPrice: null,
    image: 'images/tucker-enduro-girth.jpg',
    badge: 'ACCESSORY',
    rating: 4.7,
    reviews: 10,
    desc: 'Tucker girth for Enduro Balance Rigging. 1 1/4" stainless steel buckles, zip-off neoprene for easy cleaning, elastic on one end. Stainless steel hardware. Various sizes.'
  },
  {
    id: 65,
    name: 'Myler Comfort Snaffle Bit Level 1 – MB03',
    category: 'Accessories',
    price: 203.95,
    oldPrice: null,
    image: 'images/myler-comfort-snaffle.jpg',
    badge: 'BIT',
    rating: 4.8,
    reviews: 11,
    desc: 'Myler Comfort Snaffle Level 1. 5" sweet iron comfort snaffle with copper roller. Stainless steel 7" flat shank. Ideal for young/green horses. Item # bitmy89-11035.'
  },
  {
    id: 66,
    name: 'Billy Cook Breast Collar 12-723',
    category: 'Accessories',
    price: 237.95,
    oldPrice: null,
    image: 'images/billy-cook-breast-collar-medium.jpg',
    badge: 'ACCESSORY',
    rating: 4.9,
    reviews: 12,
    desc: 'Billy Cook breast collar 12-723. 2 1/4" doubled & stitched leather, waffle design, stainless steel hardware. Perfect for long hours. Colors: Chestnut and more. Item # bcbi12-723.'
  },
  {
    id: 67,
    name: 'Tucker Shotgun Scabbard 141',
    category: 'Accessories',
    price: 239.99,
    oldPrice: null,
    image: 'images/tucker-shotgun-scabbard.jpg',
    badge: 'ACCESSORY',
    rating: 4.6,
    reviews: 19,
    desc: 'Tucker Shotgun Scabbard 141. Heavy weight leather, fleece lined, 39" long. Black or Brown with brass. Item # mitk141.'
  },
  {
    id: 69,
    name: '5 Star 100% Mohair Roper Cinch',
    category: 'Accessories',
    price: 110.95,
    oldPrice: null,
    image: 'images/5star-mohair-roper-cinch.jpg',
    badge: 'CINCH',
    rating: 4.8,
    reviews: 13,
    desc: '5 Star 100% Mohair Roper Cinch. Handmade in USA. 31-strand woven, 8-ply, 8.5" center. Flat stainless steel D-rings. Item # gi5sroper.'
  },
  {
    id: 70,
    name: 'Latigo Tie Strap 296',
    category: 'Accessories',
    price: 39.99,
    oldPrice: null,
    image: 'images/latigo-tie-strap-brown.jpg',
    badge: 'ACCESSORY',
    rating: 4.7,
    reviews: 14,
    desc: 'Latigo Tie Strap 296. Replacement for Enduro-Balance Single Tie & Adjustable Position Close Contact. 1 1/2\" x 7 ft. Burgundy or black.'
  },
  {
    id: 71,
    name: 'Saddle Strings 222',
    category: 'Accessories',
    price: 5.99,
    oldPrice: null,
    image: 'images/saddle-strings-black.jpg',
    badge: 'ACCESSORY',
    rating: 4.6,
    reviews: 15,
    desc: 'Tucker Saddle Strings 222. 3/8" x 60". Sold as one individual string (order 2 for a pair). Black or burgundy.'
  },
  {
    id: 72,
    name: 'Cashel Snap-On Lunch Bag',
    category: 'Accessories',
    price: 29.95,
    oldPrice: null,
    image: 'images/cashel-lunch-bag-brown.jpg',
    badge: 'ACCESSORY',
    rating: 4.5,
    reviews: 16,
    desc: 'Cashel Snap-On Lunch Bag. Insulated, alligator snap + anchor loop. 6.5" W x 7" H x 1.5" D. Black or brown. Mesh side pocket.'
  },
  {
    id: 73,
    name: "Men's Justin Stampede Drywall Steel Toe Work Boot SE961",
    category: 'Men Boots',
    price: 189.95,
    oldPrice: null,
    image: 'images/justin-se961-hero.jpg',
    badge: "MEN'S BOOTS",
    rating: 4.7,
    reviews: 17,
    desc: "Men's Justin Stampede Drywall Steel Toe Work Boot SE961. Waterproof full grain leather, steel toe, EH rated, ASTM F2413. 8\" tall, J-Flex Comfort System."
  },
  {
    id: 74,
    name: "Men's Justin Temple Black Farm & Ranch Boots JB3000",
    category: 'Men Boots',
    price: 134.95,
    oldPrice: null,
    image: 'images/justin-jb3000-side.jpg',
    badge: "MEN'S BOOTS",
    rating: 4.8,
    reviews: 18,
    desc: "Men's Justin Temple Black Farm & Ranch Boots JB3000. 10\" Black Cow upper, cushion insole, rubber outsole. Style # JB3000. Item # mbjbjb3000."
  },
  {
    id: 75,
    name: "Men's Justin Temple Clay Brown Farm & Ranch Boots JB3001",
    category: 'Men Boots',
    price: 120.95,
    oldPrice: null,
    image: 'images/justin-jb3001-side.jpg',
    badge: "MEN'S BOOTS",
    rating: 4.7,
    reviews: 19,
    desc: "Men's Justin Temple Clay Brown 10\" Farm & Ranch Boots JB3001. Distressed chocolate brown cowhide, round toe, walking heel. Item # mbjbjb3001."
  },
  {
    id: 76,
    name: "Men's Justin Trencher 11\" Waterproof Steel Toe PD4067",
    category: 'Men Boots',
    price: 149.95,
    oldPrice: null,
    image: 'images/justin-pd4067-side.jpg',
    badge: "MEN'S BOOTS",
    rating: 4.8,
    reviews: 20,
    desc: "Men's Justin Trencher 11\" Waterproof Steel Toe PD4067. Water buffalo leather, EH rated, oil & slip resisting. Item # mbjbpd4067."
  },
  {
    id: 77,
    name: "Men's Justin Quincy 11\" Sueded Ostrich CX5081",
    category: 'Men Boots',
    price: 279.95,
    oldPrice: null,
    image: 'images/justin-cx5081-side.jpg',
    badge: "MEN'S BOOTS",
    rating: 4.9,
    reviews: 21,
    desc: "Men's Justin Quincy 11\" Sueded Ostrich CX5081. Smooth ostrich vamp, wide square toe, J-Flex + Ortholite insole, 1 1/8\" block heel."
  },
  {
    id: 78,
    name: "Men's Tony Lama Bonham Smooth Ostrich Western Boot CT871",
    category: 'Men Boots',
    price: 249.95,
    oldPrice: null,
    image: 'images/tony-lama-ct871-side.jpg',
    badge: "MEN'S BOOTS",
    rating: 4.8,
    reviews: 22,
    desc: "Men's Tony Lama Bonham Smooth Ostrich Western Boot CT871. Black, 13\" height, medium round toe, 3/4 welt, leather outsole."
  },
  {
    id: 79,
    name: "Men's Ferrini Pinto Western Boot 1169307",
    category: 'Men Boots',
    price: 219.00,
    oldPrice: 279.00,
    image: 'images/ferrini-pinto-side.jpg',
    badge: "CLEARANCE",
    rating: 4.7,
    reviews: 23,
    desc: "Men's Ferrini Pinto Western Boot 1169307. Ostrich patch vamp, 13\" shaft, square toe. Color Kango. Item # mbfr1169307. Save $60."
  },
  {
    id: 80,
    name: "Men's Justin Rush Waterproof Lace-Up Work Boot SE465",
    category: 'Men Boots',
    price: 148.46,
    oldPrice: null,
    image: 'images/justin-se465-side.jpg',
    badge: "MEN'S BOOTS",
    rating: 4.6,
    reviews: 8,
    desc: "Men's Justin Rush Waterproof Lace-Up Work Boot SE465. 6\" cowhide, Ortholite insole, color Barley. Item # mbjbSE465."
  },
  {
    id: 81,
    name: "Men's Justin Bristol 6\" Waterproof Steel Toe Work Boot",
    category: 'Men Boots',
    price: 194.95,
    oldPrice: null,
    image: 'images/justin-bristol-side.jpg',
    badge: "MEN'S BOOTS",
    rating: 4.7,
    reviews: 9,
    desc: "Men's Justin Bristol 6\" Waterproof Steel Toe Work Boot. Cowhide vamp, EH rated, oil & slip resisting. Color Hazel."
  },
  {
    id: 82,
    name: "Men's Justin Lubbock Distressed 11\" Square Toe Boots SE7526",
    category: 'Men Boots',
    price: 179.95,
    oldPrice: null,
    image: 'images/justin-lubbock-side.jpg',
    badge: "MEN'S BOOTS",
    rating: 4.6,
    reviews: 10,
    desc: "Men's Justin Lubbock Distressed 11\" Square Toe Boots SE7526. Distressed brown water buffalo vamp, stone grey shaft. Item # mbjbSE7526."
  },
  {
    id: 83,
    name: "Laredo Atlanta Boots 68086",
    category: 'Men Boots',
    price: 125.95,
    oldPrice: 175.95,
    image: 'images/laredo-atlanta-side.jpg',
    badge: "CLEARANCE",
    rating: 4.5,
    reviews: 11,
    desc: "Laredo Atlanta Boots 68086. Peanut color, 13\" height, narrow toe, hinged cushion insole. Price reduced."
  },
  {
    id: 84,
    name: "Men's Roper American Flag Western Boots 0903-2044",
    category: 'Men Boots',
    price: 159.95,
    oldPrice: null,
    image: 'images/roper-american-flag-side.jpg',
    badge: "MEN'S BOOTS",
    rating: 4.6,
    reviews: 12,
    desc: "Men's Roper American Flag Western Boots 0903-2044. Bold patriotic design, square toe, 12\" shaft. Item # mbrp0903-2044."
  },
  {
    id: 85,
    name: "Men's Rocky Alpha Force Zipper Waterproof Public Service Boot FQ000217",
    category: 'Men Boots',
    price: 149.95,
    oldPrice: null,
    image: 'images/rocky-alpha-force-side.jpg',
    badge: "MEN'S BOOTS",
    rating: 4.7,
    reviews: 13,
    desc: "Men's Rocky Alpha Force Zipper Waterproof Public Service Boot FQ000217. 8\" waterproof, side zipper, RigiTrac outsole."
  },
  {
    id: 86,
    name: "Men's Dan Post Franklin Leather Boots DP2815",
    category: 'Men Boots',
    price: 269.95,
    oldPrice: null,
    image: 'images/dan-post-franklin-side.jpg',
    badge: "MEN'S BOOTS",
    rating: 4.8,
    reviews: 14,
    desc: "Men's Dan Post Franklin Leather Boots DP2815. Sand/Dark Chocolate, square toe, 11\" shaft, Ultimate Gel-Flex insole. Item # mbdp2815."
  },

  // ===== HORSE RUGS =====
  {
    id: 87,
    name: "WeatherBeeta 100g Stable Rug - Navy/Burgundy",
    category: 'Horse Rugs',
    price: 44.95,
    oldPrice: null,
    image: 'images/weatherbeeta-100g-stable-full.jpg',
    badge: "STABLE RUG",
    rating: 4.5,
    reviews: 15,
    desc: "WeatherBeeta 100g Stable Rug Navy/Burgundy. 600D outer, 100g polyfill, anti-static lining. Everyday stable warmth."
  },
  {
    id: 88,
    name: "Horseware Rhino Plus VL 250g Turnout - Hunter Check",
    category: 'Horse Rugs',
    price: 224.95,
    oldPrice: null,
    image: 'images/rhino-250g-turnout-full.jpg',
    badge: "TURNOUT",
    rating: 4.8,
    reviews: 16,
    desc: "Horseware Rhino Plus Vari-Layer 250g Turnout Hunter Check/Green Navy. 1000D, waterproof barrier, detachable hood. Limited edition."
  },
  {
    id: 89,
    name: "John Whitaker Kelsea 250g Combo Turnout - Black Snake Print",
    category: 'Horse Rugs',
    price: 55.95,
    oldPrice: 99.95,
    image: 'images/jw-kelsea-250g-full.jpg',
    badge: "SALE",
    rating: 4.6,
    reviews: 18,
    desc: "John Whitaker Kelsea 250g Combo Turnout Black Snake Print. Detachable hood, 250g fill, trigger-clip chest. Sale price."
  },
  {
    id: 90,
    name: "Imperial Riding Super Dry 0g Turnout - Grey Herringbone",
    category: 'Horse Rugs',
    price: 97.95,
    oldPrice: null,
    image: 'images/ir-superdry-0g-side.jpg',
    badge: "TURNOUT",
    rating: 4.5,
    reviews: 17,
    desc: "Imperial Riding Super Dry 0g Turnout Grey Herringbone. Waterproof unfilled rug for field/paddock. Gusset, cross surcingles."
  },
  {
    id: 91,
    name: "Imperial Riding Super Dry 0g Turnout - Taupe Herringbone",
    category: 'Horse Rugs',
    price: 97.95,
    oldPrice: null,
    image: 'images/ir-superdry-0g-taupe-side.jpg',
    badge: "TURNOUT",
    rating: 4.5,
    reviews: 18,
    desc: "Imperial Riding Super Dry 0g Turnout Taupe Herringbone. Waterproof unfilled rug for field/paddock. Same fit as Grey."
  },
  {
    id: 92,
    name: "Horseware Rambo Stable Plus Vari-Layer Heavy 450g - Navy",
    category: 'Horse Rugs',
    price: 249.95,
    oldPrice: null,
    image: 'images/rambo-stable-plus-450-main.jpg',
    badge: "HEAVY STABLE",
    rating: 4.8,
    reviews: 19,
    desc: "Rambo Stable Plus with Vari-Layer Heavy 450g. Navy/White. Maximum stable warmth. Code 255IP."
  },
  {
    id: 93,
    name: "LeMieux Arika Stable-Tek 350g - Navy",
    category: 'Horse Rugs',
    price: 179.95,
    oldPrice: null,
    image: 'images/lemieux-arika-stabletek-350.jpg',
    badge: "STABLE",
    rating: 4.7,
    reviews: 20,
    desc: "LeMieux Arika Stable-Tek 350g Navy. Quilted stable rug with new trim. Code 19736IP."
  },
  {
    id: 94,
    name: "LeMieux Arika Check Combo with Neck - White/Navy",
    category: 'Horse Rugs',
    price: 189.95,
    oldPrice: null,
    image: 'images/lemieux-arika-check-full.jpg',
    badge: "COMBO",
    rating: 4.7,
    reviews: 21,
    desc: "LeMieux Arika check pattern combo with full neck cover. White/navy. Secure chest and surcingles."
  },
  {
    id: 95,
    name: "Tempest Original Quilted Rug - Black/Orange",
    category: 'Horse Rugs',
    price: 129.95,
    oldPrice: null,
    image: 'images/tempest-original-black.jpg',
    badge: "STABLE",
    rating: 4.5,
    reviews: 22,
    desc: "Tempest Original quilted stable/turnout style rug. Black with orange trim. Full neck."
  },
  {
    id: 96,
    name: "Women's Laredo Lydia Sand Leather Boot 5603",
    category: 'Women Boots',
    price: 159.95,
    oldPrice: null,
    image: 'images/laredo-lydia-5603-main.jpg',
    badge: "WOMEN'S",
    rating: 4.6,
    reviews: 14,
    desc: "Women's Laredo Lydia Stockman Boot 5603. Sand leather foot, embroidered shaft with studs, broad square toe, 1\" stockman heel, removable orthotic. Style 5603."
  },
  {
    id: 97,
    name: "Women's Dan Post Sugar Leather Boots DP4999",
    category: 'Women Boots',
    price: 216.95,
    oldPrice: null,
    image: 'images/danpost-sugar-dp4999-main.jpg',
    badge: "WOMEN'S",
    rating: 4.7,
    reviews: 18,
    desc: "Women's Dan Post Sugar Leather Boots DP4999. White distressed leather, blue stitching, square toe, 12\" shaft, 1\" stockman heel, removable orthotic. Item fbdp4999."
  },
  {
    id: 98,
    name: "Women's Dan Post Hallie Leather Boots DP4027",
    category: 'Women Boots',
    price: 304.95,
    oldPrice: null,
    image: 'images/danpost-hallie-dp4027-main.jpg',
    badge: "WOMEN'S",
    rating: 4.7,
    reviews: 16,
    desc: "Women's Dan Post Hallie DP4027. Distressed black leather, 15 inch shaft, snip toe, 1.75 inch cowboy heel, leather outsole, removable orthotic."
  },
  {
    id: 99,
    name: "Women's Dan Post Jilted Leather Boots DP3709",
    category: 'Women Boots',
    price: 309.95,
    oldPrice: null,
    image: 'images/danpost-jilted-dp3709-main.jpg',
    badge: "WOMEN'S",
    rating: 4.8,
    reviews: 12,
    desc: "Women's Dan Post Jilted DP3709. Chocolate brown, 20 inch tall shaft with zipper, snip toe, 2.5 inch fashion heel, slouchy western style. Item fbdp3709."
  },
  {
    id: 100,
    name: "Women's Dan Post Vintage Bluebird Leather Boots DP3544",
    category: 'Women Boots',
    price: 299.95,
    oldPrice: null,
    image: 'images/danpost-bluebird-dp3544-main.jpg',
    badge: "WOMEN'S",
    rating: 4.8,
    reviews: 14,
    desc: "Women's Dan Post Vintage Bluebird DP3544. Chocolate foot with teal shaft, floral and bird embroidery, heart accents, 11 inch shaft, snip toe, 1.75 inch cowboy heel, leather outsole, removable orthotic."
  },
  {
    id: 101,
    name: "Women's Ariat Heritage Distressed Brown Lacer II Boots 10002147",
    category: 'Women Boots',
    price: 169.95,
    oldPrice: null,
    image: 'images/ariat-heritage-lacer-ii-main.jpg',
    badge: "WOMEN'S",
    rating: 4.6,
    reviews: 4,
    desc: "Women's Ariat Heritage Lacer II Distressed Brown. Lace-up with double kiltie fringe, wide square toe, ATS midsole, Duratread rubber sole. Item fbar2147. Wide sizes 6-9."
  },

  // ===== SADDLE PADS =====
  {
    id: 27,
    name: 'Reinsman Southwestern Pattern Saddle Pad',
    category: 'Pads',
    price: 189,
    oldPrice: null,
    image: 'images/pad1.jpg',
    badge: null,
    rating: 4.8,
    reviews: 23,
    desc: 'Classic Southwestern patterned pad with black fleece underside. Comfortable and durable.'
  },
  {
    id: 28,
    name: '5 Star Wool Felt Saddle Pad',
    category: 'Pads',
    price: 225,
    oldPrice: null,
    image: 'images/pad2.jpg',
    badge: 'BEST SELLER',
    rating: 4.9,
    reviews: 8,
    desc: 'Premium 5 Star wool felt pad with leather wear pads. Excellent shock absorption.'
  },
  {
    id: 29,
    name: 'Reinsman Teal Southwestern Pad',
    category: 'Pads',
    price: 179,
    oldPrice: null,
    image: 'images/pad3.jpg',
    badge: null,
    rating: 4.7,
    reviews: 9,
    desc: 'Teal and gray Southwestern design pad with contoured fit and mesh sides.'
  },
  {
    id: 30,
    name: 'Navajo Pattern Fleece Saddle Pad',
    category: 'Pads',
    price: 149,
    oldPrice: null,
    image: 'images/pad4.jpg',
    badge: null,
    rating: 4.6,
    reviews: 10,
    desc: 'Colorful Navajo-style pad with thick fleece underside for extra comfort.'
  },
  {
    id: 31,
    name: 'CoolBack Fleece Saddle Pad – Brown',
    category: 'Pads',
    price: 135,
    oldPrice: null,
    image: 'images/pad5.jpg',
    badge: null,
    rating: 4.5,
    reviews: 11,
    desc: 'Soft brown CoolBack fleece pad. Breathable and great for everyday riding.'
  },
  {
    id: 32,
    name: 'Tacky Too Black Contoured Pad',
    category: 'Pads',
    price: 165,
    oldPrice: null,
    image: 'images/pad6.jpg',
    badge: null,
    rating: 4.7,
    reviews: 12,
    desc: 'Black Tacky Too contoured pad with non-slip surface. Stays in place.'
  },
  {
    id: 33,
    name: 'Tucker Black Wool Felt Pad',
    category: 'Pads',
    price: 199,
    oldPrice: null,
    image: 'images/pad7.jpg',
    badge: null,
    rating: 4.8,
    reviews: 13,
    desc: 'Tucker black wool felt pad with leather wear tabs. Built for long rides.'
  },
  {
    id: 34,
    name: '5 Star Gray Wool Pad with Leather',
    category: 'Pads',
    price: 235,
    oldPrice: null,
    image: 'images/pad8.jpg',
    badge: 'PREMIUM',
    rating: 4.9,
    reviews: 14,
    desc: 'Premium 5 Star gray wool pad with full leather wear pads. Top quality.'
  },
  {
    id: 35,
    name: 'Tucker Dark Wool Contoured Pad',
    category: 'Pads',
    price: 189,
    oldPrice: null,
    image: 'images/pad9.jpg',
    badge: null,
    rating: 4.6,
    reviews: 15,
    desc: 'Dark wool contoured pad from Tucker. Excellent fit and durability.'
  },
  {
    id: 36,
    name: 'Black & Navy Quilted Saddle Pad',
    category: 'Pads',
    price: 89,
    oldPrice: null,
    image: 'images/pad10.jpg',
    badge: null,
    rating: 4.4,
    reviews: 18,
    desc: 'Lightweight black and navy quilted pad with mesh panels for airflow.'
  },
  // ===== HIGH HORSE / DAISETTA =====
  {
    id: 37,
    name: 'High Horse Daisetta Cordura Trail Saddle 6914',
    category: 'Western',
    price: 1899,
    oldPrice: null,
    image: 'images/daisetta-cordura-1.jpg',
    badge: 'NEW',
    rating: 4.9,
    reviews: 16,
    desc: 'Lightweight 21 lb Cordura trail saddle with border tooling, tall cantle, and adjustable flat-plate rigging. Ideal for shorter-backed horses. Made in the USA.'
  },
  {
    id: 38,
    name: '15"–17" Big Horn Light Weight Haflinger Saddle 286',
    category: 'Western',
    price: 1499,
    oldPrice: null,
    image: 'images/big-horn-haflinger-1.jpg',
    badge: 'NEW',
    rating: 4.8,
    reviews: 18,
    desc: 'Big Horn lightweight Haflinger saddle, extra wide. Steele EquiFit tree, Cordura skirts, ~22 lb. Built for Draft, Haflinger, Fjord & Gypsy Vanner. Seat 15"–17".'
  },
  {
    id: 39,
    name: '15"–17" Circle Y Julie Goodnight Cascade Crossover Flex2 Trail 1753',
    category: 'Western',
    price: 2399,
    oldPrice: null,
    image: 'images/circle-y-1753-2.jpg',
    badge: 'NEW',
    rating: 4.9,
    reviews: 17,
    desc: 'Circle Y Julie Goodnight Cascade Crossover Flex2 Trail 1753. Flex2 tree, impact foam seat, tunnel skirt. ~23 lb. Seat 15"–17". American Made.'
  },
  {
    id: 40,
    name: '16"–18" Bates All Purpose Heritage SC Saddle 002',
    category: 'English',
    price: 2246,
    oldPrice: null,
    image: 'images/bates-ap-sc-1.jpg',
    badge: 'NEW',
    rating: 4.8,
    reviews: 18,
    desc: 'Bates All Purpose SC (Heritage). Square cantle, forward cut flap, CAIR®, EASY-CHANGE. ~13.7 lb. Classic Black or Brown. $2,245.50.'
  },
  {
    id: 41,
    name: '16"–18" Bates Dressage Saddle Heritage CAIR',
    category: 'English',
    price: 2606,
    oldPrice: null,
    image: 'images/bates-dressage-1.jpg',
    badge: 'NEW',
    rating: 4.9,
    reviews: 19,
    desc: 'Bates Dressage Heritage CAIR. Deep seat, narrow waist, CAIR®, EASY-CHANGE, adjustable Flexibloc & Y-girthing. ~14.3 lb. Classic Black. $2,605.50.'
  },
  {
    id: 42,
    name: 'Wintec Pro Stock with Swinging Fender HART',
    category: 'Western',
    price: 1299,
    oldPrice: null,
    image: 'images/wintec-pro-stock-1.jpg',
    badge: 'NEW',
    rating: 4.8,
    reviews: 19,
    desc: 'Wintec Pro Stock HART. Lightweight 22.1 lb, swinging fenders, deep seat, CAIR®, EASY-CHANGE. Easy-care synthetic. Small/Med/Large.'
  },
  {
    id: 43,
    name: '17.5" Kincade Leather Close Contact Saddle 746005',
    category: 'English',
    price: 325,
    oldPrice: null,
    image: 'images/kincade-cc-1.jpg',
    badge: 'CLEARANCE',
    rating: 4.6,
    reviews: 14,
    desc: 'Kincade Leather Close Contact. Traditional square cantle, medium deep seat, airflow padded flaps, soft knee rolls, memory foam panels. 17.5". Clearance $325.'
  },
  {
    id: 44,
    name: 'Used Stubben Dressage Saddle Medium Tree 16"',
    category: 'Used',
    price: 550,
    oldPrice: null,
    image: 'images/used-stubben-1.jpg',
    badge: 'USED',
    rating: 4.5,
    reviews: 8,
    desc: 'Used Stubben Dressage. Medium wood tree, 16" leather seat, 1.5" cantle, English billets, stainless hardware. ~17 lb. Reconditioned. $550.'
  },
  {
    id: 45,
    name: 'Used Blue Ribbon Leather Co Flat Saddle Narrow Tree 19.5"',
    category: 'Used',
    price: 550,
    oldPrice: null,
    image: 'images/used-blue-ribbon-1.jpg',
    badge: 'USED',
    rating: 4.4,
    reviews: 6,
    desc: 'Used Blue Ribbon Leather Co Flat Saddle. Narrow wood tree, 19.5" leather seat, 1" cantle, English billets, chrome hardware. ~13 lb. Reconditioned. $550.'
  },
  {
    id: 102,
    name: "Albion Fabrento Dressage Saddle",
    category: "English",
    price: 4724.95,
    image: "images/albion-fabrento-black.jpg",
    badge: "NEW",
    rating: 4.9,
    reviews: 8,
    desc: "Albion dressage saddle with close-contact design, Adjusta-Tree technology, external thigh blocks, and iconic Albion head rivet. Hand-selected calf leather. Dimensions confirmed when ordering. Expected delivery about 4 weeks."
  },
  {
    id: 103,
    name: "Albion Evolve Elite Sport Mono",
    category: "English",
    price: 5010.95,
    image: "images/albion-evolve-elite-mono.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 6,
    desc: "Albion Evolve Elite Sport Mono eventing saddle with monoblade. Built for performance across disciplines. We contact you to confirm specific dimensions when ordering."
  },
  {
    id: 104,
    name: "Albion Revelation Red Label Dressage",
    category: "English",
    price: 6594.95,
    image: "images/albion-revelation-red-label.jpg",
    badge: "PREMIUM",
    rating: 4.9,
    reviews: 5,
    desc: "Revelation Red Label dressage saddle with slightly supportive seat and individual knee roll size and positioning. RD500P or RD500 tree. Signature red details; custom options available."
  },
  {
    id: 105,
    name: "Albion Revelation Couture Cross Country",
    category: "English",
    price: 5059.95,
    image: "images/albion-revelation-xc.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 4,
    desc: "Albion Revelation Couture cross-country saddle with RXC500 tree. Signature red touch, freedom of movement for shoulder and withers. Made to order for horse and rider."
  },
  {
    id: 106,
    name: "Amerigo CC Pinerolo Close Contact",
    category: "English",
    price: 5359.95,
    image: "images/amerigo-cc-pinerolo.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 7,
    desc: "Amerigo CC Pinerolo close contact saddle for high-blooded horses with long shoulders and withers. Delivery upon request; we confirm dimensions when ordering."
  },
  {
    id: 107,
    name: "Albion Europa SLK2 Ultima Dressage",
    category: "English",
    price: 4899.95,
    image: "images/albion-europa-slk2.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 5,
    desc: "Dressage saddle with a deep seat, wooden tree, and large fixed twist under the sweat leaf. Dimensions confirmed when ordering. Expected delivery about 8 weeks."
  },
  {
    id: 108,
    name: "Amerigo Jumping Saddle DJ Largo Pinerolo",
    category: "English",
    price: 5636.95,
    image: "images/amerigo-dj-largo-black.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 6,
    desc: "Jumping saddle for compact horses with short to average length of withers to the deepest point. Extra-wide gullet for wider withers. Available in black and brown."
  },
  {
    id: 109,
    name: "Amerigo Jumping Saddle Octave P",
    category: "English",
    price: 6190.95,
    image: "images/amerigo-octave-p.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 5,
    desc: "Jumping saddle for horses with a straight or slightly rising topline. Narrower seat. Premium Amerigo craftsmanship."
  },
  {
    id: 110,
    name: "Amerigo Jumping Saddle HC",
    category: "English",
    price: 5659.95,
    image: "images/amerigo-octave-p.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 5,
    desc: "Jumping saddle for horses with high croups that tend to tip the saddle forward when in movement. Stable, balanced design."
  },
  {
    id: 111,
    name: "Equipe Synergy Special Jumping Saddle",
    category: "English",
    price: 3518.95,
    image: "images/equipe-synergy-special.jpg",
    badge: "NEW",
    rating: 4.7,
    reviews: 8,
    desc: 'Equipe jumping saddle with plastic tree. Handmade with beautiful stitching. Sizes 15.5"–18". Colors: black, brown, New Market, red brown. Flaps: short, normal, long, extra long.'
  },
  {
    id: 112,
    name: "Erreplus Jumping Saddle CA",
    category: "English",
    price: 4674.95,
    image: "images/erreplus-ca-jumping.jpg",
    badge: "NEW",
    rating: 4.9,
    reviews: 6,
    desc: "Erreplus CA jumping saddle developed with German champion Christian Ahlmann. Semi-flat tree, double flap. Wider seat with dual-density polyurethane. Flaps in forward, standard, or drawback projection. Knee rolls large or small. Hand-flocked panels."
  },
  {
    id: 113,
    name: "Prestige Joy Jumper",
    category: "Kids",
    price: 2144.95,
    image: "images/prestige-joy-jumper.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 7,
    desc: "Prestige Joy Jumper specially developed for children and young riders. Comfortable seat, Velcro-adjustable knee rolls, cushions integrated with lower flaps. Optimal fit for ponies and horses."
  },
  {
    id: 114,
    name: "Prestige Versailles New D Jumping",
    category: "English",
    price: 2859.95,
    image: "images/prestige-versailles.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 5,
    desc: "Prestige Versailles New D jumping saddle — balanced and close-contact. Narrow twist for comfort. Integrated thin panels for normal or small withers; FP version available for large withers."
  },
  {
    id: 115,
    name: "Circle Y Walnut Grove Flex2 Trail Saddle 1157",
    category: "Western",
    price: 2999.0,
    image: "images/circle-y-walnut-grove-1157.jpg",
    badge: "BEST SELLER",
    rating: 4.9,
    reviews: 62,
    desc: "Circle Y Walnut Grove Flex2 Trail Saddle 1157. #1 selling Circle Y trail saddle. Flex2 tree for comfort and close contact. Seat sizes available. Walnut finish with roughout seat, floral tooling, silver conchos. Free shipping. American made."
  },
  {
    id: 116,
    name: "Circle Y Alabama Flex2 Trail Gaiter 1581",
    category: "Western",
    price: 2699.0,
    image: "images/circle-y-alabama-flex2-gaiter-1581-1.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 12,
    desc: "Circle Y Alabama Flex2 Trail Gaiter 1581 — designed for gaited horses. Flex2 tree, shorter rounded NeoShock skirts, 3-way adjustable in-skirt rigging, impact foam seat, Softee leather, Ergo-Balance stirrups. Seat 14\" Black Grainout, Walnut, Medium tree. Herman Oak leather, spider border tooling. Approx. 25 lbs. American made. Free shipping over $150."
  },
  {
    id: 117,
    name: "Billy Cook Barrel Racing Saddle 1530",
    category: "Western",
    price: 1895.0,
    image: "images/billy-cook-barrel-racer-1530-1.jpg",
    badge: "NEW",
    rating: 4.7,
    reviews: 9,
    desc: "Billy Cook Barrel Racer 1530 — hand-stitched seat, rawhide-covered tree, rawhide braided horn, stainless steel spots. Sizes 13.5\" to 16\". Built for barrel racing with classic Billy Cook detail and silver spot borders. Colors: Chestnut, Chocolate, Hot Oil, Pecan, Russet."
  },
  {
    id: 118,
    name: "Big Horn Draft Cordura Saddle 296",
    category: "Western",
    price: 1216.0,
    image: "images/big-horn-draft-cordura-296-1.jpg",
    badge: "NEW",
    rating: 4.6,
    reviews: 14,
    desc: "Big Horn Draft Cordura Saddle 296 — built for draft and draft-cross horses. Fiberglass-covered wood tree with Extra Wide draft bars. 16\" or 17.5\" grainout padded seat, Ralide laced stirrups, 7.25\" gullet × 8\" width, 27\" skirt. Brown with brass hardware. Made in USA. Free shipping."
  },
  {
    id: 119,
    name: "Fabtron Lightweight Gaited Trail Saddle",
    category: "Western",
    price: 1082.0,
    image: "images/fabtron-lightweight-gaited-trail-1.jpg",
    badge: "NEW",
    rating: 4.5,
    reviews: 8,
    desc: "Fabtron Lightweight Gaited Trail Saddle — built for gaited horses with higher gullet and bar angle for neck and shoulder freedom. Roughout extra-padded seat, pleasure horn, 3½\" cantle with 1½\" Cheyenne roll, raised front gullet 7\" width, 7/8 stainless dees, Cordura fenders and fleece-lined skirt. Approx. 22 lbs. Includes cinch, off billet and tie strap. USA made, 5-year tree warranty."
  },
  {
    id: 120,
    name: "Tough 1 King Series Youth Stratford Suede Barrel Saddle",
    category: "Kids",
    price: 268.99,
    image: "images/tough1-stratford-suede-purple-1.jpg",
    badge: "NEW",
    rating: 5.0,
    reviews: 3,
    desc: "Tough 1 King Series Youth Stratford Suede Barrel Saddle (KS931-STRATFORD). Lightweight suede barrel saddle for youth/pony — deep seat, rounded skirt, white buckstitch edge, silver conchos, polymer stirrups, Tough1 Quick Change buckles. Sizes 10\" & 12\". Colors: Brown, Turquoise, Purple, Black, Gray."
  },
  {
    id: 121,
    name: "Tough 1 Royal King 16\" Priddy Pleasure Saddle",
    category: "Western",
    price: 652.0,
    image: "images/royal-king-priddy-pleasure-16-1.jpg",
    badge: "NEW",
    rating: 4.7,
    reviews: 11,
    desc: "Tough 1 Royal King 16\" Priddy Pleasure Saddle (RK1076-89-16). Hand-carved floral tooling in medium oil with black background, smooth black padded glove-leather seat, matching tooled stirrups, in-skirt rigging. Seat 16\", swell 13\", gullet 8\", skirt 27\"×30\", weight 26 lbs. Includes 1¾\"×70\" tie strap. Horn 3\"."
  },
  {
    id: 122,
    name: "NRS Competitor Series Chocolate Roughout Saddle",
    category: "Western",
    price: 1999.0,
    image: "images/nrs-competitor-series-1411891-1.jpg",
    badge: "NEW",
    rating: 4.6,
    reviews: 5,
    desc: "NRS Competitor Series Chocolate Roughout Team Roping Saddle (1411891-PR). Modified Toots Mansfield tree, chocolate Herman Oak leather, hard roughout seat, pencil roll, 7/8 drop dee, leather-covered stirrups, 90/10 wool blend lining. Gullet 6¾\"×7½\", cantle 4\", swell 13½\". 5-year tree warranty. Handcrafted in Texas, USA."
  },
  {
    id: 123,
    name: "NRS Competitors Heavy Oil Roughout Strip Down Olin Young Ranch Roper",
    category: "Western",
    price: 2099.0,
    image: "images/nrs-olin-young-ranch-roper-1411895-1.jpg",
    badge: "NEW",
    rating: 4.5,
    reviews: 18,
    desc: "NRS Competitors Heavy Oil Roughout Strip Down Olin Young Ranch Roper Saddle (1411895). Natural heavy oil Herman Oak leather on Olin Young Ranch Roper tree (rawhide-covered wood). Seat rig, rawhide Cheyenne roll, strip-down skirt, rawhide stirrups, 90/10 wool lining. Gullet 6¾\"×9\", cantle 4½\", swell 14\". 5-year tree warranty. Handcrafted in Texas, USA."
  },
  {
    id: 124,
    name: "NRS Competitor Series Black Roughout Barrel with Nettles Stirrups",
    category: "Western",
    price: 2049.0,
    image: "images/nrs-black-roughout-barrel-nettles-1.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 7,
    desc: "NRS Competitor Series Black Roughout Barrel Saddle with Nettles Stirrups (1412237). Newest barrel tree with higher swell and elevated seat rise for a locked-in ride. Black roughout, upgraded turquoise conchos, distressed turquoise Nettles barrel stirrups, hard seat, single square skirt, 90/10 wool lining, back cinch included. Seats 13.5\"–16.5\". Gullet 6¾\"×8\", cantle 5\", swell 13\". Made in Texas, USA. 5-year tree warranty."
  },
  {
    id: 125,
    name: "Circle Y Ultimate Cash Chestnut 14\" Barrel Saddle",
    category: "Western",
    price: 2799.0,
    image: "images/circle-y-ultimate-cash-chestnut-14-1.jpg",
    badge: "NEW",
    rating: 4.9,
    reviews: 15,
    desc: "Circle Y Saddlery Ultimate Cash Chestnut 14\" Barrel Saddle — Martha Josey design. Ultimate Cash DURAhide regular tree, 5\" Cheyenne cantle, 13\" swell, 4\" horn with 2¼\" cap. Chestnut floral tooling (Texas Flower with Circle Y Waffle Big Seed), Josey aluminum stirrups, three-way adjustable in-skirt rigging. Weight ~29 lbs. Made in Yoakum, Texas."
  },
  {
    id: 126,
    name: "Used God Be Praised (GBP) Brazil 14.5\" 3/4 Breed Floral Team Roper",
    category: "Used",
    price: 1500.0,
    image: "images/gbp-brazil-used-14-5-team-roper-1.jpg",
    badge: "USED",
    rating: 4.5,
    reviews: 4,
    desc: "Used God Be Praised (GBP) Brazil 14.5\" 3/4 Breed Floral Team Roper (01-1707TR). Rawhide-covered wood tree, 3/4 breed floral tooling, 6.75\" gullet. Inspected used saddle in very good condition — tree checked, no major repairs needed."
  },
  {
    id: 127,
    name: "NRS Competitor Series Chocolate Roughout Toots Mansfield Team Roper",
    category: "Western",
    price: 1999.0,
    image: "images/nrs-chocolate-toots-mansfield-1412221-1.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 9,
    desc: "NRS Competitor Series Chocolate Roughout Team Roper (1412221). Toots Mansfield tree, chocolate Herman Oak leather, hard roughout seat, rawhide Cheyenne roll, 7/8 drop dee, leather-covered stirrups, 90/10 wool lining. Gullet 6¾\"×7½\", cantle 4\", swell 13½\". Size 16 available. 5-year tree warranty. Handcrafted in Texas, USA."
  },
  {
    id: 128,
    name: "Used Billy Cook 15.5\" Full Floral Team Roper",
    category: "Used",
    price: 1250.0,
    image: "images/billy-cook-used-15-5-floral-team-roper-1.jpg",
    badge: "USED",
    rating: 4.6,
    reviews: 5,
    desc: "Used Billy Cook 15.5\" Full Floral Team Roper (01-1699TR). Full floral tooling, 6¾\" gullet. Inspected used saddle in very good condition — tree checked, ready to ride."
  },
  {
    id: 129,
    name: "Used Sheridan 14.5\" Barrel Basket Stamp",
    category: "Used",
    price: 700.0,
    image: "images/sheridan-used-14-5-barrel-basket-1.jpg",
    badge: "USED",
    rating: 4.4,
    reviews: 3,
    desc: "Used Sheridan Saddles 14.5\" Barrel with basket stamp tooling (02-735BR). 7\" gullet. Inspected used barrel saddle in very good condition."
  },
  {
    id: 130,
    name: "R. Watson Kids Navy Roughout Western Boots RWK103Y",
    category: "Kids Boots",
    price: 79.99,
    image: "images/r-watson-kids-navy-rwk103y-1.jpg",
    badge: "SALE",
    rating: 4.7,
    reviews: 12,
    desc: "R. Watson Kids Navy Roughout Western Boots (RWK103Y). Navy roughout vamp, winter white top, leather outsole, leather stacked heel, cutter toe, single welt. R. Watson comfort system with solid steel shank. All-around kids boot for dress, chores or the arena."
  },
  {
    id: 131,
    name: "Anderson Bean Kids Coyote Sand Sky Blue Sensation Boots ABK7096",
    category: "Kids Boots",
    price: 159.99,
    image: "images/anderson-bean-kids-abk7096-1.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 8,
    desc: "Anderson Bean Kids Western Boots ABK7096. Coyote Sand tan suede vamp, Blue Sensation shaft with white collar (mid to upper calf), pull tabs, 2\" block riding heel, oxbow sole, square toe, double welt. Unisex children's riding boot built like the adult line."
  },
  {
    id: 132,
    name: "Old West Youth Black Roughout Boots 8203Y",
    category: "Kids Boots",
    price: 99.99,
    image: "images/old-west-youth-black-8203y-1.jpg",
    badge: "NEW",
    rating: 4.6,
    reviews: 6,
    desc: "Old West Youth Black Roughout Boots 8203Y. Black roughout vamp, cutter toe, leather outsole, single stitch welt, pull holes, 6-row stitch pattern. Perfect everyday boot for little cowboys and cowgirls."
  },
  {
    id: 133,
    name: "Old West Kids Camel Suede Red Shaft Boots 8206",
    category: "Kids Boots",
    price: 89.99,
    image: "images/old-west-kids-camel-red-8206-1.jpg",
    badge: "NEW",
    rating: 4.6,
    reviews: 5,
    desc: "Old West Children's Boots 8206. Camel suede vamp, red shaft with turquoise stitch and pull holes, cutter toe, leather outsole, single stitch welt. Fun colorful kids western boot for little cowboys and cowgirls."
  },
  {
    id: 134,
    name: "Macie Bean Kids Turquoise Suede Blue New Orleans Boots MK9526",
    category: "Kids Boots",
    price: 129.99,
    image: "images/macie-bean-kids-turquoise-mk9526-1.jpg",
    badge: "NEW",
    rating: 4.7,
    reviews: 7,
    desc: "Macie Bean Kids Turquoise Suede & Blue New Orleans Cutter Toe Boots (MK9526). Turquoise suede vamp, blue New Orleans top, cutter toe, riding heel, single welt stitch, leather outsole. Made in Mexico."
  },
  {
    id: 135,
    name: "Roper Kids Black Ostrich Print Cowboy Boots 09-018-1900-0050",
    category: "Kids Boots",
    price: 74.99,
    image: "images/roper-kids-ostrich-print-1.jpg",
    badge: "NEW",
    rating: 4.5,
    reviews: 9,
    desc: "Roper Kids Black Ostrich Print Cowboy Boots (09-018-1900-0050). Black ostrich-print vamp, tan top with western stitch, square toe, rubber outsole, padded insole, double welt stitch, walking heel. Stylish everyday kids boots."
  },
  {
    id: 136,
    name: "Macie Bean Kids Honey Crazyhorse Turquoise Metallic Boots MK9206",
    category: "Kids Boots",
    price: 159.99,
    image: "images/macie-bean-kids-mk9206-1.jpg",
    badge: "NEW",
    rating: 4.8,
    reviews: 11,
    desc: "Macie Bean Kids Honey Crazyhorse Boots with Turquoise Metallic shaft (MK9206). Honey crazy-horse vamp, turquoise metallic leather top, DB square toe, roper heel, leather sole. Handcrafted in Leon, Mexico. Perfect in or out of the stirrup for little cowgirls."
  },
  {
    id: 137,
    name: "Olathe Kids Red & Blue Spider Web Cowboy Boots OK42",
    category: "Kids Boots",
    price: 169.95,
    image: "images/olathe-kids-spider-web-ok42-1.jpg",
    badge: "NEW",
    rating: 4.9,
    reviews: 14,
    desc: "Olathe Kids Red & Blue Spider Web Cowboy Boots (OK42 / ABK42). Toast bison vamp, red stovepipe top with blue spider-web stitching, blue collar, square toe, riding heel, leather lined, pull tabs, double stitch welt, leather outsole. Buckaroo-style boots for little cowboys since 1873."
  }
,
  {
    id: 138,
    name: 'Syd Hill Premium Stock Saddle - SHX Adjustable Tree',
    category: 'Western',
    price: 2195,
    oldPrice: null,
    image: 'images/syd-hill-premium-stock-1.jpg',
    badge: 'NEW',
    rating: 4.9,
    reviews: 18,
    desc: 'Syd Hill Premium Stock Saddle with SHX adjustable tree (wide gullet). Havana European leather, classic seat, premium flock-filled gusseted panels, gel seat, poley knee pads, stock stirrup bar, front and rear dee rings, two long girth points with surcingle. Ideal for trail, general riding, breaking, polocrosse and station work. Sizes 15-18 inches. Made in Australia since 1865.'
  },
  {
    id: 139,
    name: 'Syd Hill Premium Stock Fender Saddle - SHX Adjustable Tree',
    category: 'Western',
    price: 2195,
    oldPrice: null,
    image: 'images/syd-hill-premium-fender-2.jpg',
    badge: 'NEW',
    rating: 4.9,
    reviews: 15,
    desc: 'Syd Hill Premium Stock Fender Saddle with SHX adjustable tree. Classic seat with swinging fenders for all-day comfort. Lightweight flexible tree, premium flock-filled gusseted panels, gel seat, poley knee pads, aluminum oxbows, front and rear dee rings, two long girth points with surcingle. Havana European leather. Trail, general, breaking, polocrosse and station work. Sizes 15-18 inches. Australia.'
  }
,
  {
    id: 140,
    name: 'Syd Hill Fitzroy Stock Fender Saddle - SHX Adjustable Tree',
    category: 'Western',
    price: 1695,
    oldPrice: null,
    image: 'images/syd-hill-fitzroy-black-1.jpg',
    badge: 'NEW',
    rating: 4.8,
    reviews: 12,
    desc: 'Syd Hill Fitzroy Stock Fender Saddle with SHX adjustable tree (wide gullet). Traditional stock comfort with swinging fenders for all-day riding. Lightweight flexible tree, premium flock-filled gusseted panels, textured synthetic grip leather (easy care), gel seat, poley knee pads, aluminum oxbows, front and rear dee rings, two long girth points with surcingle. Black or brown. Sizes 15-18 inches. Trail, general, breaking, polocrosse and station work. Australia.'
  }
];

/* Product slug map for clean SEO URLs */
const PRODUCT_SLUGS = {"140":"syd-hill-fitzroy-stock-fender-saddle-shx","138":"syd-hill-premium-stock-saddle-shx","139":"syd-hill-premium-stock-fender-saddle-shx","137":"olathe-kids-spider-web-ok42","136":"macie-bean-kids-honey-turquoise-mk9206","135":"roper-kids-black-ostrich-print","134":"macie-bean-kids-turquoise-mk9526","133":"old-west-kids-camel-red-8206","132":"old-west-youth-black-roughout-8203y","131":"anderson-bean-kids-coyote-sky-abk7096","130":"r-watson-kids-navy-roughout-rwk103y","129":"used-sheridan-14-5-barrel-basket-stamp","128":"used-billy-cook-15-5-full-floral-team-roper","127":"nrs-chocolate-toots-mansfield-1412221","126":"used-gbp-brazil-14-5-floral-team-roper","125":"circle-y-ultimate-cash-chestnut-14-barrel","124":"nrs-black-roughout-barrel-nettles-1412237","123":"nrs-olin-young-ranch-roper-strip-down-1411895","122":"nrs-competitor-series-chocolate-roughout-1411891","121":"tough1-royal-king-16-priddy-pleasure","120":"tough1-king-series-youth-stratford-suede-barrel","1":"crates-hand-tooled-ladies-reining-saddle-4517","2":"billy-cook-wade-tree-ranch-saddle-2181","3":"south-bend-saddle-co-training-saddle-2387","4":"south-bend-saddle-co-training-saddle-1300","5":"billy-cook-wade-ranch-saddle-2197","6":"tucker-equitation-endurance-saddle-t49","7":"wintec-pro-endurance-hart","8":"arena-high-wither-all-purpose-saddle","9":"wintec-500-dressage-hart","10":"m-toulouse-annice-close-contact-saddle-3801","11":"m-toulouse-aachen-dressage-genesis-2700","12":"wintec-250-all-purpose-saddle-flocked","13":"arena-jump-saddle-ajc","14":"black-english-competition-saddle","15":"brown-english-eventing-all-purpose","16":"dark-brown-english-monoflap-saddle","17":"used-custom-trail-saddle-medium-tree","18":"used-brown-western-saddle-with-fleece","19":"used-simco-trail-saddle-medium-tree-3095","20":"used-abetta-cordura-trail-saddle-wide-tree","21":"used-big-horn-endurance-saddle-medium-tree-118","22":"used-karl-niedersuss-dressage-saddle","23":"used-tex-tan-trail-saddle-medium-tree","24":"used-custom-treeless-endurance-saddle-wide","25":"used-smooth-leather-western-saddle","26":"used-abetta-cordura-trail-saddle-17","27":"reinsman-southwestern-pattern-saddle-pad","28":"5-star-wool-felt-saddle-pad","29":"reinsman-teal-southwestern-pad","30":"navajo-pattern-fleece-saddle-pad","31":"coolback-fleece-saddle-pad-brown","32":"tacky-too-black-contoured-pad","33":"tucker-black-wool-felt-pad","34":"5-star-gray-wool-pad-with-leather","35":"tucker-dark-wool-contoured-pad","36":"black-navy-quilted-saddle-pad","37":"high-horse-daisetta-cordura-trail-saddle-6914","38":"big-horn-light-weight-haflinger-saddle-286","39":"circle-y-julie-goodnight-cascade-crossover-flex2-trail-1753","40":"bates-all-purpose-heritage-sc-saddle-002","41":"bates-dressage-saddle-heritage-cair","42":"wintec-pro-stock-swinging-fender-hart","43":"kincade-leather-close-contact-saddle-746005","44":"used-stubben-dressage-saddle-medium-tree-16","45":"used-blue-ribbon-leather-co-flat-saddle-narrow-tree-195","50":"king-series-eclipse-barrel-saddle-ks92","51":"king-series-youth-braden-trail-saddle-ks2632","52":"youth-cowboy-roughout-serpentine-tooling-ks1822","53":"royal-king-hawley-barrel-saddle-rk240","54":"abetta-original-youth-20501y","55":"double-t-youth-hard-seat-barrel-cactus-sunflower","56":"used-circle-y-barrel-wide-tree-2201","57":"wintec-youth-synthetic-western-wi2433","58":"professionals-choice-double-weave-navajo-nb5","59":"troxel-dakota-grizzly-brown-all-trails-helmet","60":"ir4g-matte-black-finish-helmet-irh3312","61":"troxel-sierra-western-riding-helmet-04-369","62":"weaver-original-adjustable-chin-throat-snap-halter","63":"5-star-the-all-around-saddle-pad","64":"tucker-girth-enduro-balance","65":"myler-comfort-snaffle-level-1","66":"billy-cook-breast-collar-12-723","67":"tucker-shotgun-scabbard-141","69":"5-star-100-mohair-roper-cinch","70":"latigo-tie-strap-296","71":"saddle-strings-222","72":"cashel-snap-on-lunch-bag","73":"justin-stampede-steel-toe-se961","74":"justin-temple-black-jb3000","75":"justin-temple-clay-brown-jb3001","76":"justin-trencher-steel-toe-pd4067","77":"justin-quincy-sueded-ostrich-cx5081","78":"tony-lama-bonham-ostrich-ct871","79":"ferrini-pinto-western-1169307","80":"justin-rush-waterproof-se465","81":"justin-bristol-steel-toe","82":"justin-lubbock-se7526","83":"laredo-atlanta-68086","84":"roper-american-flag-0903-2044","85":"rocky-alpha-force-fq000217","86":"dan-post-franklin-dp2815","87":"weatherbeeta-100g-stable-rug","88":"rhino-plus-vl-250g-turnout","89":"jw-kelsea-250g-combo-turnout","90":"ir-superdry-0g-turnout","91":"ir-superdry-0g-taupe","92":"rambo-stable-plus-450","93":"lemieux-arika-stabletek-350","94":"lemieux-arika-check-combo","95":"tempest-original-black","96":"laredo-lydia-5603","97":"danpost-sugar-dp4999","98":"danpost-hallie-dp4027","99":"danpost-jilted-dp3709","100":"danpost-bluebird-dp3544","101":"ariat-heritage-lacer-ii","102":"albion-fabrento-dressage","103":"albion-evolve-elite-sport-mono","104":"albion-revelation-red-label","105":"albion-revelation-couture-xc","106":"amerigo-cc-pinerolo","107":"albion-europa-slk2-ultima","108":"amerigo-dj-largo-pinerolo","109":"amerigo-octave-p","110":"amerigo-jumping-hc","111":"equipe-synergy-special","112":"erreplus-ca-jumping","113":"prestige-joy-jumper","114":"prestige-versailles-new-d","115":"circle-y-walnut-grove-flex2-1157","119":"fabtron-lightweight-gaited-trail-saddle","118":"big-horn-draft-cordura-saddle-296","117":"billy-cook-barrel-racing-saddle-1530","116":"circle-y-alabama-flex2-trail-gaiter-1581"};

function productUrl(p) {
  const slug = PRODUCT_SLUGS[String(p.id)] || ('product-' + p.id);
  // Detect if we are inside /products/ so relative path is correct
  const base = (typeof location !== 'undefined' && location.pathname.indexOf('/products/') !== -1) ? '../products/' : 'products/';
  return base + slug + '.html';
}

function renderStars(rating) {
  const full = Math.floor(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

function escapeHtml(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderProductCard(p) {
  const url = productUrl(p);
  const imgBase = (typeof location !== 'undefined' && location.pathname.indexOf('/products/') !== -1) ? '../' : '';
  const imgSrc = (p.image && (p.image.startsWith('http') || p.image.startsWith('../'))) ? p.image : (imgBase + (p.image || ''));
  const name = escapeHtml(p.name);
  const badge = p.badge ? '<span class="product-badge">' + escapeHtml(p.badge) + '</span>' : '';
  const price = Number(p.price) || 0;
  const oldPrice = p.oldPrice ? '<span class="old">$' + Number(p.oldPrice).toLocaleString() + '</span>' : '';
  const safeNameJs = String(p.name || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return (
    '<div class="product-card">' +
      badge +
      '<div class="product-img"><a href="' + url + '"><img src="' + imgSrc + '" alt="' + name + '" loading="lazy"></a></div>' +
      '<div class="product-info">' +
        '<h3><a href="' + url + '">' + name + '</a></h3>' +
        '<div class="product-rating"><span class="stars">' + renderStars(p.rating) + '</span><span>' + (p.reviews || 0) + ' reviews</span></div>' +
        '<div class="product-price">$' + price.toLocaleString() + oldPrice + '</div>' +
        '<div class="product-actions">' +
          '<a href="' + url + '" class="btn btn-dark btn-sm">View</a>' +
          '<button class="btn btn-gold btn-sm" onclick="Cart.add({id:' + p.id + ', name:\'' + safeNameJs + '\', price:' + price + ', image:\'' + (p.image || '') + '\'})">Add to Cart</button>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
}
/* Recommended Accessories – shows on product detail pages */
function renderRecommendedAccessories() {
  if (typeof location === 'undefined') return;
  const onProduct = location.pathname.indexOf('/products/') !== -1 || document.querySelector('.pd-wrap, .pd-details, .product-detail');
  if (!onProduct) return;
  // Static per-product section already embedded — do not replace
  if (document.getElementById('recommendedAccessories')) return;
  if (typeof PRODUCTS === 'undefined' || typeof renderProductCard !== 'function') return;

  // Fallback only if no section: mix pads + accessories
  const items = PRODUCTS
    .filter(p => p.category === 'Pads' || p.category === 'Accessories')
    .slice(0, 4);
  if (items.length === 0) return;

  const section = document.createElement('section');
  section.className = 'recommended-section container';
  section.id = 'recommendedAccessories';
  section.innerHTML =
    '<h2>Recommended Accessories</h2>' +
    '<p class="rec-sub">Pair this product with pads and gear riders often buy together</p>' +
    '<div class="recommended-grid products-grid">' +
      items.map(function(p) { return renderProductCard(p); }).join('') +
    '</div>';

  const footer = document.querySelector('footer.footer') || document.querySelector('footer');
  const anchor = document.querySelector('.pd-details') || document.querySelector('.pd-wrap') || document.querySelector('.product-detail');
  if (footer && footer.parentNode) {
    footer.parentNode.insertBefore(section, footer);
  } else if (anchor && anchor.parentNode) {
    anchor.parentNode.insertBefore(section, anchor.nextSibling);
  } else {
    document.body.appendChild(section);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  try { renderRecommendedAccessories(); } catch (e) { /* ignore */ }
});


/* === Upgrades: wishlist, related products, shop empty state === */
const WISH_KEY = 'saddle_wishlist_v1';
const Wishlist = {
  all(){ try { return JSON.parse(localStorage.getItem(WISH_KEY)||'[]'); } catch(e){ return []; } },
  save(a){ localStorage.setItem(WISH_KEY, JSON.stringify(a)); Wishlist.badge(); },
  has(id){ return Wishlist.all().some(x => x.id===id); },
  toggle(p){
    let a = Wishlist.all();
    if (Wishlist.has(p.id)) a = a.filter(x => x.id!==p.id);
    else a.push({id:p.id, name:p.name, price:p.price, image:p.image});
    Wishlist.save(a);
    return Wishlist.has(p.id);
  },
  badge(){
    const n = Wishlist.all().length;
    document.querySelectorAll('.wishlist-count').forEach(el => {
      el.textContent = n ? String(n) : '';
      el.style.display = n ? 'inline' : 'none';
    });
  }
};

function getRelatedProducts(product, limit=4){
  if (!product || !window.PRODUCTS) return [];
  const same = PRODUCTS.filter(p => p.id!==product.id && p.category===product.category);
  const rest = PRODUCTS.filter(p => p.id!==product.id && p.category!==product.category);
  return same.concat(rest).slice(0, limit);
}

function renderRelated(product){
  const host = document.getElementById('relatedProducts');
  if (!host || !product) return;
  const items = getRelatedProducts(product, 4);
  if (!items.length){ host.style.display='none'; return; }
  const base = host.getAttribute('data-base') || '';
  host.innerHTML = '<h2>You may also like</h2><div class="related-grid">' + items.map(p => {
    const url = (typeof productUrl==='function') ? productUrl(p) : (base + 'product.html?id=' + p.id);
    const img = (p.image||'').startsWith('http') ? p.image : (base + (p.image||''));
    return `<a class="related-card" href="${url}"><img src="${img}" alt="${(p.name||'').replace(/"/g,'&quot;')}" loading="lazy"><div class="rc-body"><p class="rc-name">${p.name}</p><div class="rc-price">$${(p.price||0).toLocaleString()}</div></div></a>`;
  }).join('') + '</div>';
}

function enhanceShopEmpty(){
  const grid = document.getElementById('productsGrid') || document.querySelector('.products-grid');
  if (!grid) return;
  const obs = new MutationObserver(() => {
    if (!grid.children.length){
      if (!grid.nextElementSibling || !grid.nextElementSibling.classList.contains('shop-empty')){
        const d = document.createElement('div');
        d.className = 'shop-empty';
        d.innerHTML = '<p>No products match these filters.</p><p><a href="shop.html">View all products</a> · <a href="https://wa.me/12536607454" target="_blank" rel="noopener">Ask us on WhatsApp</a></p>';
        grid.parentNode.insertBefore(d, grid.nextSibling);
      }
    } else {
      const e = grid.parentNode.querySelector('.shop-empty');
      if (e) e.remove();
    }
  });
  obs.observe(grid, {childList:true});
}

document.addEventListener('DOMContentLoaded', () => {
  Wishlist.badge();
  enhanceShopEmpty();
  // product page related
  const params = new URLSearchParams(location.search);
  let pid = params.get('id');
  if (!pid && window.PRODUCTS){
    // static product pages: match by path slug in PRODUCT_SLUGS
    const path = location.pathname.split('/').pop() || '';
    if (window.PRODUCT_SLUGS){
      const entry = Object.entries(PRODUCT_SLUGS).find(([,slug]) => path.indexOf(slug)!==-1);
      if (entry) pid = entry[0];
    }
  }
  if (pid && window.PRODUCTS){
    const prod = PRODUCTS.find(p => String(p.id)===String(pid));
    if (prod) renderRelated(prod);
  }
  // static product pages without id: try find by name in h1
  const h1 = document.querySelector('.pd-title, h1');
  if (h1 && window.PRODUCTS && !document.getElementById('relatedProducts')?.innerHTML){
    const name = h1.textContent.trim();
    const prod = PRODUCTS.find(p => p.name === name);
    if (prod) renderRelated(prod);
  }
});
