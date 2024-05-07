import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import "./navbar.css"

const BasicMenu=(props)=> {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const output=props.Buy.map((item)=>(
    <MenuItem>
       您已购买{item.name}*{item.num},￥{item.price}
    </MenuItem>
  )
  )
  console.log(props.total)

  return (
    <div className='toright5'>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<LocalMallIcon />}
        color="warning"
      >
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {output}
       <MenuItem>
           总计￥{props.total}
       </MenuItem> 
      </Menu>
    </div>
  );
}
export default BasicMenu;