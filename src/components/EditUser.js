import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';

export default function BasicTextFields() {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3500/users/${id}`).then((response) => {
      setName(response.data.name);
      setUsername(response.data.username);
      setPassword(response.data.password);
    });
  }, []);

  const data = {
    name: name,
    username: username,
    password: password
  }
  function Update(e) {
    if (name.length === 0 || username.length === 0 || password.length === 0) { setError(true) }
    else {
      e.preventDefault()
      axios.put(`http://localhost:3500/users/${id}`, data)
        .then(
          navigate("/")
        )
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }} >
      <TextField onChange={e => setName(e.target.value)} value={name} sx={{ width: '26%' }} label="Name" variant="outlined" />
      {error && name.length <= 0 ?
        <Typography sx={{ position: 'absolute', marginLeft: '-1135px', marginTop: '60px', color: 'red' }}>name is required</Typography>
        : ''}

      <TextField onChange={e => setUsername(e.target.value)} value={username} sx={{ width: '26%', marginLeft: '1%' }} label="Username" variant="outlined" />
      {error && username.length <= 0 ?
        <Typography sx={{ position: 'absolute', marginLeft: '-395px', marginTop: '60px', color: 'red' }}>name is required</Typography>
        : ''}
      <FormControl sx={{ width: '26%', marginLeft: '1%' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          onChange={e => setPassword(e.target.value)} value={password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {error && password.length <= 0 ?
          <Typography sx={{ position: 'absolute', marginLeft: '15px', marginTop: '60px', color: 'red' }}>name is required</Typography>
          : ''}
      </FormControl>
      <Button sx={{ marginLeft: '1%', width: '13%' }} variant="contained" onClick={Update}>Edit user</Button>
    </Box>
  );
}