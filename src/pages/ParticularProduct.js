import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { ApiLists } from '../api'
import { useContext } from 'react'
import { TopContext } from '../App'

export default function ParticularProduct () {  

  const contextVal = useContext(TopContext)  
  const productLists = contextVal.contextVal.products  
  
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
  
  window.onscroll = function() {    
    horizontalScroll()
  }

  var lastScrollTop = 0;

  function horizontalScroll (where=null) {
    const carousal = document.getElementById('carousal-item-box')
    if(where){
      if(where === "toleft"){
        carousal.scrollTo({left:(productLists.length)*325,behavior:'smooth'})
      }else{
        carousal.scrollTo({left:0,behavior:'smooth'})
      }
    }else{
      let currentY = window.pageYOffset        
      if(currentY > lastScrollTop){      
        carousal.scrollBy(20,0)
      }else{      
        carousal.scrollTo({left:0,behavior:'smooth'})
      }
      lastScrollTop = currentY <= 0 ? 0 : currentY  
    }      
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
          {/* <button onClick={() => horizontalScroll()}>click to scroll</button> */}
          <div className='carousal-box'>
            <div className='carousal-inner d-flex align-items-center' id='carousal-item-box'>
              <i className="fa-solid fa-caret-right" onClick={()=>horizontalScroll('toleft')} style={{fontSize:50,cursor:'pointer',zIndex:1}}></i> 
              {productLists.map((product,idx)=>{
                return(
                  <img key={idx} src={ApiLists.baseURL+"/"+product.product_image} className='img-hover-animate-scale-down' alt="Loading..." style={{width:325,height:325,zIndex:0,cursor:'pointer'}}/>
                )
              })} 
              <i className="fa-solid fa-caret-left" onClick={()=>horizontalScroll('toright')} style={{fontSize:50,cursor:'pointer',zIndex:1}}></i>            
            </div>
          </div>
          <div>

          </div>
      </div>
    )
  }
}
