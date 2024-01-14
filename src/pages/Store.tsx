import React from 'react'
import storeItems from "../data/items.json"
import StoreItem from '@/components/StoreItem'

const Store = () => {
  return (
    <div className='px-2 md:px-12 lg:4'>
    <h1>Store</h1>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
    {storeItems.map( item =>(
        <div key={item.id}><StoreItem {...item}/></div>
    ))}
    </div>
    </div>
    

  )
}

export default Store