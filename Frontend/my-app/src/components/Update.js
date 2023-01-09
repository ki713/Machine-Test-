import React from 'react'
import { Grid, TextField, Typography, FormControlLabel, Checkbox, Button, Box, Alert, InputLabel, MenuItem, Select, FormControl, FormLabel, RadioGroup, Radio, FormGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';

import { useState } from 'react';
import { styled } from '@mui/material/styles';


const Update = () => {
     // Style for Upload Button
  const Input = styled('input')({
    display: 'none',
  });

  // States
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [mobile_no,setMobile_no] = useState()
  const [desi, setDesi] = useState('')
  const [gender, setGender] = useState()
  const [course, setCourse] = useState([])
  const [pimage, setPimage] = useState('')
  const [rdoc, setRdoc] = useState('')
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

  // Multi Checkbox
  const getCourse = (e) => {
    let data = course
    data.push(e.target.value)
    setCourse(data)
  }

  // Clear Form
  const resetForm = () => {
    setName('')
    setEmail('')
    setMobile_no('')
    setDesi('')
    setGender('')
    setCourse([])
    setPimage('')
    setRdoc('')
    document.getElementById('resume-form').reset()
  }

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('name', name)
    data.append('email', email)
    data.append('mobile_no', mobile_no)
    data.append('desi', desi)
    data.append('gender', gender)
    data.append('course', course)
    data.append('pimage', pimage)
    data.append('rdoc', rdoc)
    if (name && email) {
      console.log(data.get('name'))
      console.log(data.get('email'))
      console.log(data.get('mobile_no'))
      console.log(data.get('desi'))
      console.log(data.get('gender'))
      console.log(data.get('course'))
      console.log(data.get('pimage'))
      console.log(data.get('rdoc'))
      setError({ status: true, msg: "Updation Done", type: 'success' })
      resetForm()
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }

    //to connect the http

    fetch("http://localhost:3001/update",{
      method : "POST",
      crossDomain : true,
      headers: {
        "Content-Type" : "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        mobile_no,
        
      }),

    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data,"userUpdated");
    });
     
  }
  return (
    <div>
       <Box display="flex" justifyContent="center" sx={{ backgroundColor: 'error.light', padding: 2 }}>
        <Typography variant='h2' component="div" sx={{ fontWeight: 'bold', color: 'white' }}>Updation Form</Typography>
      </Box>
      <Grid container justifyContent="center">

        <Grid item xs={5}>
          <Box component="form" sx={{ p: 3 }} noValidate id="resume-form" onSubmit={handleSubmit}>

            <TextField id="name" name="name" required fullWidth margin='normal' label='Name' onChange={(e) => setName(e.target.value)} />
            <TextField id="email" email="email" required fullWidth margin='normal' label='Email' onChange={(e) => setEmail(e.target.value)} />
            <TextField id="mobile_no" mobile_no="mobile_no" required fullWidth margin='normal' label='mobile_no' onChange={(e) => setMobile_no(e.target.value)} />
            
            <FormControl fullWidth margin='normal'>
              <InputLabel id="Designation-select-label">Designation</InputLabel>
              <Select labelId='Designation-select-label' id='Designation-select' value={desi} label='st' onChange={(e) => { setDesi(e.target.value) }}>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
              </Select>
            </FormControl>


            <FormControl fullWidth margin='normal'>
              <FormLabel id="gender-radio">Gender</FormLabel>
              <RadioGroup row name="gender" aria-labelledby="gender-radio">
                <FormControlLabel value="male" control={<Radio />} label='Male' onChange={(e) => setGender(e.target.value)} />
                <FormControlLabel value="female" control={<Radio />} label='Female' onChange={(e) => setGender(e.target.value)} />
                <FormControlLabel value="other" control={<Radio />} label='Other' onChange={(e) => setGender(e.target.value)} />
              </RadioGroup>
            </FormControl>


            <FormControl component='fieldset' fullWidth margin='normal'>
              <FormLabel component='legend'>Course</FormLabel>
              <FormGroup row>
                <FormControlLabel control={<Checkbox />} label="MCA" value="MCA" onChange={(e) => getCourse(e)} />
                <FormControlLabel control={<Checkbox />} label="BCA" value="BCA" onChange={(e) => getCourse(e)} />
                <FormControlLabel control={<Checkbox />} label="BSC" value="BSC" onChange={(e) => getCourse(e)} />
              </FormGroup>
            </FormControl>


            <Stack direction="row" alignItems="center" spacing={4} >
              <label htmlFor='ImgUpload'>
                <Input accept="image/*" id="ImgUpload" type="file" onChange={(e) => { setPimage(e.target.files[0]) }} />
                <Button variant='contained' component='span'>Upload Image </Button>
              </label>
             
            </Stack>

            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} color="error">Submit</Button>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Box display="flex" justifyContent="center" sx={{ backgroundColor: 'info.light', padding: 1 }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white' }}> List of Candidates</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell align="center">Avatar</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Moblie_No</TableCell>
                  <TableCell align="center">Designation</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Course</TableCell>
                 
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center"><Avatar src="#" /></TableCell>
                  <TableCell align="center">Kiranpreet</TableCell>
                  <TableCell align="center">kiran123@gmail.com</TableCell>
                  <TableCell align="center">7986476769</TableCell>
                  <TableCell align="center">Manager</TableCell>
                  <TableCell align="center">Female</TableCell>
                  <TableCell align="center">MCA</TableCell>
                 
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default Update
