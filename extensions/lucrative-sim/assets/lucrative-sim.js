(() => {
  const mount = document.querySelector('[data-lucrative-sim]');
  if (!mount) return;

  const shop = mount.dataset.shop || "";
  const productId = mount.dataset.productId || "";
  const baseUrl = (mount.dataset.appUrl || "").replace(/\/$/, "");

  if (!baseUrl) {
    mount.textContent = "Missing appUrl";
    return;
  }
  if (!shop || !productId) {
    mount.textContent = `Missing params: shop=${shop} product_id=${productId}`;
    return;
  }

  const url = `${baseUrl}/api/sim/templates?shop=${encodeURIComponent(shop)}&product_id=${encodeURIComponent(productId)}`;

  fetch(url, { credentials: "omit" })
    .then(async (res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      const svg = data?.svg || "";
      if (!svg) throw new Error("No svg in response");

      mount.innerHTML = `
        <div style="padding:14px;border:2px solid #00b8b8;border-radius:10px;">
          <div style="font-weight:700;margin-bottom:8px;">Lucrative Simulator ✅</div>
          <div style="font-size:12px;opacity:.7;margin-bottom:12px;">shop: ${escapeHtml(shop)} / product: ${escapeHtml(productId)}</div>
          <div style="background:#fff;border-radius:10px;overflow:hidden;display:flex;justify-content:center;">
            ${svg}
          </div>
        </div>
      `;
    })
    .catch((err) => {
      mount.innerHTML = `<div style="padding:14px;border:2px solid #e11d48;border-radius:10px;color:#e11d48;">
        Simulator error: ${escapeHtml(String(err?.message || err))}
      </div>`;
    });

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[m]));
  }
})();
