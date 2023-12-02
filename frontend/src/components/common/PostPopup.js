import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CATEGORIES, CATEGORY_LABELS } from '../../shared/Constants';

const PostPopup = ({ open, handleClose, user }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'OTHER',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: 'http://localhost:8000/api/post/add',
      method: 'POST',
      withCredentials: true,
      data: {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        createdDate: new Date(),
        author: user.uid,
      },
    }).then(() => {
      window.location.reload();
    });
  };
  const isSubmitDisabled = formData.title === '' || formData.content === '';

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Grid container>
          <Grid item xs={1}>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item xs={11}>
            <FormControl style={{ width: '100%' }}>
              <InputLabel> Category </InputLabel>
              <Select
                label="Category"
                value={formData.category}
                name="category"
                onChange={handleInputChange}
              >
                {CATEGORIES.map(category => (
                  <MenuItem value={category}>
                    {CATEGORY_LABELS[category]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
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
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <TextField
              id="post-description"
              className="form-control"
              placeholder="Post Description"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
            />
          </div>
          <Grid container justifyContent="flex-end" alignItems="flex-end">
            <Grid item>
              <Button disabled={isSubmitDisabled} type="submit" variant="contained" color="success">
                Add Post
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostPopup;
