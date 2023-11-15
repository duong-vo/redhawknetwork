import React, { useState, useEffect } from 'react';
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
        setAuthUser(user);
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
          <CustomNavbar />
          <PostIndex />
        </>
      )}
    </>
  );
}

export default App;
