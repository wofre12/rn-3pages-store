import { api } from "./http";
export async function fetchAllProducts(){
  const { data } = await api.get("/products?limit=100");
  return data.products as Array<{id:number; title:string; thumbnail:string}>;
}
export async function fetchCategories(){
  const { data } = await api.get("/products/categories");
  return data as string[];
}
export async function fetchByCategory(cat:string){
  const { data } = await api.get(`/products/category/${encodeURIComponent(cat)}?limit=100`);
  return data.products as Array<{id:number; title:string; thumbnail:string}>;
}
export async function deleteProduct(id:number){
  const { data } = await api.delete(`/products/${id}`);
  return data as { isDeleted:boolean; id:number; };
}
