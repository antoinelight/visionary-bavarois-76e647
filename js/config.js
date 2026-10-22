/* Westmoor Saddlery – Payment & store config
   Fill these in after you create Stripe / PayPal accounts.
   Then redeploy. Never put secret keys here — only publishable key or payment links.
*/
window.WESTMOOR_CONFIG = {
  // Stripe Payment Link (Dashboard → Payment links → Create → copy URL)
  // Example: "https://buy.stripe.com/xxxx"
  stripePaymentLink: "",

  // Optional: Stripe publishable key (pk_live_... or pk_test_...) for future Checkout
  stripePublishableKey: "",

  // PayPal.Me or PayPal.me business link, e.g. "https://paypal.me/WestmoorSaddlery"
  paypalLink: "",

  // Free shipping threshold (USD)
  freeShippingMin: 150,

  // Flat shipping under threshold (USD) — adjust as needed
  flatShippingUnderMin: 15,

  // Where order form emails go (Netlify Forms also captures submissions)
  orderNotifyEmail: "support@westmoorsad.netlify.app",

  // Business phone (optional)
  phone: "+1 (253) 660-7454",

  // Store display name
  storeName: "Westmoor Saddlery",

  // Physical location
  storeAddress: "1202 South Treadaway Boulevard, Abilene, TX 79602"
};
