// Safe proxy for Vercel Speed Insights
(function () {
  const s = document.createElement("script");
  s.src = "https://priyanshusah.com/_vercel/speed-insights/script.js";
  s.defer = true;
  s.setAttribute("data-endpoint", "/metrics-b");
  document.head.appendChild(s);
})();
