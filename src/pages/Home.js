import React from 'react'
import { ApiLists } from '../api'

export default function Home ({productLists}) {      
  return (
    <div className='row no-margin'>
      {productLists.map((product,i) => {
        return(
          <div className='col-md-6' key={i}>  
          <div className='d-flex justify-content-between'>            
            <span className='price-box'>
              {product.price}
            </span>
            <span className='price-box' style={{cursor:'pointer'}}>
              <i class="fa-solid fa-cart-shopping"></i>
            </span>
          </div>  
          {console.log(product)}        
              <div className='text-center'>
              <div style={{width:380,height:380,backgroundColor:'#0000',margin:'auto'}}>
                <img src={ApiLists.baseURL+"/"+product.product_image} style={{width:'100%'}} className='img-hover-animate' alt='Loading.....'/>
              </div>
              <p className='no-margin'>{product.title}</p>
              </div>
          </div>
        )
      })}                            
    </div>
  )
}
