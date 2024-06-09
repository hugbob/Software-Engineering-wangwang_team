import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import Orderdetail from './orderdetail';
import { styled } from '@mui/material/styles';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { rootShouldForwardProp } from '@mui/material/styles/styled';

function Row(props) {
  const [state,Setstate] = React.useState(props.row)
  const { row } = props;
  console.log(row)
  const [open, setOpen] = React.useState(false);
  React.useEffect(()=>{
    Setstate(props.row)
  },[props])
  const confirmorder=()=>{
    axios.post("http://localhost:3001/confirm",{id:row.Order_id}).then((err)=>{
      if(err.data!==null){
        alert("确认失败")
      }
      else{
        alert("确认收货成功")
        Setstate((prev)=>({...prev,Cur_status:1}))
        props.setmethod()
      }
    })
  }
  return (
    <React.Fragment>
      <TableRow  sx={{ '& > *': { borderBottom: 'unset' } ,backgroundColor: state.Cur_status ? "white":"WhiteSmoke "}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton >
          
          <IconButton size="small" color={state.Cur_status? 'inherit':'warning'} onClick={confirmorder} disabled={state.Cur_status}>
          <TaskAltIcon/>
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Order_id}
        </TableCell>
        <TableCell align="right">{row.Time}</TableCell>
        <TableCell align="right">{state.Cur_status ? "已完成":"未完成"}</TableCell>
        <TableCell align="right">{row.delivery_guy_Delivery_guy_id}</TableCell>
        <TableCell align="right">{row.Total_price}</TableCell>
      </TableRow>
      <Orderdetail open={open} id={row.Order_id}/>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const CollapsibleTable=(props)=> {
  // const[everypage,Seteverypage]=React.useState()
  const [order,Setorder]=React.useState([])
  const [orderdetail,Setorderdetail]=React.useState([])
  React.useEffect(()=>{
    Setorderdetail(order.filter((item,index)=>{
      return index<5*props.Page && index>=5*(props.Page - 1)
    }))
  },[props,order])
  React.useEffect(()=>{
    axios.get("http://localhost:3001/selectfromorder",{params:{Id:props.Id}}).then((res)=>{
      Setorder(res.data)
    })
  },[])
  const method=()=>{
    axios.get("http://localhost:3001/selectfromorder",{params:{Id:props.Id}}).then((res)=>{
      Setorder(res.data)
    })
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>订单号</TableCell>
            <TableCell align="center">时间</TableCell>  
            <TableCell align="right">当前状态</TableCell>
            <TableCell align="right">配送员编号</TableCell>
            <TableCell align="right">总价</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderdetail.map((row) => (
            <Row row={row} setmethod={method}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default CollapsibleTable;