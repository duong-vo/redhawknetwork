import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

const PostIndex = (props) => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState(null);
  useEffect(() => {
    axios({
      url: 'http://localhost:8000/api/posts',
      method: 'get'
    }).then((response) => {
      setPosts(response.data);
    });
  }, []);
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  console.log('posts = ', posts);
  return (
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
          <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
            {posts && posts.filter(obj => (filter ? obj.category === filter : true)).map((post) => (
              <Post post={post} />
            ))}
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default PostIndex;
