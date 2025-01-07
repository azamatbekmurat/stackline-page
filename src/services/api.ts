import productsData from '../data/products.json';
import { Product } from '../features/productsSlice';

export const fetchData = async () => {

  return new Promise<Product[]>((resolve) => {
    setTimeout(() => {
      resolve(productsData);
    }, 500);
  });
};