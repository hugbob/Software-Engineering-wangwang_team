import React, { useEffect, useState } from 'react'
import ClippedDrawer from './sidebar';
import RecipeReviewCard from './goods';
import { Container, Grid, Pagination, textFieldClasses } from '@mui/material';
import { Stack } from '@mui/system';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import EggAltIcon from '@mui/icons-material/EggAlt';
import TapasIcon from '@mui/icons-material/Tapas';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import SetMealIcon from '@mui/icons-material/SetMeal';
import IcecreamIcon from '@mui/icons-material/Icecream';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SellIcon from '@mui/icons-material/Sell';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});
const Cartoon=()=>{
  return(
  <Grid item xs={1} minHeight={685} >
        <Stack spacing={5} paddingLeft={4} marginTop={10}>
        <Stack direction="row" spacing ={3}>
        <Stack spacing={6}>
        <EmojiFoodBeverageIcon color="warning"/> 
        <FastfoodIcon color="disabled"/>
        <ShoppingBasketIcon color="warning"/>
        <KebabDiningIcon color="disabled"/>
        <LocalShippingIcon color="warning"/>
        <SellIcon color="disabled"/>
        <BakeryDiningIcon color="warning"/>
        <DeliveryDiningIcon color="disabled"/>
        <IcecreamIcon color="warning"/>
        <LunchDiningIcon color="disabled"/>
        <SetMealIcon color="warning"/>
        </Stack>
        <Stack spacing={6}>
        <Box marginTop={-0.8}></Box>
        <DeliveryDiningIcon color="disabled"/>
        <EmojiFoodBeverageIcon color="warning"/> 
        <BakeryDiningIcon color="disabled"/>
        <ShoppingBasketIcon color="warning"/>
        <KebabDiningIcon color="disabled"/>
        <TapasIcon color="warning"/>
        <SellIcon color="disabled"/>
        <LunchDiningIcon color="warning"/>
        <LocalShippingIcon color="disabled"/>
        <FastfoodIcon color="warning"/>
        <IcecreamIcon color="disabled"/>


        </Stack>
        </Stack>
        </Stack>
      </Grid>
  )
}
const Homepage = () => {
  const [page,Setpage]=useState(1)
  const [currentmenu,Setcurrentmenu]=useState([])
  const [menu,Setmenu]=useState([])
  const [restaurant,Setrestaurant]=useState(null)
  const [id,Setid]=useState(null);
  const [buy,Setbuy]=useState([])
  const [price,Setprice]=useState(0)
  const [searchtext,Setsearchtext]=useState("")
  const [buydetail,Setbuydetail]=useState([])
  const init=()=>{
    Setprice(0)
    Setbuy([])
    Setbuydetail([])
  }
  const beginsearch=()=>{
    axios.get("http://localhost:3001/menuwithselect",{params:{searchcontent:searchtext}}).then((item)=>{
      Setmenu(item.data)
    })
  }
  useEffect(()=>{
    let temp=buy
    let ans=[]
    while(temp.length!==0){
      let select=temp.filter((item)=>{
         return item.id===temp[0].id
      })
      temp=temp.filter((item)=>{
        return item.id!==temp[0].id
      })
      let obj={id:select[0].id,price:select.length*select[0].price,name:select[0].name,restaurant_Restaurant_id:select[0].restaurant_Restaurant_id,num:select.length}
      ans=ans.concat(obj)
    }
    Setbuydetail(ans)
  },[buy])
  const addbuy=(object)=>{
    Setbuy(buy.concat([object]))
    const x=parseFloat(object.price)
    Setprice(price+x)
  }                                                   
  const hanlechange = (e,p)=>{
    Setpage(p)
  }
  const location=useLocation();
  useEffect(()=>{
    axios.get(`http://localhost:3001/showmenu`,{}).then((menu)=>{Setmenu(menu.data)})
   },[])
  useEffect(()=>{
    Setcurrentmenu(menu.filter((item,index)=>{
      return index<8
    }))
   },[menu])
  useEffect(()=>{
    Setcurrentmenu(menu.filter((item,index)=>{
      return index<8*page && index>=8*(page-1)
    }))
   },[page,restaurant])
  useEffect(()=>{
    if(location.state!=null) Setid(location.state)
   },[location.state])
   const menulist=currentmenu.map((item)=>(
    <Grid item xs={3} >
      <RecipeReviewCard Id={item.Menu_id} Name={item.Name} Price={item.Price} Image={item.Image} Likes={item.Likes} restaurant_Restaurant_id={item.restaurant_Restaurant_id} Setadd={addbuy}/>
    </Grid>
   ))
   useEffect(()=>{
    if(restaurant!=null){
      axios.get(`http://localhost:3001/selectrestaurant`,{params:{restaurant:restaurant}}).then((menu)=>Setmenu(menu.data))
    }
   },[restaurant])
 
  


  return (
    <div>
      <Grid container >
      <Grid item xs={2}>
      <ClippedDrawer id={id} setid={Setid} Setrestaurant={Setrestaurant} Buy={buydetail}  total={price} Init={init} Setsearchtext={Setsearchtext} Beginsearch={beginsearch}/>
      </Grid>
      <Grid item xs={9}>
      <Grid container spacing={2}  >
        <Grid item xs={12} height={70}/>
        {menulist}
      </Grid>
      </Grid>
      <Cartoon/>
      <Box></Box>
      </Grid>
      <Box justifyContent={"center"} display="flex" alignContent={"center"} marginTop={2} marginBottom={1}>
        <Pagination count={Math.ceil(menu.length/8)} size="large" color="warning" onChange={hanlechange}/>
      </Box>
    </div>
  )
}

export default Homepage