import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Grid,
  RadioGroup,
  Paper,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
} from '@mui/material';
import Post from './Post';
import { CATEGORIES, CATEGORY_LABELS } from '../../shared/Constants';
import { truncateString } from '../../shared/Helper';

const PostIndex = (props) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios({
      url: 'http://localhost:8000/api/posts',
      method: 'get'
    }).then((response) => {
      setPosts(response.data);
    })
    setIsLoading(false);
  }, []);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  console.log('posts = ', posts);
  const deviceWidth = window.innerWidth;
  const averageCharWidth = 20;
  const maxChars = Math.floor(deviceWidth / averageCharWidth);
  return (
    <>
      <Grid container spacing={2} sx={{ padding: 4 }}>
        <Grid item xs={2}>
          <Paper sx={{ border: '1px solid #ddd', padding: 4, borderLeft: '1px dotted' }}>
            <Typography variant="h6">Filter Posts by Category</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="category"
                name="category"
                value={filter}
                onChange={handleFilterChange}
              >
                {CATEGORIES.map(category => (
                  <FormControlLabel value={category} control={<Radio />} label={CATEGORY_LABELS[category]} />
                ))}
                <FormControlLabel value={''} control={<Radio />} label="None" />
              </RadioGroup>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <div id="add-post-form" style={{ display: 'none' }}>
            <TextField id="post-title" label="Title" fullWidth />
            <TextField id="post-description" label="Description" multiline rows={4} fullWidth />
          </div>
          <div className="main-content">
            <Grid container justifyContent="center" alignItems="center" spacing={2}>
              {posts && posts.filter(obj => (filter ? obj.category === filter : true)).length > 0 ? posts.filter(obj => (filter ? obj.category === filter : true)).map((post) => (
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
          </div>
        </Grid>
      </Grid>
      <Backdrop open={isLoading} style={{ zIndex: 999, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default PostIndex;
