export function formatPrice(price) {
  return `$${Number(price).toFixed(2)}`;
}

export function discountedPrice(price, discountPercentage) {
  if (!discountPercentage) return price;
  return price * (1 - discountPercentage / 100);
}

export function getProductImage(product) {
  const images = product?.images || [];

  if (images.length >= 2) return images[0];
  if (images.length >= 1) return images[0];

  return product?.thumbnail || "";
}
