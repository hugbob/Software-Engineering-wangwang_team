import React, { useEffect, useState } from 'react'
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
import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow )(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const Orderdetail = (props) => {
    const [orderdetail,Setorderdetail]=useState([])
    console.log(props)
    useEffect(()=>{
        axios.get("http://localhost:3001/selectbyorderid",{params:{Id:props.id}}).then((res)=>{
            Setorderdetail(res.data)
            console.log(res)
        })
    },[props])
  return (
    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={props.open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                订单明细
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>商品名称</TableCell>
                    <TableCell>商品类型</TableCell>
                    <TableCell align="right">单价</TableCell>
                    <TableCell align="right">数量</TableCell>
                    <TableCell align="right">总价</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderdetail.map((historyRow) => (
                    <StyledTableRow key={historyRow.menu_Menu_id}>
                      <TableCell component="th" scope="row">
                        {historyRow.Name}
                      </TableCell>
                      <TableCell>{historyRow.Resname}</TableCell>
                      <TableCell align="right">{historyRow.Price}</TableCell>
                      <TableCell align="right">
                        {historyRow.amount}
                      </TableCell>
                      <TableCell align="right">{historyRow.Price*historyRow.amount}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
  )
}

export default Orderdetail;
