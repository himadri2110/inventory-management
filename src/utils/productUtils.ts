import { Product } from "../slices/ProductSlice";

export const getTotalStoreValue = (products: Product[]) => {
  return products.reduce((total, product) => {
    return total + Number(product.value);
  }, 0);
};

export const getProductCategoryCount = (products: Product[]) => {
  const categories = products.map((product) => product.category);
  const uniqueCategories = new Set(categories);

  return uniqueCategories.size;
};

export const getOutOfStockCount = (products: Product[]) => {
  const outOfStockProducts = products.filter(
    (product) => product.quantity === 0
  );

  return outOfStockProducts.length;
};
