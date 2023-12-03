import React, { useState } from 'react';
import axios from 'axios';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardHeader } from '@mui/material';
import  { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';
import { List}  from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
import { Divider } from '@mui/material';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';
import { auth } from '../../shared/Firebase';

const CommentSection = (props) => {
  const { post } = props;
  const { id: postId, comments } = post;
  console.log('comments = ', comments);
  const currentUser = auth.currentUser;
  const { uid } = currentUser;
  const [newComment, setNewComment] = useState('');
  const handleCommentSubmit = () => {
    console.log('submitting');
    axios({
      url: 'http://localhost:8000/api/comment/add',
      method: 'POST',
      data: {
        content: newComment,
        post_id: postId,
        uid: uid,
        created_date: new Date(),
      },
    }).then(() => {
      console.log('it works');
      window.location.reload();
    });
  };


  return (
    <div>
      {/* Input for the current user to add a new comment */}
      <Paper sx={{ marginTop: 2, padding: 2 }} elevation={2}>
        <TextField
          label="Add a comment"
          variant="outlined"
          multiline
          fullWidth
          value={newComment}
          rows={5}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Grid container justifyContent="flex-end" alignItems="flex-end" sx={{ marginTop: 2 }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCommentSubmit}
            >
              Add Comment
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* List to display existing comments */}

      <Paper sx={{ marginTop: 2, padding: 2 }} elevation={2}>
        {comments.map((comment, idx) => (
          <>
            <Typography gutterBottom variant="h6" component="div">
              <Link href={"/users/" + comment.user.id} underline="none">
                {comment.user.username}
              </Link>
            </Typography>
            <Typography variant="h6">
              {comment.content}
            </Typography>
            {idx !== comments.length - 1 && <Divider sx={{ marginTop: 1, marginBottom: 1 }} />}
          </>
        ))}
      </Paper>
    </div>
  );
}

export default CommentSection;
