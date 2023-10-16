import React, { useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import withStyles from '@mui/styles/withStyles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
import GoogleIcon from '@mui/icons-material/Google';
import { MIAMI_RED_COLOR, MIAMI_DOMAIN_REGEX } from '../../shared/Constants';
import { auth, provider } from '../../shared/Firebase';

const styles = () => ({
  button: {
    backgroundColor: '#fff',
    color: MIAMI_RED_COLOR,
    '&:hover': {
      backgroundColor: MIAMI_RED_COLOR,
      color: '#fff',

    },
  },
  leftSide: {
    background: 'url(https://www.miamialum.org/s/916/images/editor/zoom/zoom_4.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  rightSide: {
    background: 'linear-gradient(rgba(195, 20, 45, 0.9), rgba(195, 20, 45, 0.9)), url(https://auth.miamioh.edu/cas/img/sealbw.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
});

const UserSignIn = (props) => {
  const { classes } = props;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  // Handle the Google sign-in logic here
  const handleClick = () => {
    signInWithPopup(auth, provider).then(data => {
      if (MIAMI_DOMAIN_REGEX.test(data.user.email)) {
        console.log('this is good');
      } else {
        console.log('this is bad');
        signOut(auth);
        setOpenSnackbar(true);
      }
    });
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openSnackbar}
        onClose={handleClose}
      >
        <MuiAlert
          severity="error"
          variant="filled" 
          onClose={handleClose}>
          Hmm, you don't smell like a Miamian!
        </MuiAlert>
      </Snackbar>
      <Grid container component="main" sx={{ height: '100vh' }} className={classes.leftSide}>
        <Grid item xs={false} sm={4} md={7}>
        </Grid>
        <Grid 
          item
          xs={12}
          sm={8}
          md={5}
          elevation={6}
          className={classes.rightSide}
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            sx={{ height: '40vh' }}
            spacing={2}
          >
            <Grid item>
              <img src="https://auth.miamioh.edu/cas/img/miamiohBW.png" alt="Miami Logo" />
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            direction="column"
            sx={{ height: '60vh' }}
            spacing={2}
          >
            <Grid item>
              <Typography variant="h4" color="#fff">
                Get Started
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<GoogleIcon />}
                onClick={handleClick}
                className={classes.button}
              >
                Sign in with Miami Email
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(UserSignIn);
