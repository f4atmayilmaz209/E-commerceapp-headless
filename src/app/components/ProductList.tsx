import Image from 'next/image'
import Link from 'next/link'
import { products } from '@wix/stores';
import DOMPurify from "isomorphic-dompurify"
import { wixFilterClient, wixFilterClientAsc, wixFilterClientDesc} from '../lib/utils';
import Pagination from './Pagination';

 
const ProductList = async(
  {categoryId,limit,searchParams}:
  {categoryId:string;limit?:number,searchParams?:any}) => {

  const name=searchParams?.name;
  const min=searchParams?.min;
  const max=searchParams?.max;
  const sort=searchParams?.sort;
  const type=searchParams?.type;
  const page=searchParams?.page;
  
  let res;
  if (sort) {
    const [sortType, sortBy] = sort.split(" ");
    if (sortType === "asc" && sortBy) {
      const productQuery=await wixFilterClientAsc({name,min,max,type,categoryId,limit,sortBy,page})
      res = await productQuery.find();
    }
    if (sortType === "desc") {
      const productQuery=await wixFilterClientDesc({name,min,max,type,categoryId,limit,sortBy,page})
      res = await productQuery.find();
    }
  }else{
    const productQuery=await wixFilterClient({name,min,max,type,categoryId,limit,page});
    const resim=await productQuery.find()
    res=resim;
  }

    
  return (
    <div className='mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
      {res?.items.map((product:products.Product)=>(
        <Link key={product._id} href={"/"+product.slug} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]'>
          <div className='relative w-full h-80'>
          <Image src={product.media?.mainMedia?.image?.url || "/product.png"} alt="" fill sizes="25vw" className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500'/>
          {product.media?.items && (
            <Image src={product.media?.items[1]?.image?.url || "/product.png"} alt="" fill sizes="25vw" className='absolute object-cover rounded-md'/>
          )} 
        
          </div>
          <div className='flex justify-between'>
              <span className='font-semibold'>{product.name}</span>
              <span className='font-semibold'>${product.price?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div className='text-sm text-gray-500' dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(
              product.additionalInfoSections?.find(
                (section:any)=>section.title==="shortDesc")?.description || ""
            )}}>
            </div>
          )}

          <button className='rounded-2xl ring-1 ring-fama text-fama py-2 w-max px-4 text-xs hover:bg-fama hover:text-white'>
              Add to Cart
          </button>
        </Link>

      ))}
      {
        searchParams?.cat || searchParams?.name ? (<Pagination 
        currentPage={res?.currentPage || 0}
        hasPrev={res?.hasPrev()}
        hasNext={res?.hasNext()}
        />) : null}
      </div> 
  )
}

export default ProductList
