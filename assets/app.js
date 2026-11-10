// ---- CONFIG: edit these ----
const CONFIG = {
  checkoutUrl: "https://nestuge.com/YOUR-PRODUCT-LINK", // paste your Nestuge product link here
  prices: { NGN: "₦9,800", USD: "$9.97" }               // display only; set the real price on Nestuge
};
// ----------------------------
let cur = (Intl.DateTimeFormat().resolvedOptions().timeZone || "").startsWith("Africa/Lagos") ? "NGN" : "USD";

function setCur(c) {
  cur = c;
  document.querySelectorAll("[data-price]").forEach(e => (e.textContent = CONFIG.prices[c]));
  document.querySelectorAll(".cur button").forEach(b => {
    const on = b.dataset.c === c;
    b.classList.toggle("on", on);
    b.setAttribute("aria-pressed", on);
  });
}
document.querySelectorAll(".cur button").forEach(b => b.addEventListener("click", () => setCur(b.dataset.c)));
setCur(cur);

// Every "buy" button goes to the Nestuge checkout
document.querySelectorAll("[data-checkout]").forEach(a => { a.href = CONFIG.checkoutUrl; a.rel = "noopener"; });

// Sticky bar appears once the hero scrolls out of view
new IntersectionObserver(([e]) => document.querySelector(".bar").classList.toggle("on", !e.isIntersecting)).observe(document.querySelector(".hero"));
