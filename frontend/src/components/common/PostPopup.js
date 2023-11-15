import React from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PostPopup = ({ open, handleClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: 'https://localhost:8080/user/add',
      method: 'POST',
    }).then(() => {
      console.log('done');
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <form id="create-post-form" onSubmit={handleSubmit}>
          <h2>Create a Post</h2>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <TextField
              type="text"
              id="post-title"
              className="form-control"
              placeholder="Post Title"
              fullWidth
            />
          </div>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <TextField
              id="post-description"
              className="form-control"
              placeholder="Post Description"
              multiline
              rows={4}
              fullWidth
            />
          </div>
          <Button type="submit" variant="contained" color="success">
            Add Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostPopup;
