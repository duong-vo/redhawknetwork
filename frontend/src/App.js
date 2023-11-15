import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import UserSignIn from './components/user/UserSignIn';
import PostIndex from './components/post/PostIndex';
import CustomAppBar from './components/common/CustomAppBar';
import CustomNavbar from './components/common/CustomNavbar';
import { auth } from './shared/Firebase';
import { MIAMI_DOMAIN_REGEX } from './shared/Constants';

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user = ', user);
      if (user && MIAMI_DOMAIN_REGEX.test(user.email)) {
        axios({
          url: 'http://localhost:8000/api/user/add',
          method: 'post',
          data: {
            id: user.uid,
            email: user.email,
          },
        }).then((response) => {
          user.username = response.data.username;
          console.log('user = ', user);
          setAuthUser(user);
        }).catch(() => {
          console.log('sum ting wong');
        });
      } else {
        setAuthUser(null);
      }
      setIsLoading(false);
    });
  }, []);
  const signOutHandler = () => {
    signOut(auth);
  };
  return (
    <>
      <Backdrop open={isLoading} style={{ zIndex: 999, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {!isLoading && !authUser && <UserSignIn />}
      {!isLoading && authUser && (
        <>
          <CustomNavbar signOutHandler={signOutHandler} />
          <PostIndex />
        </>
      )}
    </>
  );
}

export default App;
