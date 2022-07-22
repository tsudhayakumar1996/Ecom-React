import React, { useContext } from 'react'
import { ApiLists } from '../api'
import { useNavigate } from 'react-router-dom'
import { TopContext } from '../App'

export default function Home () {  
  
  const {contextVal} = useContext(TopContext)
  console.log(contextVal,"from home pages")
  const navigate = useNavigate()
  const imgClickHandler = (product) => {    
    navigate('particular_product',{state:{product}})
  }

  return (
    <div className='row no-margin'>
      {contextVal.products.map((product,i) => {
        return(
          <div className='col-md-6' key={i}>  
            <div className='d-flex justify-content-between'>            
              <span className='price-box'>
                {product.price}
              </span>
              <span className='price-box' style={{cursor:'pointer'}}>
                <i className="fa-solid fa-cart-shopping cart-animation"></i>
              </span>
            </div>                
            <div className='text-center'>
              <div style={{width:380,height:380,backgroundColor:'#0000',margin:'auto'}}>                               
                  <img src={ApiLists.baseURL+"/"+product.product_image} style={{width:'100%'}} onClick={()=>imgClickHandler(product)} className='img-hover-animate' alt='Loading.....'/>                                
              </div>
              <p style={{marginBottom:50}}>{product.title}</p>
            </div>
          </div>
        )
      })}                            
    </div>
  )
}
