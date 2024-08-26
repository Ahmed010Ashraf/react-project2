import React from 'react'

export default function Catchield({sub}) {
    // console.log(sub);
    
    if(!sub){
        return <div className='text-center border-2 text-3xl'>
            no sub catigories
        </div>
    }
  return (
    <div className='flex justify-center items-center flex-wrap gap-2'>
        {sub?.map(function(item , idx){
            return <div key={idx} className='w-full md:w-1/2 lg:w-1/4 p-1 border-2'>
            <h2>{item.name}</h2>
            </div>
        })}
    </div>
  )
}
