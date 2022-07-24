import { Route, Routes } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { FetchGet } from './fetchingComponents/fetch';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import NavBar from './components/NavBar';
import ParticularProduct from './pages/ParticularProduct';
import User from './pages/User';
import CartList from './pages/CartList';
import Loader from './components/loader';
import React from 'react';

export const TopContext = React.createContext()

function App() {  

  const BASE_URL = process.env.REACT_APP_BASE_URL

  const [products, setproducts] = useState(null)
  const [loggedIn, setloggedIn] = useState(false)
  const [scrollToTop, setscrollToTop] = useState(false)

  const fetchProduct = async () => {
    const products = await FetchGet(BASE_URL+'/product')    
    setproducts(products)
  }

  useEffect(() => {    
    fetchProduct();
  }, [])

  return (
    <div className='app_container'>        
      {products ?  
        <TopContext.Provider value={{products,loggedIn,setloggedIn,scrollToTop,setscrollToTop}}>
          <>  
            <NavBar />     
            <div style={{padding:80}}>
              <Routes>                          
                    <Route path='/' element={<Home />}></Route>
                    <Route path='particular_product' element={<ParticularProduct />}></Route>
                    <Route path='cart_list' element={<CartList />}></Route>
                    <Route path='user' element={<User />}></Route>
                    <Route path='*' element={<NoMatch />}></Route>                                                      
                    <Route path='login' element={<Login />}></Route>                    
              </Routes>
            </div>   
          </>
        </TopContext.Provider> :
        <Loader />
      }                
    </div>    
  );
}

export default App;
