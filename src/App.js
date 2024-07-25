import Dashbord from "./admin/Dashbord";
import { Route,Routes,BrowserRouter,} from "react-router-dom";
import User from "./user/User";
import Addcategory from './admin/Addcategory';
import Addprodcut from './admin/Addproduct';
import Navbar from './user/Navbar'
import Products from './admin/Products';
import Singleproduct from "./user/Singleproduct";
import Cart from "./user/Cart";
import Login from "./user/Login";
import Category from "./user/Category";
import Userprofile from "./user/Userprofile";
import Dashboarditems from "./admin/Dashboarditems";
import Logout from "./user/Logout";
import Checkout from "./user/Checkout";
import Orderstatus from "./user/Orderstatus";
import Review from "./user/Review";
import Ordertrack from "./user/Ordertrack";
import Orders from "./admin/Order";
import Watchlist from "./user/Watchlist";
import Forgotpass from "./user/Forgotpas";
import Footers from "./user/Footers";
import Pagenot from "./user/Pagenot";
function App() {

  return (
    <>
  <BrowserRouter>
  <Navbar/>
   <Routes>
    <Route path='/admin' element={<Dashbord/>}>  
        <Route path='addproduct' element={<Addprodcut/>}/>
        <Route path='addcategory' element={<Addcategory/>}/>
        <Route path='products' element={<Products/>}/>
        <Route path='orders' element={<Orders/>}/>
        <Route path='dashboard' element={<Dashboarditems/>}/>
    </Route>
    <Route path='/' element={<User/>}>  </Route>
    <Route path='cart' element={<Cart/>}/>
    <Route path='/singleproduct/:id' element={<Singleproduct/>}/>
    <Route path='/category/:category' element={<Category/>}/>
    <Route path='/userprofile' element={<Userprofile/>}/>
    <Route path='login' element={<Login/>}/>
    <Route path='/logout' element={<Logout/>}/>
    <Route path='/checkout' element={<Checkout/>}/>
    <Route path='orderstatus' element={<Orderstatus/>}/>
    <Route path='/review/:id' element={<Review/>}/>
    <Route path='/ordertrack/:id/:pid' element={<Ordertrack/>}/>
    <Route path="/watchlist" element={<Watchlist/>} />
    <Route path="/forgots" element={<Forgotpass/>}/>
    <Route path="*" element={<Pagenot/>}/>
   </Routes>
   <Footers/>
  </BrowserRouter>
    </>
  );
}

export default App;
