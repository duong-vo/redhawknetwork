import React, { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import UserSignIn from './components/user/UserSignIn';
import PostIndex from './components/post/PostIndex';
import CustomAppBar from './components/common/CustomAppBar';
import CustomNavbar from './components/common/CustomNavbar';
import ShowPost from './pages/ShowPost';
import SearchResult from './pages/SearchResult';
import ShowAccount from './pages/ShowAccount';
import { auth } from './shared/Firebase';
import { MIAMI_DOMAIN_REGEX } from './shared/Constants';

const App = () => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log('user = ', user);
      if (user &&  MIAMI_DOMAIN_REGEX.test(user.email)) {
        const token = await user.getIdToken();
        document.cookie = `token=${token}`;
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
        document.cookie = '';
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
      <Routes>
        <Route path="/posts/:id" element={(
          <>
            {!isLoading && authUser && (
              <>
                <CustomNavbar signOutHandler={signOutHandler} user={authUser} />
                <ShowPost />
              </>
            )}
          </>
        )} />
        <Route path="/search" element={(
          <>
            {!isLoading && authUser && (
              <>
                <CustomNavbar signOutHandler={signOutHandler} user={authUser} />
                <SearchResult />
              </>
            )}
          </>
        )} />
        <Route path="/" element={(
          <>
            <Backdrop open={isLoading} style={{ zIndex: 999, color: '#fff' }}>
              <CircularProgress color="inherit" />
            </Backdrop>
            {!isLoading && !authUser && <UserSignIn />}
            {!isLoading && authUser && (
              <>
                <CustomNavbar signOutHandler={signOutHandler} user={authUser} />
                <PostIndex />
              </>
            )}
          </>
        )} />
        <Route path="/users/:id" element={(
          <>
            <Backdrop open={isLoading} style={{ zIndex: 999, color: '#fff' }}>
              <CircularProgress color="inherit" />
            </Backdrop>
            {!isLoading && !authUser && <UserSignIn />}
            {!isLoading && authUser && (
              <>
                <CustomNavbar signOutHandler={signOutHandler} user={authUser} />
                <ShowAccount />
              </>
            )}
          </>
        )} />

      </Routes>
    </>
  );
}

export default App;
