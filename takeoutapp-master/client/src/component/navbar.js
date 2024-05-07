import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar, Button, ButtonGroup, Link } from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import { textAlign } from '@mui/system';
import './navbar.css'
import axios from 'axios';
import { deepOrange } from '@mui/material/colors';
import BasicMenu from './menu';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const PrimarySearchAppBar=(props)=> {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [name,Setname] = React.useState(null);
  React.useEffect(()=>{
    if(props.id!=null){
   axios.get("http://localhost:3001/namebyid",{params:{id:props.id}}).then((name)=>{
    Setname(name.data[0].Name)
     })
    } else {
      Setname(null);
    }
    console.log('changing')
  }, )
  console.log(name)
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
      <AppBar position="fixed" sx={{backgroundColor: 'warning.light', zIndex: (theme) => theme.zIndex.drawer + 1 }} >
        <Toolbar>
          <IconButton
            size="large"  
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Search>
            <SearchIconWrapper>
              <LunchDiningIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="找一找你爱吃的美食"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>{props.Setsearchtext(e.target.value)}}
            />
            
          </Search>
          <IconButton color='secondary' size='large' variant="outlined" onClick={()=>{props.beginsearch()}}>
            <ManageSearchIcon/>
          </IconButton>
          <Box className='toright'>
            <Link color="inherit" underline='none' href='http://localhost:3000/'>主页</Link> 
            <ButtonGroup variant='text' color='inherit' className='toright2'>
              <Button onClick={()=>{props.Setrestaurant(1)}}>曦园餐厅</Button>
              <Button onClick={()=>{props.Setrestaurant(2)}}>晨园餐厅</Button>
              <Button onClick={()=>{props.Setrestaurant(3)}}>双创餐厅</Button>
            </ButtonGroup> 
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box display='flex'> 
            <ButtonGroup variant='text' color='inherit'>
              <Button disabled={name? false:true} onClick={()=>props.setid(null)}> 登出</Button>
              <Button href='/signin' disabled={name}>登录</Button>
              <Button href='/signup'>注册</Button>
            </ButtonGroup>
            <Avatar className='toright3'  sx={{ bgcolor: deepOrange[400]}}>{name?name[0]:null}</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
  );
}
export default PrimarySearchAppBar