import React, { useState } from 'react';
import {
  Grid,
  Container,
  Paper,
  Typography,
  Checkbox,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import Post from './Post';

const BlogPost = (props) => {
  const posts = [
    {
      title: 'Title',
      date: 'date',
      content: 'content',
    },
    {
      title: 'Title2',
      date: 'date2',
      content: 'content2',
    },
  ];

  const [upvoteCount, setUpvoteCount] = useState(0);
  const [downvoteCount, setDownvoteCount] = useState(0);

  const handleUpvote = () => {
    setUpvoteCount(upvoteCount + 1);
  };

  const handleDownvote = () => {
    setDownvoteCount(downvoteCount + 1);
  };
  return (
    <Grid container spacing={2} sx={{ padding: 4 }}>
      <Grid item xs={2}>
        <Paper sx={{ border: '1px solid #ddd', padding: 4, borderLeft: '1px dotted' }}>
          <Typography variant="h6">Filter Posts by Category</Typography>
          <div className="form-check">
            <Checkbox value="" id="gaming" />
            <label htmlFor="gaming">Gaming</label>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <div id="add-post-form" style={{ display: 'none' }}>
          <TextField id="post-title" label="Title" fullWidth />
          <TextField id="post-description" label="Description" multiline rows={4} fullWidth />
        </div>
        <div className="main-content">
          <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
            <Grid item>
              <Post />
            </Grid>
            <Grid item>
              <Post />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default BlogPost;
