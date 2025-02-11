"use server";

import axios from "axios";

export async function getProducts({ query }: { query?: string }) {
  try {
    if (query) {
      const res = await axios.get(`https://fe-test-api.jmm88.com/api/products?search=${query}`);

      return res.data;
    }

    const res = await axios.get("https://fe-test-api.jmm88.com/api/products");

    return res.data;
  } catch (error) {
    console.log(error, "<---errorGetProducts");
  }
}

export async function getProductById({ productId }: { productId?: string }) {
  try {
    const res = await axios.get(`https://fe-test-api.jmm88.com/api/products/${productId}`);

    return res.data;
  } catch (error) {
    console.log(error, "<---errorGetProducts");
  }
}

// export const searchProduct = async (query: string) => {
//   try {
//     const res = await axios.get(`https://fe-test-api.jmm88.com/api/products?search=${query}`);

//     console.log(res.data, "<---searchProductServer");

//     return res.data;
//   } catch (error) {
//     console.log(error, "<---errorSearchProduct");
//   }
// };
