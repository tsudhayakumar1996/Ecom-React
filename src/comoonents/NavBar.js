import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar({productLists}) {

  const [searchBox, setsearchBox] = useState(false)
  const [filteredProducts, setfilteredProducts] = useState([])
  const [rotateImg, setrotateImg] = useState(false)

  const productSearchHandler = (searchKey) => {  
    if(searchKey !== ""){ 
      const filtering = productLists.filter(product => product.title.toLowerCase().includes(searchKey.toLowerCase()))  
      setfilteredProducts(filtering)
      setsearchBox(true)
    }else{
      setsearchBox(false)
    }
  }

  const mouseHoldHandler = () => {
    setrotateImg(!rotateImg)
  }

  return (
    <div className='nav-bar'>
      <div className='row no-margin'>
        <div className='col-lg-6' style={{paddingRight:0}}>
          <div className='d-flex justify-content-between align-items-center'>
            <img src='./images/icon-4.png' className={rotateImg ? "rotate-img" : ""} onMouseLeave={()=>mouseHoldHandler()} onMouseEnter={()=>mouseHoldHandler()} style={{width:60,height:60}} alt='Brand'/>
            <div className='pos-rel'>
              <input placeholder='Search The Product Here' onChange={(e)=>productSearchHandler(e.target.value)} className='search-box'/>
              <i className="fa-solid fa-magnifying-glass pos-abs" style={{top:12,right:12}}></i>
              {searchBox &&
                <div className='search-box-result pos-abs'>
                  {filteredProducts.length > 0 ?
                    filteredProducts.map((product,i) => {
                      return(
                        <p key={i} className='search-product'>{product.title}</p>
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
              <NavLink to={'/'}><i class="fa-solid fa-house"></i><span style={{paddingLeft:10}}>Home</span></NavLink>
              <NavLink to={'/cart_list'}><i class="fa-solid fa-cart-shopping"></i><span style={{paddingLeft:10}}>Cart List</span></NavLink>
              <NavLink to={'/user'}><i class="fa-solid fa-user"></i><span style={{paddingLeft:10}}>User</span></NavLink>
          </nav>          
        </div>
      </div>
    </div>
  )
}
