import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

 
  
  const [name,setName] = useState({
    id:"",
    name:"",
    address:"",
    phonenum:"",
    password:""
  })

  const addpeople = () => {
    console.log({name})
    if(name.phonenum.length!== 11) {
     alert("请输入正确的手机号！");
    }
    else{
    Axios.post('http://localhost:3001/addcustomer',name).then((err)=>{
      console.log(err)
      if(err.data!==null) 
      {
        alert("信息重复");
        return;
      } 
      else 
       navigate("/",{state:name.id});
      });
    }
    
   
  }
 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            注册界面
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstName"
                  label="姓名"
                  autoFocus
                  onChange={(e)=>{
                    setName((prev)=>({...prev,name:e.target.value}));}}          
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="firstName"
                  label="学号"
                  autoFocus
                  onChange={(e)=>{
                    setName((prev)=>({...prev,id:e.target.value}));}} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="地址"
                  name="address"
                  autoComplete="address"
                  onChange={(e)=>{
                    setName((prev)=>({...prev,address:e.target.value}));}} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="密码"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e)=>{
                    setName((prev)=>({...prev,password:e.target.value}));}} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="telephone"
                  label="手机号"
                  type="telephone"
                  id="telephone"
                  autoComplete="telephone"
                  onChange={(e)=>{
                    setName((prev)=>({...prev,phonenum:e.target.value}));}} 
                />
              </Grid>
            </Grid>
            <Button
              onClick={addpeople}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              注册
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}