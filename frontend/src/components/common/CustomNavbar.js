import React, { useState } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Link, Button, Grid } from '@mui/material';
import PostPopup from './PostPopup';
import RedhawkLogo from '../../assets/redhawk_logo.png';
import SearchIcon from '@mui/icons-material/Search';

const CustomNavbar = (props) => {
  const { signOutHandler, user } = props;
  const [open, setOpen] = useState(false);  
  const [query, setQuery] = useState('');
  const handleSearch = () => {
    axios({
      url: 'http://localhost:8000/api/search/?query=' + query,
      method: 'GET',
    }).then((data) => {
      console.log('data = ', data);
      window.location.href = '/search?query=' + query;
    }).catch((e) => {
      console.log(e);
    });
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333', color: '#fff' }}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={6}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => { window.location.href = "/" }}>
              <img src={RedhawkLogo} alt="Redhawk" height="40" width="40" style={{ marginRight: '10px' }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
                RedHawk
              </Typography>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={3} container spacing={2}>
                <Grid item>
                  <Typography variant="h6" sx={{}}>
                    <Link href="/" underline="none">
                      Home
                    </Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" sx={{}}>
                    <Link href={"/users/" + user.uid} underline="none">
                      Account
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={3} align="center">
                <InputBase
                  placeholder="Search posts..."
                  inputProps={{ 'aria-label': 'search' }}
                  sx={{ mr: 2, backgroundColor: '#fff', borderRadius: '5px', paddingLeft: '10px'  }}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Grid>
              <Grid item xs ={2} align="center">
                <Button variant="contained" sx={{ backgroundColor: '#ff4500' }} onClick={handleSearch}>Search</Button>
              </Grid>
              <Grid item xs={2} align="center">
                <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={() => setOpen(true)}> New Post</Button>
              </Grid>
              <Grid item xs={2} align="center">
                <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={signOutHandler}>Sign Out</Button>
              </Grid>
              <PostPopup open={open} handleClose={() => setOpen(false)} user={user} />
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default CustomNavbar;
