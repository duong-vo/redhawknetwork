import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Grid } from '@mui/material';
import Post from '../components/post/Post';

const SearchResult = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios({
      url: 'http://localhost:8000/api/search/?query=' + query,
      method: 'GET'
    }).then((response) => {
      console.log(response);
      setPosts(response.data);
    });
  }, []);

  return (
    <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
      {posts && posts.map((post) => (
        <Grid item>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
}

export default SearchResult;
