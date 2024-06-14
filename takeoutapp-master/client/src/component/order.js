import Box from '@mui/material/Box';
import React, { useEffect } from 'react'
import SecondSearchAppBar from './profilenavbar'
import CollapsibleTable from './table'
import './navbar.css'
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import axios from 'axios';
//import "./signup.css"
const API_KEY = 'JqRPq5JPnp2Y9fAc-KhAIGybAurAuX6PzA_rEGVj34c';
const Order = () => {
  
    const {id}=useParams()
    const [page,Setpage]=useState(1)
    const hanlechange = (e,p)=>{
      Setpage(p)
    }
    const [orderdetail,Setorderdetail]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/selectevery",{params:{Id:id}}).then((res)=>{
            Setorderdetail(res.data)
        })
    },[])
    const [resp,Setresp] = useState({})
    useEffect(()=>{
      axios.get(`https://api.unsplash.com/photos/random/?client_id=${API_KEY}&query=${"supermarket"}`).then((res)=>{
        //console.log(res)
        Setresp(res.data.urls.raw)
        console.log(resp)
       })
       //console.log(resp)
    },[])
  return (
    <body background= {resp} >
      <>
        <SecondSearchAppBar/>
        <Box marginTop={10}/>
        <Grid container>
            <Grid item xs={2} marginBottom={50}/>
            <Grid item xs={8}>
                <CollapsibleTable Id={id} Page={page}/>
            </Grid>
            <Grid item xs={2} />
        </Grid>
        <Box justifyContent={"center"} display="flex" alignContent={"center"} marginTop={2} marginBottom={1}>
          <Pagination count={Math.ceil(orderdetail.length/5)} size="large" color="warning" onChange={hanlechange}/>
        </Box>
        <Box paddingBottom={25}>
        </Box>
        </>
    </body>
  )
}

export default Order