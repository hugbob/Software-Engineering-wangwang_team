import logo from './logo.svg';
import './App.css';
import SignUp from "./component/signup"
import MyNavbar from './component/navbar';
import SignInSide from './component/signin';
import {Route,Routes} from "react-router-dom"
import Homepage from './component/homepage';
import Profile from './component/profile';
import Order from './component/order';
import Notfound from './component/Notfound';
const App =()=> {
  return (
     <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/signup" element ={<SignUp/>}/>
      <Route path="/signin" element ={<SignInSide/>}/>
      <Route path="/profile/:id" element ={<Profile/>}/> 
      <Route path='/order/:id' element={<Order />}/>
      <Route path="*" element={<Notfound/>}/>
     </Routes>
  );
}

export default App;
