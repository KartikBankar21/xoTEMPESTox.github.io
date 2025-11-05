// Local loader that fetches and executes Vercel Analytics safely
(async function () {
  try {
    const res = await fetch("https://priyanshusah.com/_vercel/insights/script.js");
    if (!res.ok) return;
    const code = await res.text();
    const blob = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const s = document.createElement("script");
    s.src = url;
    s.defer = true;
    s.setAttribute("data-endpoint", "/metrics-a");
    document.head.appendChild(s);
  } catch (e) {
    console.warn("Analytics blocked or unavailable");
  }
})();
