import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Link, Button, Grid } from '@mui/material';
import PostPopup from './PostPopup';
import SearchIcon from '@mui/icons-material/Search';

const CustomNavbar = (props) => {
  const { signOutHandler, user } = props;
  const [open, setOpen] = useState(false);  

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333', color: '#fff' }}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="center"> <Grid item xs={6}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              RedHawk
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item xs={4} container spacing={2}>
                <Grid item>
                  <Typography variant="h6" sx={{}}>
                    <Link>
                      Home
                    </Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" sx={{}}>
                    <Link>
                      Account
                    </Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" sx={{}}>
                    <Link>
                      Settings
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={2}>
                <InputBase
                  placeholder="Search posts..."
                  inputProps={{ 'aria-label': 'search' }}
                  sx={{ mr: 2, backgroundColor: '#fff', borderRadius: '5px', paddingLeft: '10px'  }}
                />
              </Grid>
              <Grid item xs ={1}>
                <Button variant="contained" sx={{ backgroundColor: '#ff4500' }}>Search</Button>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={() => setOpen(true)}>Create Post</Button>
              </Grid>
              <Grid item xs={2}>
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

