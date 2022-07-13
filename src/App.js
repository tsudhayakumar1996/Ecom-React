import { Route, Routes } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { ApiLists } from './api';
import { FetchGet } from './fetchers/fetching';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import NavBar from './comoonents/NavBar';
import ParticularProduct from './pages/ParticularProduct';
import User from './pages/User';
import CartList from './pages/CartList';
import Loader from './comoonents/loader';

function App() {

  useEffect(() => {
    fetchProduct();
  }, [])

  const [products, setProducts] = useState(null)

  const fetchProduct = async () => {
    const products = await FetchGet(ApiLists.baseURL+'/product')    
    setProducts(products)
  }

  const loggedIn = true;

  return (
    <div className='app_container'>  
      {products ?  
        <>    
          <NavBar productLists={products}/>     
          <div style={{padding:80}}>
            <Routes>
              {loggedIn ?
                <>            
                  <Route path='/' element={<Home productLists={products} />}></Route>
                  <Route path='particular_product' element={<ParticularProduct />}></Route>
                  <Route path='cart_list' element={<CartList />}></Route>
                  <Route path='user' element={<User />}></Route>
                  <Route path='*' element={<NoMatch />}></Route>
                </> : 
                <>
                  <Route path='/' element={<Home />}></Route>
                  <Route path='particular_product' element={<ParticularProduct />}></Route>
                  <Route path='login' element={<Login />}></Route>
                  <Route path='*' element={<NoMatch />}></Route>
                </>
              }                
            </Routes>
          </div>   
        </> :
        <Loader />
      }     
    </div>
  );
}

export default App;
