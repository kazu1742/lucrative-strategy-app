export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop") ?? "";
  const productId = url.searchParams.get("product_id") ?? "";

  const svg = `
<svg width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="340" height="340" fill="none" stroke="#00b8b8" stroke-width="3"/>
  <text x="180" y="120" text-anchor="middle" font-size="18" font-family="Arial">Template from API</text>
  <text x="180" y="170" text-anchor="middle" font-size="12" font-family="Arial">shop: ${escapeXml(shop)}</text>
  <text x="180" y="200" text-anchor="middle" font-size="12" font-family="Arial">product_id: ${escapeXml(productId)}</text>
  <circle cx="180" cy="255" r="45" fill="none" stroke="#00b8b8" stroke-width="3"/>
</svg>`.trim();

  const body = JSON.stringify({ shop, productId, svg });

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
