import { wixClientServer } from '../lib/wixClientServer';
import { products } from '@wix/stores';

const wixClient=await wixClientServer();
const PRODUCT_PER_PAGE=5;


export const wixFilterClient=async({name,min,max,type,categoryId,limit,page}:
    {name?:string,min?:number,max?:number,type?:string,categoryId:string,limit?:number,page?:number}
)=>{

    const productQuery= wixClient.products
    .queryProducts()
    .startsWith("name", name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      type ? [type] : ["physical", "digital"]
    )
    .gt("priceData.price", min || 0)
    .lt("priceData.price", max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(page ? page * (limit || PRODUCT_PER_PAGE) : 0)

    return productQuery;
}
export const wixFilterClientAsc=async({name,min,max,type,categoryId,limit,sortBy,page}:
    {name?:string,min?:number,max?:number,type?:string,categoryId:string,limit?:number,sortBy:any,page?:number}
)=>{

    const productQuery= wixClient.products
    .queryProducts()
    .startsWith("name", name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      type ? [type] : ["physical", "digital"]
    )
    .gt("priceData.price", min || 0)
    .lt("priceData.price", max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(page ? page * (limit || PRODUCT_PER_PAGE) : 0)
    .ascending(sortBy)

    return productQuery;
}
export const wixFilterClientDesc=async({name,min,max,type,categoryId,limit,sortBy,page}:
    {name?:string,min?:number,max?:number,type?:string,categoryId:string,limit?:number,sortBy:any,page?:number}
)=>{

    const productQuery= wixClient.products
    .queryProducts()
    .startsWith("name", name || "")
    .eq("collectionIds", categoryId)
    .hasSome(
      "productType",
      type ? [type] : ["physical", "digital"]
    )
    .gt("priceData.price", min || 0)
    .lt("priceData.price", max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(page ? page * (limit || PRODUCT_PER_PAGE) : 0)
    .descending(sortBy)

    return productQuery;
}