import React, { useEffect } from 'react';
import axios from 'axios';
import datajson from '../db.json'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const PostLesson = () => {
  const [post, setPost] = React.useState(null);


  const loaduser = async () => {
    await axios.get("http://localhost:3500/users")
      .then((response) => {
        setPost(response.data);
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    loaduser()
  }, [])

  const DeleteUser = (id) => {
    axios.delete(`http://localhost:3500/users/${id}`)
      .then(
        loaduser()
      )
  }

  return (
    <div style={{ marginTop: '3%', display: 'flex', justifyContent: 'center' }} >
      <TableContainer sx={{ width: '97%' }} component={Paper}>
        <Table sx={{ minWidth: 200, }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: '15px' }} >t/r</StyledTableCell>
              <StyledTableCell sx={{ width: '250px' }}>Name</StyledTableCell>
              <StyledTableCell sx={{ width: '350px' }} align="center" >Username</StyledTableCell>
              <StyledTableCell align="center" >Password</StyledTableCell>
              <StyledTableCell align="center" sx={{ width: '20%' }} >actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datajson.users.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center" >{row.username}</StyledTableCell>
                <StyledTableCell align="center" >{row.password}</StyledTableCell>
                <StyledTableCell align="center" >
                  <Link to={`/edit/${row.id}`} style={{ textDecoration: 'none' }} >
                    <Button variant='contained' style={{ height: '40px', width: '60px' }} >Edit</Button>
                  </Link>
                  <Button variant='contained' style={{ height: '40px', width: '130px', marginLeft: '2%', background: 'red', border: 'none' }} onClick={() => DeleteUser(row.id)} >Delete</Button>
                </StyledTableCell>
              </StyledTableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PostLesson;