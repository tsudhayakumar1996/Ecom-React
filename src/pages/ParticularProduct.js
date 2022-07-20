import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { ApiLists } from '../api'

export default function ParticularProduct () {  
  
  const location = useLocation()
  const particularProduct = location.state.product
  
  const [productDetails, setproductDetails] = useState(null)
  const [activeImage, setactiveImage] = useState(particularProduct.product_image)

  useEffect(() => {
    setproductDetails(particularProduct)
    setactiveImage(particularProduct.product_image)
  }, [setproductDetails,particularProduct])      

  const imgChangeHandler = (image) => {
    setactiveImage(image)
  }

  if(productDetails){
    return (
      <div>
          <div className='row no-margin'>
            <div className='col-lg-8 no-padding'>
              <div style={{width:600,height:600,margin:'auto'}} className='pos-rel'>
                <img className='w-100 showing-image' src={ApiLists.baseURL+"/"+activeImage} alt='Product...'/>
              </div>
              <div className='pos-abs d-flex align-items-center flex-column img-selector-position'>
                {productDetails.other_images.map((product,idx)=>{
                  return(
                    <img style={{width:125,height:125}} onClick={()=>imgChangeHandler(product)} className={activeImage === product ?'cur-active-img' : 'active-img'} key={idx} src={ApiLists.baseURL+"/"+product} alt="Loading..."/>   
                  )                                
                })}
              </div>
            </div>
            <div className='col-lg-4 no-padding d-flex justify-content-center flex-column'>
              <div className='d-flex align-items-center justify-content-between'>
                <h1>{productDetails.title}</h1>
                <h1>{"("+productDetails.price+")"}</h1>
              </div>
              <p style={{marginTop:20}}>{productDetails.description}</p>
              <button className='btn-common' style={{width:130,marginTop:20}}>Add Cart<i className="fa-solid fa-arrow-right btn-arrow-right" style={{paddingLeft:10}}></i></button>
            </div>
          </div>
          <div>
            
          </div>
      </div>
    )
  }
}
