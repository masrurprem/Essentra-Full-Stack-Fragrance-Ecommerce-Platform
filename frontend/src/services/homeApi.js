const API_URL = "http://localhost:4000";

export async function getProducts() {
  const productRes = await fetch(`${API_URL}/api/v1/product`);
  if (!productRes.ok) {
    throw new Error("Failed to fetch Products.");
  }
  const data = await productRes.json();
  return data;
}

export async function getProductBySlug(slug) {
  const productRes = await fetch(`${API_URL}/api/v1/product/${slug}`);
  if (!productRes.ok) {
    throw new Error("Failed to fetch Product Details.");
  }
  const data = await productRes.json();
  return data;
}
