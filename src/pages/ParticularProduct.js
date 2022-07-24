import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import { ApiLists } from '../api'
import { useContext } from 'react'
import { TopContext } from '../App'

export default function ParticularProduct () {  

  const {products,setscrollToTop} = useContext(TopContext)  
  
  const location = useLocation()
  const particularProduct = location.state.product
  
  const [productDetails, setproductDetails] = useState(null)
  const [activeImage, setactiveImage] = useState(particularProduct.product_image)
  const [sample, setsample] = useState(false)

  const productSetDataHandler = (particularProduct) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setproductDetails(particularProduct)
    setactiveImage(particularProduct.product_image)
  }

  useEffect(() => {
      productSetDataHandler(particularProduct)
  }, [])   

  const imgChangeHandler = (image) => {
    setactiveImage(image)
  }   
  
  if(productDetails){
    window.onscroll = function() {    
      horizontalScroll()
      setToTopHandler()
    }
  }

  const setToTopHandler = () => {
    var viewPortHeight = window.innerHeight/2;
    var distanceScrolled = document.documentElement.scrollTop;    
    if(distanceScrolled > viewPortHeight){  
      setscrollToTop(true)
    }else{
      setscrollToTop(false)
    }
  }

  var lastScrollTop = 0;

  function horizontalScroll (where=null) {
    const carousal = document.getElementById('carousal-item-box')
    if(where){
      if(where === "toleft"){
        carousal.scrollTo({left:(products.length)*325,behavior:'smooth'})        
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

  const particularProductReEntryHandler = (product) => {
    productSetDataHandler(product)
  }
  
  if(productDetails){    
    return (
      <>
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
        <div className='carousal-box'>
          <div className='carousal-inner d-flex align-items-center' id='carousal-item-box'>
            <i className="fa-solid fa-caret-right" onClick={()=>horizontalScroll('toleft')} style={{fontSize:50,cursor:'pointer',zIndex:1}}></i> 
            {products.map((product,idx)=>{
              return(
                <img key={idx} src={ApiLists.baseURL+"/"+product.product_image} onClick={()=>particularProductReEntryHandler(product)} className='img-hover-animate-scale-down' alt="Loading..." style={{width:325,height:325,zIndex:0,cursor:'pointer'}}/>
              )
            })} 
            <i className="fa-solid fa-caret-left" onClick={()=>horizontalScroll('toright')} style={{fontSize:50,cursor:'pointer',zIndex:1}}></i>            
          </div>
        </div>
        <div>
          {/* <button onClick={()=>testHandler()}>click</button> */}
        </div>
      </>
    )
  }
}
