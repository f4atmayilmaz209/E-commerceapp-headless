"use client"
import Image from 'next/image'
import React, { useState } from 'react'

// const images=[
//     {id:1,url:"https://images.pexels.com/photos/7368166/pexels-photo-7368166.jpeg?auto=compress&cs=tinysrgb&w=600"},
//     {id:2,url:"https://images.pexels.com/photos/9028912/pexels-photo-9028912.jpeg?auto=compress&cs=tinysrgb&w=600"},
//     {id:3,url:"https://images.pexels.com/photos/6755542/pexels-photo-6755542.jpeg?auto=compress&cs=tinysrgb&w=600"},
//     {id:4,url:"https://images.pexels.com/photos/8290193/pexels-photo-8290193.jpeg?auto=compress&cs=tinysrgb&w=600"},
// ]

const ProductImages = ({items}:{items:any}) => {
    const [index,setIndex]=useState(0)
  return (
    <div className=''>
        <div className='h-[500px] relative'>
            <Image
            src={items[index].image?.url}
            alt=""
            fill
            sizes="50vw"
            className="object-cover rounded-md"
            />
        </div>
        <div className='flex justify-between gap-4 mt-8 cursor-pointer'>
            {items.map((item:any,i:number)=>(
                <div className='w-1/4 h-32 relative gap-4 mt-8' key={item._id} onClick={()=>setIndex(i)}>
                    <Image
                        src={item.image?.url}
                        alt=""
                        fill
                        sizes="30vw"
                        className="object-cover rounded-md"
                    />
                </div>
            ))}

        </div>
    </div>
  )
}

export default ProductImages
