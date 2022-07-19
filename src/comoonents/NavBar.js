import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function NavBar({productLists}) {

  const navigate = useNavigate()
  const [searchBox, setsearchBox] = useState(false)
  const [filteredProducts, setfilteredProducts] = useState([])
  const [scrollToTop, setscrollToTop] = useState(false)  
  
  var viewPortHeight = window.innerHeight/2;  
  window.onscroll = function() {    
    var distanceScrolled = document.documentElement.scrollTop;    
    if(distanceScrolled > viewPortHeight){
      setscrollToTop(true);
    }else{
      setscrollToTop(false);
    }  
  }  

  const productSearchHandler = (searchKey) => {  
    if(searchKey !== ""){ 
      const filtering = productLists.filter(product => product.title.toLowerCase().includes(searchKey.toLowerCase()))  
      setfilteredProducts(filtering)      
      setsearchBox(true)
    }else{
      setsearchBox(false)
    }
  }  

  const productClickHandler = (product) => {
    setsearchBox(false)
    navigate('particular_product',{state:{product}})
  }

  const scrollToTopHandler = () => {
    if(scrollToTop){
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  const closeHandler = () => {
    setsearchBox(false)
  }

  return (
    <div className='nav-bar'>
      <div className='row no-margin'>
        <div className='col-lg-6' style={{paddingRight:0}}>          
          <div className='d-flex justify-content-between align-items-center'>
            <img src='./images/icon-4.png' className={scrollToTop ? 'scroll-to-top' : ""} onClick={()=>scrollToTopHandler()} style={{width:60,height:60}} alt='Brand'/>
            <div className='pos-rel'>
              <input placeholder={'Search The Product Here'} onChange={(e)=>productSearchHandler(e.target.value)} className='search-box'/>
              <i className="fa-solid fa-magnifying-glass pos-abs" style={{top:12,right:12}}></i>
              <i className={searchBox ? "cross-rotation fa-solid fa-xmark pos-abs" : ""} onClick={()=>closeHandler()} style={{top:12,right:36,cursor:'pointer'}}></i>
              {searchBox &&
                <div className='search-box-result pos-abs'>
                  {filteredProducts.length > 0 ?
                    filteredProducts.map((product,i) => {
                      return(
                        <p key={i} className='search-product' onClick={()=>productClickHandler(product)}>{product.title}</p>
                      )
                    }) : <p className='search-no-product'>No Match Product :(</p>
                  }                  
                </div>
              }
            </div>
          </div>
        </div>
        <div className='col-lg-6 d-flex align-items-center justify-content-end'>          
          <nav>
              <NavLink to={'/'}><i className="fa-solid fa-house hover-nav-icon"></i>Home</NavLink>
              <NavLink to={'/cart_list'}><i className="fa-solid fa-cart-shopping hover-nav-icon"></i>Cart List</NavLink>
              <NavLink to={'/user'}><i className="fa-solid fa-user hover-nav-icon"></i>User</NavLink>
          </nav>          
        </div>
      </div>
    </div>
  )
}
