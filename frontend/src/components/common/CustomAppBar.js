import React, { useState } from 'react';
import withStyles from '@mui/styles/withStyles';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MIAMI_RED_COLOR } from '../../shared/Constants';


const styles = () => ({
  appBar: {
    position: 'sticky',
    backgroundColor: MIAMI_RED_COLOR,
  },
});

const CustomAppBar = (props) => {
  const { classes, user, signOutHandler } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleOpenUserMenu = (e) => {
    console.log('clicked');
    setAnchorEl(e.currentTarget); 
    console.log(anchorEl);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  }

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={2}>
            <Typography variant="h2">
              Testing
            </Typography>
          </Grid>
          <Grid item xs={5}>
          </Grid>
          <Grid item xs={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar src={user.photoURL} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key='sign-out' onClick={signOutHandler}>
                <Typography variant="h4" textAlign="center">Sign out</Typography>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(CustomAppBar);
