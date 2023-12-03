import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import Post from '../components/post/Post';
import { truncateString } from '../shared/Helper';

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
  const deviceWidth = window.innerWidth;
  const averageCharWidth = 20;
  const maxChars = Math.floor(deviceWidth / averageCharWidth);

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ padding: 4 }}>
      {posts && posts.length > 0 ? posts.map((post) => (
        <Grid item xs={6}>
          <Post post={post} content={truncateString(post.content, maxChars)} />
        </Grid>
      )) :
      (
        <Grid item>
          <Typography variant="h3">
            No post found!
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default SearchResult;
