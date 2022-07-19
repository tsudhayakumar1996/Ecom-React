import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { ApiLists } from '../api'

export default function ParticularProduct () {  
  
  const location = useLocation()
  console.log(location.state.product,"<=========location") 
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
              <div className='pos-abs d-flex align-items-center flex-column' style={{top:0}}>
                {productDetails.other_images.map((product,idx)=>{
                  return(
                    <img style={{width:150,height:150}} onClick={()=>imgChangeHandler(product)} className={activeImage === product ?'cur-active-img' : 'active-img'} key={idx} src={ApiLists.baseURL+"/"+product} alt="Loading..."/>   
                  )                                
                })}
              </div>
            </div>
            <div className='col-lg-4 no-padding'>
              
            </div>
          </div>
      </div>
    )
  }
}
