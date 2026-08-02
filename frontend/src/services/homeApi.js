const API_URL = "http://localhost:4000";

export async function getProducts(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const fetchUrl = `${API_URL}/api/v1/product${query ? `?${query}` : ""}`;
  //console.log("url is:", fetchUrl);
  const productRes = await fetch(fetchUrl);
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

export async function getCategories() {
  const categoryRes = await fetch(`${API_URL}/api/v1/category`);
  //console.log(categoryRes);
  if (!categoryRes.ok) {
    throw new Error("Failed to fetch categories.");
  }
  const data = await categoryRes.json();
  return data;
}
