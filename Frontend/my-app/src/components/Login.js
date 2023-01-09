import React from 'react'

import { Grid, TextField, Typography,  Button, Box, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';

import { useState } from 'react';


const Login = () => {
   

  // States
 
  const [email, setEmail] = useState()
  const [password,setPassword] = useState()
  
  const [rdoc, setRdoc] = useState('')
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

  
  // Clear Form
  const resetForm = () => {
   
    setEmail('')
    setPassword('')
    setRdoc('')
    document.getElementById('resume-form').reset()
  }

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    
    data.append('email', email)
    data.append('password',password)
    data.append('rdoc', rdoc)
    if (password && email) {
      console.log(data.get('password'))
      console.log(data.get('email'))
      console.log(data.get('rdoc'))
      setError({ status: true, msg: "Login Successfully", type: 'success' })
      resetForm()
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }

     //to connect the http

     fetch("http://localhost:3001/login",{
      method : "POST",
      crossDomain : true,
      headers: {
        "Content-Type" : "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        
        email,
        password
        
      }),

    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data,"userLogin");
    });
  }
  return (
    <div>
         <Box display="flex" justifyContent="center" sx={{ backgroundColor:'#64b5f6', padding: 2 }}>
        <Typography variant='h2' component="div" sx={{ fontWeight: 'bold', color: 'white' }}>Login Form</Typography>
      </Box>
      <Grid container justifyContent="center">

        <Grid item xs={5}>
          <Box component="form" sx={{ p: 3 }} noValidate id="resume-form" onSubmit={handleSubmit}>

            
            <TextField id="email" email="email" required fullWidth margin='normal' label='Email' onChange={(e) => setEmail(e.target.value)} />
            <TextField id="password" password="password" required fullWidth margin='normal' label='password' onChange={(e) => setPassword(e.target.value)}  />
           

            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 ,backgroundColor:'#26c6da'}} color="error">Login</Button>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Box display="flex" justifyContent="center" sx={{ backgroundColor: '#26c6da', padding: 1,marginTop :4 }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white' }}> List of Candidates</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell align="center">Avatar</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                 
                 
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center"><Avatar src="#" /></TableCell>
                  <TableCell align="center">Kiranpreet</TableCell>
                  <TableCell align="center">kiran123@gmail.com</TableCell>
                 
                 
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      
    </div>
  )
}

export default Login
