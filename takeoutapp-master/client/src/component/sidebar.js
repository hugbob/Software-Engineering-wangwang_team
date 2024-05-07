import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PrimarySearchAppBar from './navbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SettingsIcon from '@mui/icons-material/Settings';
import CustomImageList from './pic';
import BasicMenu from './menu';
import axios from 'axios';
import "./navbar.css"


const drawerWidth = 240;

const ClippedDrawer = (props)=> {
  const order={price:props.total,id:props.id,buy:props.Buy}
  const apply=()=>{
    axios.post("http://localhost:3001/buy",order).then((err)=>{
      if(err.data!==null)
      alert("购买失败")
      else {
        props.Init();
        alert("购买成功");
      }       
  }
    )
  }
  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <PrimarySearchAppBar id={props.id} setid={props.setid} Setrestaurant={props.Setrestaurant} Setsearchtext={props.Setsearchtext} beginsearch={props.Beginsearch}/>
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            backgroundColor: "rgb(249, 250, 251)",
            color :"dark"
          }
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
        
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem key='个人信息' >
              <ListItemButton href={`profile/${props.id}`}>
                <ListItemIcon>
                  <AccountCircleIcon color="warning"/>
                </ListItemIcon>
              <ListItemText primary='个人信息'/>
              </ListItemButton>
            </ListItem>
            <ListItem key='订单' >
              <ListItemButton href={`order/${props.id}`}>
                <ListItemIcon>
                  <LocalOfferIcon color="warning" />
                </ListItemIcon>
              <ListItemText primary='订单'/>
              </ListItemButton>
            </ListItem>
            <ListItem key='设置' >
              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon color="warning"/>
                </ListItemIcon>
              <ListItemText primary='设置'/>
              </ListItemButton>
            </ListItem>
            <BasicMenu Buy={props.Buy} total={props.total} />
            <ListItem key='结账' >
            <ListItemButton onClick={apply}>
                <ListItemIcon>
                  
                </ListItemIcon>
              <ListItemText primary='结账'/>
              </ListItemButton>
              
            </ListItem>
          </List>
          <CustomImageList/>
        </Box>
      </Drawer>
    </Box>
  );
}
export default ClippedDrawer;