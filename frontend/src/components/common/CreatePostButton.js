import React, { useState } from 'react';
import withStyles from '@mui/styles/withStyles';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';

const styles = () => ({
  icon: {
    color: 'white',
  },
  containedButton: {

  },
  outlinedButton: {
    color: 'gray',
  },
});

const CreatePostButton = (props) => {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Title');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <CreateIcon className={classes.icon} />
      </IconButton>
      <Dialog width="md" open={open}>
        <DialogTitle>
          <Typography variant="h4">
            Create New Post
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {isEditing ? (
            <InputBase
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setIsEditing(false)}
              autoFocus
              fullWidth
              multiline
              inputProps={{
                style: {
                  fontSize: '2rem',
                }
              }}
            />
          ) : (
            <Typography variant="h4" onClick={() => setIsEditing(true)}>
              {title}
            </Typography>
          )}
          <Typography variant="body2">Inside here are your content</Typography>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button onClick={() => setOpen(false)} variant="outlined">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(CreatePostButton);
