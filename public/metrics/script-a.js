// Safe proxy for Vercel Analytics
(function () {
  const s = document.createElement("script");
  s.src = "https://priyanshusah.com/_vercel/insights/script.js";
  s.defer = true;
  s.setAttribute("data-endpoint", "/metrics-a");
  document.head.appendChild(s);
})();
