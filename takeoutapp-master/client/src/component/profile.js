import React, { useEffect } from 'react'
import SecondSearchAppBar from './profilenavbar'
import { useState } from 'react'
import axios from 'axios'
import { Box, textAlign } from '@mui/system'
import { Avatar, Grid, IconButton, Stack } from '@mui/material'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import Button from '@mui/material/Button'
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import SetMealIcon from '@mui/icons-material/SetMeal';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PortraitIcon from '@mui/icons-material/Portrait';
import "./signup.css"
const  Profile= (props) => {
  const {id}=useParams()
  const [profile,Setprofile]=useState({})
  useEffect(()=>{
    console.log(id)
    if(id!=="null"){
    console.log(id)
    axios.get("http://localhost:3001/selectbyid",{params:{id:id}}).then((res)=>{
      console.log(res)
      Setprofile(res.data[0])
    })
  }},)
  console.log(profile)
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <Box className="backimg">
      <SecondSearchAppBar />
        <Box paddingTop={20} display="flex" justifyContent={"center"} marginLeft={5} marginRight={5}  >
          <Grid container>
            <Grid item xs={4} marginTop={5}>
              <Stack spacing={25}>
                <Stack>
                <Grid container >
                <Grid item display="flex" justifyContent={"center"} xs={12} >
                <StorefrontIcon color='warning' />
                </Grid>
                </Grid>
                <Item>
                  <p>名字：{profile.Name? profile.Name : "未登录"} </p>
                </Item>
                </Stack>
                <Stack>
                <Grid container >
                <Grid item display="flex" justifyContent={"center"} xs={12} >
                <DeliveryDiningIcon color='warning' />
                </Grid>
                </Grid>
                <Item>
                  <p>地址：{profile.Address? profile.Address : "未登录"} </p>
                </Item>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent={"center"}>
              <Avatar  sx={{ width: 350, height: 350 }} src={`https://source.unsplash.com/random/?${id%2===0? "dog":"cat"}`} />
            </Grid> 
            <Grid item xs={4} marginTop={5}>
            <Stack spacing={25}>
              <Stack>
              <Grid container >
                <Grid item display="flex" justifyContent={"center"} xs={12} >
                <PhoneAndroidIcon color='warning' />
                </Grid>
                </Grid>
                <Item>
                <p>电话：{profile.Phone_num? profile.Phone_num : "未登录"} </p>
                </Item>
              </Stack>
              <Stack>
              <Grid container >
                <Grid item display="flex" justifyContent={"center"} xs={12} >
                <PortraitIcon color='warning' />
                </Grid>
                </Grid>
                <Item>
                <p>学号：{profile.Customer_id? profile.Customer_id : "未登录"} </p>
                </Item>
              </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      <Box marginTop={-4} display="flex" justifyContent={"center"} marginLeft={5} marginRight={5}>
        <Button color="warning"variant="outlined" startIcon={<BookmarkBorderIcon />} href={`/order/${id}`}>
           订单
        </Button>
      </Box>
      <Box paddingBottom={20}>
      </Box>
    </Box>
    
  )
}

export default  Profile