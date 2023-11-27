import React, { useState } from 'react';
import axios from 'axios';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { List}  from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemText } from '@mui/material';
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
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCommentSubmit}
        style={{ marginTop: '10px' }}
      >
        Add Comment
      </Button>

      {/* List to display existing comments */}
      <List>
        {comments.map(comment => (
          <ListItem key={comment.id}>
            <ListItemText
              primary={comment.user.username}
              secondary={comment.content}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default CommentSection;
